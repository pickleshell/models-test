import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { agentCommand, deriveCandidates, executePlan, ptyCommand, runProcess } from './phase2-runner.mjs';

const root = process.cwd();

test('derives only non-empty patch candidates with exact runtime and model', async () => {
  const candidates = await deriveCandidates(root);
  assert.equal(candidates.length, 31);
  assert.deepEqual(candidates.find((item) => item.id === '18-gpt-5-3-codex-spark'), {
    id: '18-gpt-5-3-codex-spark', phase1_result: path.join(root, 'results/phase1/18-gpt-5-3-codex-spark'),
    runtime: 'codex', model: 'gpt-5.3-codex-spark', slug: '18-gpt-5-3-codex-spark'
  });
  assert.equal(candidates.some((item) => item.id === '08-qwen3-7-max'), false);
});

test('builds the isolated OpenCode invocation with exact args and workspace cwd', () => {
  const workspace = path.join(root, '.worktrees/phase2/01-test-model/task');
  assert.deepEqual(agentCommand(candidate(), 'Do the task.\n', workspace), {
    command: 'opencode',
    args: ['run', '--model', 'opencode/test-model', '--dir', workspace, '--auto', 'Do the task.\n'],
    cwd: workspace,
    pty: true
  });
});

test('wraps the exact command in a PTY without interpreting special arguments', async () => {
  const workspace = "/tmp/work space/'quoted'";
  const prompt = "spaces 'quotes' `backticks` $dollars\nsecond line";
  const [command, args] = ptyCommand('opencode', ['run', '--model', 'model/$x', '--dir', workspace, '--auto', prompt]);
  assert.equal(command, 'script');
  assert.deepEqual(args.slice(0, 1), ['-qefc']);
  assert.match(args[1], /'opencode' 'run' '--model' 'model\/\$x'/);
  assert.ok(args[1].includes("'/tmp/work space/'\\''quoted'\\'''"));
  assert.ok(args[1].includes("'spaces '\\''quotes'\\'' `backticks` $dollars\nsecond line'"));
  assert.deepEqual(args.slice(-1), ['/dev/null']);
});

test('PTY child reports a TTY and preserves special-character arguments', async () => {
  const values = ['space value', "quote'value", '`ticks`', '$dollars', 'line\none'];
  const script = "process.stdout.write(JSON.stringify({tty: process.stdin.isTTY, args: process.argv.slice(1)}))";
  const result = await runProcess(process.execPath, ['-e', script, ...values], { pty: true, timeoutMs: 1000 });
  assert.equal(result.status, 0);
  assert.deepEqual(JSON.parse(result.stdout.trim()), { tty: true, args: values });
});

test('runs a command to completion with captured output', async () => {
  const result = await runProcess(process.execPath, ['-e', "process.stdout.write('ok')"], { timeoutMs: 1000 });
  assert.equal(result.status, 0);
  assert.equal(result.signal, null);
  assert.equal(result.stdout, 'ok');
  assert.equal(result.timed_out, false);
  assert.equal(result.cancelled, false);
});

test('timeout kills the complete spawned process group', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'phase2-runner-timeout-'));
  const marker = path.join(directory, 'grandchild-ran');
  const childScript = path.join(directory, 'child.mjs');
  await writeFile(childScript, `
    import { spawn } from 'node:child_process';
    import { writeFile } from 'node:fs/promises';
    spawn(process.execPath, ['-e', ${JSON.stringify(`setTimeout(() => writeFile(${JSON.stringify(marker)}, 'unexpected'), 150)`)}]);
    setTimeout(() => {}, 10000);
  `);
  const result = await runProcess(process.execPath, [childScript], { timeoutMs: 50 });
  await new Promise((resolve) => setTimeout(resolve, 250));
  assert.equal(result.timed_out, true);
  assert.equal(result.signal, 'SIGKILL');
  assert.equal(result.status, null);
  assert.equal(await readFile(marker, 'utf8').catch(() => null), null);
  await rm(directory, { recursive: true, force: true });
});

