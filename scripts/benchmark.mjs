#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const repo = process.cwd();
const manifestPath = path.join(repo, 'benchmarks/phase2/manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const arg = (name, fallback = null) => { const i = process.argv.indexOf(name); return i < 0 ? fallback : process.argv[i + 1]; };
const task = (id) => manifest.tasks.find((item) => item.id === id) || (() => { throw new Error(`unknown task: ${id}`); })();
const slug = (model, index) => `${String(index + 1).padStart(2, '0')}-${model.replace(/^opencode-go\//, '').replace(/[^a-zA-Z0-9]+/g, '-')}`;
function run(command, args, options = {}) { return spawnSync(command, args, { encoding: 'utf8', ...options }); }

if (process.argv[2] === 'prompt') {
  process.stdout.write(readFileSync(path.join(repo, arg('--task') && task(arg('--task')).prompt), 'utf8'));
} else if (process.argv[2] === 'prepare') {
  const models = JSON.parse(readFileSync(path.join(repo, 'benchmarks/opencode-go-model-manifest.json'), 'utf8')).models;
  const base = path.join(repo, '.worktrees/phase2'); mkdirSync(base, { recursive: true });
  for (const item of manifest.tasks) for (const [index, model] of models.entries()) {
    const workspace = path.join(base, item.id, slug(model, index)); mkdirSync(path.dirname(workspace), { recursive: true });
    const exists = run('git', ['-C', repo, 'worktree', 'list', '--porcelain']).stdout.includes(`worktree ${workspace}\n`);
    if (!exists) { const result = run('git', ['-C', repo, 'worktree', 'add', '--detach', workspace, arg('--baseline', 'HEAD')]); if (result.status) throw new Error(result.stderr); }
  }
  console.log(JSON.stringify({ stage: manifest.stage, tasks: manifest.tasks.length, models: models.length }));
} else if (process.argv[2] === 'evaluate') {
  const item = task(arg('--task')), workspace = path.resolve(arg('--workspace', '.'));
  const fixture = path.join(workspace, item.fixture), source = path.join(workspace, item.allowed_changes[0]);
  const started = Date.now(), publicTest = run('npm', ['test', '--prefix', fixture], { cwd: workspace });
  const hidden = run(process.execPath, [path.join(workspace, item.hidden_evaluator), '--source', source], { cwd: workspace });
  const status = run('git', ['-C', workspace, 'status', '--porcelain', '--', item.fixture]);
  const changed = status.stdout.split('\n').filter(Boolean).map((line) => line.slice(3));
  const forbidden = changed.filter((file) => !item.allowed_changes.includes(file));
  const result = { schema_version: 1, benchmark: 'phase2', task: item.id, category: item.category, model: arg('--model', 'unknown'), pass: publicTest.status === 0 && hidden.status === 0 && forbidden.length === 0, metrics: { public_status: publicTest.status, hidden_passed: hidden.status === 0 ? 1 : 0, hidden_failed: hidden.status === 0 ? 0 : 1, forbidden_change_count: forbidden.length, changed_files: changed, duration_ms: Date.now() - started }, public_test: { command: 'npm test --prefix ' + item.fixture, stdout: publicTest.stdout, stderr: publicTest.stderr }, hidden: { stdout: hidden.stdout, stderr: hidden.stderr }, forbidden_changes: forbidden };
  const output = JSON.stringify(result, null, 2) + '\n'; if (arg('--json-out')) { mkdirSync(path.dirname(path.resolve(arg('--json-out'))), { recursive: true }); writeFileSync(arg('--json-out'), output); } process.stdout.write(output); process.exit(result.pass ? 0 : 1);
} else if (process.argv[2] === 'verify-reference') {
  const failures = [];
  for (const item of manifest.tasks) {
    const temp = path.join(os.tmpdir(), `models-test-${item.id}-${process.pid}`); cpSync(path.join(repo, item.fixture), temp, { recursive: true });
    cpSync(path.join(repo, item.reference_source), path.join(temp, 'src', path.basename(item.reference_source)));
    const publicTest = run('npm', ['test', '--prefix', temp], { env: { ...process.env, BENCHMARK_SOURCE: path.join(temp, 'src') } });
    const hidden = run(process.execPath, [path.join(repo, item.hidden_evaluator), '--source', path.join(temp, 'src', path.basename(item.reference_source))]);
    if (publicTest.status || hidden.status) failures.push(item.id);
  }
  if (failures.length) throw new Error(`reference failures: ${failures.join(', ')}`); console.log(`verified ${manifest.tasks.length} reference solutions`);
} else throw new Error('usage: prompt|prepare|evaluate|verify-reference');
