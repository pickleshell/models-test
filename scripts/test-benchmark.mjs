#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(path.join(root, 'benchmarks/phase2/manifest.json'), 'utf8'));
assert.equal(manifest.schema_version, 1);
assert.equal(manifest.stage, 'prepared');
assert.equal(manifest.executed, false);
assert.equal(manifest.tasks.length, 5);
assert.deepEqual(new Set(manifest.tasks.map((task) => task.category)).size, 5);
for (const task of manifest.tasks) {
  for (const key of ['id', 'fixture', 'prompt', 'public_test', 'hidden_evaluator', 'reference_source', 'allowed_changes']) assert.ok(task[key], `${task.id}: ${key}`);
  assert.ok(readFileSync(path.join(root, task.prompt), 'utf8').length > 20, `${task.id}: prompt`);
  assert.ok(task.allowed_changes.length > 0, `${task.id}: allowed changes`);
}
const prompt = spawnSync(process.execPath, ['scripts/benchmark.mjs', 'prompt', '--task', manifest.tasks[0].id], { encoding: 'utf8' });
assert.equal(prompt.status, 0);
assert.match(prompt.stdout, /ledger/);
const reference = spawnSync(process.execPath, ['scripts/benchmark.mjs', 'verify-reference'], { encoding: 'utf8' });
assert.equal(reference.status, 0, reference.stdout + reference.stderr);
console.log(`validated ${manifest.tasks.length} prepared harnesses and references`);