async function fakeRepo() {
  const repo = await mkdtemp(path.join(os.tmpdir(), 'phase2-runner-'));
  await mkdir(path.join(repo, 'benchmarks/phase2/prompts'), { recursive: true });
  await mkdir(path.join(repo, 'fixtures/phase2/hidden'), { recursive: true });
  await writeFile(path.join(repo, 'benchmarks/phase2/prompts/task.md'), 'Do the task.\n');
  await writeFile(path.join(repo, 'fixtures/phase2/hidden/task.mjs'), 'process.exit(0);\n');
  await writeFile(path.join(repo, 'tracked.txt'), 'baseline\n');
  execFileSync('git', ['-C', repo, 'init', '-q']);
  execFileSync('git', ['-C', repo, 'config', 'user.email', 'test@example.invalid']);
  execFileSync('git', ['-C', repo, 'config', 'user.name', 'Test']);
  execFileSync('git', ['-C', repo, 'add', '.']);
  execFileSync('git', ['-C', repo, 'commit', '-qm', 'baseline']);
  return repo;
}

function manifest(tasks) {
  return { tasks: tasks.map((id) => ({ id, category: id, prompt: 'benchmarks/phase2/prompts/task.md', hidden_evaluator: 'fixtures/phase2/hidden/task.mjs' })) };
}

function candidate(id = '01-test-model') {
  return { id, slug: id, runtime: 'opencode', model: 'opencode/test-model' };
}

test('executes candidate-major order and resumes completed task records', async () => {
  const repo = await fakeRepo();
  const resultsRoot = path.join(repo, 'results/phase2');
  const calls = [];
  const run = async (command) => { calls.push(command); return { status: 0, signal: null, stdout: '', stderr: '', duration_ms: 1, timed_out: false }; };
  const candidates = [candidate('01-a'), candidate('02-b')];
  await executePlan({ repo, manifest: manifest(['one', 'two']), candidates, resultsRoot, run });
  assert.deepEqual(calls.filter((command) => command === 'opencode'), ['opencode', 'opencode', 'opencode', 'opencode']);
  const records = [
    JSON.parse(await readFile(path.join(resultsRoot, '01-a/one/task-record.json'))),
    JSON.parse(await readFile(path.join(resultsRoot, '01-a/two/task-record.json'))),
    JSON.parse(await readFile(path.join(resultsRoot, '02-b/one/task-record.json'))),
    JSON.parse(await readFile(path.join(resultsRoot, '02-b/two/task-record.json')))
  ];
  assert.deepEqual(records.map((record) => `${record.candidate}/${record.task}`), ['01-a/one', '01-a/two', '02-b/one', '02-b/two']);
  calls.length = 0;
  await executePlan({ repo, manifest: manifest(['one', 'two']), candidates, resultsRoot, run });
  assert.equal(calls.length, 0);
  await rm(repo, { recursive: true, force: true });
});

test('records provider failure and still evaluates after the agent exits', async () => {
  const repo = await fakeRepo();
  const resultsRoot = path.join(repo, 'results/phase2');
  const calls = [];
  const run = async (command) => {
    calls.push(command);
    return command === 'opencode'
      ? { status: 7, signal: null, stdout: 'agent out', stderr: 'provider down', duration_ms: 2, timed_out: false }
      : { status: 0, signal: null, stdout: '{}', stderr: '', duration_ms: 1, timed_out: false };
  };
  await executePlan({ repo, manifest: manifest(['one']), candidates: [candidate()], resultsRoot, run });
  const record = JSON.parse(await readFile(path.join(resultsRoot, '01-test-model/one/task-record.json')));
  assert.equal(record.agent.failure_class, 'provider_or_agent_failure');
  assert.deepEqual(calls, ['opencode', process.execPath]);
  await rm(repo, { recursive: true, force: true });
});
