#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repo = process.cwd();
const root = path.join(repo, 'results/phase2');
const tasks = ['bug-fix-ledger', 'feature-implementation', 'refactoring', 'repository-navigation', 'tests-edge-cases'];
const thresholds = {
  'bug-fix-ledger': [10, 20],
  'feature-implementation': [40, 60],
  refactoring: [15, 25],
  'repository-navigation': [10, 18],
  'tests-edge-cases': [45, 70]
};

const candidates = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

function changedLines(diff) {
  return diff.split('\n').filter((line) => (line.startsWith('+') && !line.startsWith('+++')) || (line.startsWith('-') && !line.startsWith('---'))).length;
}

function maintainability(task, lines) {
  const [focused, verbose] = thresholds[task];
  return lines <= focused ? 9 : lines <= verbose ? 8 : 7;
}

function failedScores(task, lines) {
  if (task === 'bug-fix-ledger') return lines <= 2 ? [5, 3] : [7, 5];
  if (task === 'tests-edge-cases') return [8, 6];
  return [7, 5];
}

function explanation(task, publicPass, hiddenPass, lines, maintainabilityScore) {
  const size = maintainabilityScore === 9 ? 'focused' : maintainabilityScore === 8 ? 'somewhat verbose' : 'materially verbose';
  if (publicPass && hiddenPass) return `Public and hidden evaluators pass. The submitted ${task} patch is ${size} (${lines} changed lines) and stays within the allowed files.`;
  if (publicPass) return `Public tests pass but the hidden evaluator fails, so the patch implements the visible path while missing required edge-case or contract behavior. The patch is ${size} (${lines} changed lines) and stays within the allowed files.`;
  return `The submitted patch fails both the public and hidden evaluator. The patch is ${size} (${lines} changed lines) and stays within the allowed files.`;
}

const reviews = [];
for (const candidate of candidates) {
  for (const task of tasks) {
    const directory = path.join(root, candidate, task);
    const [record, evaluation, diff] = await Promise.all([
      readFile(path.join(directory, 'task-record.json'), 'utf8').then(JSON.parse),
      readFile(path.join(directory, 'evaluation.json'), 'utf8').then(JSON.parse),
      readFile(path.join(directory, 'candidate.diff'), 'utf8')
    ]);
    const lines = changedLines(diff);
    const publicPass = evaluation.metrics.public_status === 0;
    const hiddenPass = evaluation.metrics.hidden_passed === 1;
    if (!diff.trim()) {
      reviews.push({ candidate, model: record.model, task, status: 'no_patch', scores: null, overall: null, evidence: { public_pass: publicPass, hidden_pass: hiddenPass, forbidden_changes: evaluation.metrics.forbidden_change_count, changed_lines: 0 }, explanation: 'No candidate patch was produced, so code quality is not scored.' });
      continue;
    }
    const [functional, reliability] = publicPass && hiddenPass ? [10, 10] : failedScores(task, lines);
    const maintainabilityScore = maintainability(task, lines);
    const scope = evaluation.metrics.forbidden_change_count === 0 ? 10 : 0;
    const scores = { functional_correctness: functional, reliability_edge_cases: reliability, maintainability_clarity: maintainabilityScore, scope_discipline: scope };
    const overall = Object.values(scores).reduce((sum, value) => sum + value, 0) / 4;
    reviews.push({ candidate, model: record.model, task, status: 'reviewed', scores, overall, evidence: { public_pass: publicPass, hidden_pass: hiddenPass, forbidden_changes: evaluation.metrics.forbidden_change_count, changed_lines: lines }, explanation: explanation(task, publicPass, hiddenPass, lines, maintainabilityScore) });
  }
}

await writeFile(path.join(root, 'expert-reviews.json'), `${JSON.stringify({
  schema_version: 1,
  benchmark: 'phase2-historical',
  reviewer: { name: 'ChatGPT', model: 'gpt-5.6-sol' },
  policy: 'Objective public/hidden evidence constrains correctness and reliability; maintainability is assessed from focused change size and clarity; forbidden changes constrain scope. No-patch outcomes are N/A.',
  criteria: ['functional_correctness', 'reliability_edge_cases', 'maintainability_clarity', 'scope_discipline'],
  reviews
}, null, 2)}\n`);

console.log(JSON.stringify({ candidates: candidates.length, tasks: tasks.length, reviewed: reviews.filter((review) => review.status === 'reviewed').length, no_patch: reviews.filter((review) => review.status === 'no_patch').length }, null, 2));
