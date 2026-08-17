#!/usr/bin/env node
import { execFile, spawn } from 'node:child_process';
import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const DEFAULT_TIMEOUT_SECONDS = 900;

export function slug(value) {
  return value.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

export async function deriveCandidates(repo) {
  const phase1 = path.join(repo, 'results', 'phase1');
  const entries = (await readdir(phase1, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const candidates = [];
  for (const entry of entries) {
    const resultDir = path.join(phase1, entry.name);
    let metadata;
    try {
      metadata = JSON.parse(await readFile(path.join(resultDir, 'run-metadata.json'), 'utf8'));
      if (!(await readFile(path.join(resultDir, 'candidate.diff'), 'utf8')).trim()) continue;
    } catch {
      continue;
    }
    const runtime = metadata.runtime || (metadata.model?.startsWith('gpt-') ? 'codex' : metadata.model?.startsWith('opencode-go/') ? 'opencode-go' : 'opencode');
    if (!metadata.model || !['codex', 'opencode', 'opencode-go'].includes(runtime)) continue;
    candidates.push({
      id: entry.name,
      phase1_result: resultDir,
      runtime,
      model: metadata.model,
      slug: slug(entry.name)
    });
  }
  return candidates;
}

export function selectCandidates(candidates, filters = []) {
  if (!filters.length) return candidates;
  return candidates.filter((candidate) => filters.some((filter) =>
    candidate.id === filter || candidate.model === filter || candidate.slug === slug(filter)));
}

export function agentCommand(candidate, prompt, workspace) {
  if (candidate.runtime === 'codex') {
    return {
      command: 'codex',
      args: ['exec', '--model', candidate.model, '--cd', workspace, '--sandbox', 'workspace-write', '--ask-for-approval', 'never', prompt]
    };
  }
  return {
    command: 'opencode',
    args: ['run', '--model', candidate.model, '--dir', workspace, prompt],
    cwd: workspace
  };
}

async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`);
  await rename(temporary, file);
}

export async function runProcess(command, args, options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_SECONDS * 1000;
  const started = Date.now();
  return new Promise((resolve) => {
    let timedOut = false;
    const child = spawn(command, args, { cwd: options.cwd, env: options.env, detached: true });
    const stdout = [], stderr = [];
    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => stderr.push(chunk));
    const timer = setTimeout(() => {
      timedOut = true;
      try { process.kill(-child.pid, 'SIGKILL'); } catch { child.kill('SIGKILL'); }
    }, timeoutMs);
    child.on('error', (error) => {
      clearTimeout(timer);
      resolve({ status: null, signal: null, stdout: Buffer.concat(stdout).toString(), stderr: `${Buffer.concat(stderr)}${error.message}`, duration_ms: Date.now() - started, timed_out: timedOut, spawn_error: error.message });
    });
    child.on('close', (status, signal) => {
      clearTimeout(timer);
      resolve({ status, signal, stdout: Buffer.concat(stdout).toString(), stderr: Buffer.concat(stderr).toString(), duration_ms: Date.now() - started, timed_out: timedOut });
    });
  });
}

async function git(repo, args) {
  const { stdout } = await execFileAsync('git', ['-C', repo, ...args], { encoding: 'utf8' });
  return stdout;
}

async function ensureWorktree(repo, workspace, baseline) {
  await mkdir(path.dirname(workspace), { recursive: true });
  const existing = await git(repo, ['worktree', 'list', '--porcelain']);
  if (!existing.includes(`worktree ${workspace}\n`)) {
    await execFileAsync('git', ['-C', repo, 'worktree', 'add', '--detach', workspace, baseline]);
  } else {
    const { stdout } = await execFileAsync('git', ['-C', workspace, 'rev-parse', 'HEAD'], { encoding: 'utf8' });
    const expected = (await git(repo, ['rev-parse', baseline])).trim();
    if (stdout.trim() !== expected) throw new Error(`existing worktree is not based on ${expected}: ${workspace}`);
  }
}

async function hideEvaluator(repo, workspace, task) {
  const source = path.join(repo, task.hidden_evaluator);
  const hidden = path.join(workspace, task.hidden_evaluator);
  await rm(hidden, { force: true });
  return async () => {
    await mkdir(path.dirname(hidden), { recursive: true });
    await writeFile(hidden, await readFile(source));
  };
}

async function patchAndStatus(workspace) {
  const [diff, status] = await Promise.all([
    git(workspace, ['diff', '--binary', '--no-ext-diff']),
    git(workspace, ['status', '--porcelain'])
  ]);
  return { diff, changed_files: status.split('\n').filter(Boolean).map((line) => line.slice(3)) };
}

function classifyAgent(result) {
  if (result.timed_out) return 'timeout';
  if (result.spawn_error) return 'infrastructure_failure';
  if (result.status !== 0) return 'provider_or_agent_failure';
  return null;
}

export async function executePlan({ repo, candidates, manifest, baseline = 'HEAD', resultsRoot, timeoutSeconds = DEFAULT_TIMEOUT_SECONDS, dryRun = false, run = runProcess }) {
  const baselineCommit = (await git(repo, ['rev-parse', baseline])).trim();
  const plan = [];
  for (const candidate of candidates) for (const task of manifest.tasks) {
    const workspace = path.join(repo, '.worktrees', 'phase2', candidate.slug, task.id);
    const resultDir = path.join(resultsRoot, candidate.slug, task.id);
    plan.push({ candidate, task, workspace, resultDir });
  }
  if (dryRun) return { baseline: baselineCommit, plan: plan.map(({ candidate, task, workspace }) => ({ candidate: candidate.id, runtime: candidate.runtime, model: candidate.model, task: task.id, workspace })) };

  const stateFile = path.join(resultsRoot, 'runner-state.json');
  let state = { schema_version: 1, benchmark: 'phase2', baseline: baselineCommit, completed: [], updated_at: null };
  try { state = JSON.parse(await readFile(stateFile, 'utf8')); } catch { /* initial run */ }
  for (const item of plan) {
    const key = `${item.candidate.id}/${item.task.id}`;
    const recordFile = path.join(item.resultDir, 'task-record.json');
    try {
      const existing = JSON.parse(await readFile(recordFile, 'utf8'));
      if (existing.state === 'completed') { if (!state.completed.includes(key)) state.completed.push(key); continue; }
    } catch { /* not completed */ }
    await ensureWorktree(repo, item.workspace, baseline);
    await mkdir(item.resultDir, { recursive: true });
    const prompt = await readFile(path.join(repo, item.task.prompt), 'utf8');
    const command = agentCommand(item.candidate, prompt, item.workspace);
    const restoreEvaluator = await hideEvaluator(repo, item.workspace, item.task);
    const agent = await run(command.command, command.args, { cwd: item.workspace, timeoutMs: timeoutSeconds * 1000 });
    await writeFile(path.join(item.resultDir, 'agent.stdout.txt'), agent.stdout);
    await writeFile(path.join(item.resultDir, 'agent.stderr.txt'), agent.stderr);
    await restoreEvaluator();
    const evaluationCommand = ['scripts/benchmark.mjs', 'evaluate', '--task', item.task.id, '--workspace', item.workspace, '--model', item.candidate.model, '--json-out', path.join(item.resultDir, 'evaluation.json')];
    const evaluation = await run(process.execPath, evaluationCommand, { cwd: repo, timeoutMs: timeoutSeconds * 1000 });
    await writeFile(path.join(item.resultDir, 'evaluator.stdout.txt'), evaluation.stdout);
    await writeFile(path.join(item.resultDir, 'evaluator.stderr.txt'), evaluation.stderr);
    const patch = await patchAndStatus(item.workspace);
    await writeFile(path.join(item.resultDir, 'candidate.diff'), patch.diff);
    const record = {
      schema_version: 1, state: 'completed', benchmark: 'phase2', task: item.task.id, category: item.task.category,
      candidate: item.candidate.id, runtime: item.candidate.runtime, model: item.candidate.model, baseline: baselineCommit,
      workspace: item.workspace, prompt: item.task.prompt, command: { command: command.command, args: command.args.slice(0, -1), working_directory: item.workspace },
      agent: { status: agent.status, signal: agent.signal, wall_time_ms: agent.duration_ms, timed_out: agent.timed_out, failure_class: classifyAgent(agent) },
      evaluator: { status: evaluation.status, signal: evaluation.signal, wall_time_ms: evaluation.duration_ms, failure_class: evaluation.status === 0 ? null : 'infrastructure_or_evaluator_failure' },
      patch: { file: path.join(item.resultDir, 'candidate.diff'), changed_files: patch.changed_files },
      evaluation_json: path.join(item.resultDir, 'evaluation.json'),
      raw_output: { agent_stdout: path.join(item.resultDir, 'agent.stdout.txt'), agent_stderr: path.join(item.resultDir, 'agent.stderr.txt'), evaluator_stdout: path.join(item.resultDir, 'evaluator.stdout.txt'), evaluator_stderr: path.join(item.resultDir, 'evaluator.stderr.txt') },
      completed_at: new Date().toISOString()
    };
    await writeJson(recordFile, record);
    if (!state.completed.includes(key)) state.completed.push(key);
    state.updated_at = record.completed_at;
    await writeJson(stateFile, state);
  }
  return state;
}

function arg(name, fallback = null) { const index = process.argv.indexOf(name); return index < 0 ? fallback : process.argv[index + 1]; }

if (import.meta.url === `file://${process.argv[1]}`) {
  const repo = process.cwd();
  const manifest = JSON.parse(await readFile(path.join(repo, 'benchmarks/phase2/manifest.json'), 'utf8'));
  const all = await deriveCandidates(repo);
  const filters = process.argv.flatMap((value, index) => value === '--candidate' ? [process.argv[index + 1]] : []).filter(Boolean);
  const candidates = selectCandidates(all, filters);
  if (filters.length && !candidates.length) throw new Error(`no Phase 1 patch candidates matched: ${filters.join(', ')}`);
  const result = await executePlan({ repo, manifest, candidates, baseline: arg('--baseline', 'HEAD'), resultsRoot: path.join(repo, 'results/phase2'), timeoutSeconds: Number(arg('--timeout-seconds', DEFAULT_TIMEOUT_SECONDS)), dryRun: process.argv.includes('--dry-run') });
  process.stdout.write(`${JSON.stringify({ candidates: candidates.map(({ id, runtime, model }) => ({ id, runtime, model })), ...result }, null, 2)}\n`);
}
