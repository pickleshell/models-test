import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { deriveCandidates, executePlan } from './phase2-runner.mjs';

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
