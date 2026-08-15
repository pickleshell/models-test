#!/usr/bin/env node
import { mkdirSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed\n${result.stdout}${result.stderr}`);
  }
  return result.stdout.trim();
}

function slug(model, index) {
  return `${String(index + 1).padStart(2, '0')}-${model.replace(/^opencode-go\//, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

const repo = run('git', ['rev-parse', '--show-toplevel']);
const baseline = arg('--baseline', 'HEAD');
const manifest = JSON.parse(readFileSync(path.join(repo, 'benchmarks/phase1/model-order.json'), 'utf8'));
const baseDir = path.join(repo, '.worktrees/phase1');
mkdirSync(baseDir, { recursive: true });
mkdirSync(path.join(repo, 'results/phase1'), { recursive: true });

const output = [];
for (const [index, model] of manifest.models.entries()) {
  const name = slug(model, index);
  const workspace = path.join(baseDir, name);
  const existing = spawnSync('git', ['-C', repo, 'worktree', 'list', '--porcelain'], { encoding: 'utf8' }).stdout;
  if (!existing.includes(`worktree ${workspace}\n`)) {
    run('git', ['-C', repo, 'worktree', 'add', '--detach', workspace, baseline]);
  }
  mkdirSync(path.join(repo, 'results/phase1', name), { recursive: true });
  output.push({ index: index + 1, model, workspace, results: path.join(repo, 'results/phase1', name) });
}

console.log(JSON.stringify({ baseline: run('git', ['-C', repo, 'rev-parse', baseline]), worktrees: output }, null, 2));
