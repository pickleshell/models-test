#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const release = process.argv[2];
if (!release) throw new Error('usage: node scripts/review-phase2-v2-release.mjs <release>');
const root = path.resolve('results/benchmark-phase2-v2', release);
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
const thresholds = {
  patch: [18, 30], 'bug-fix-ledger': [28, 48], 'feature-implementation': [42, 65],
  refactoring: [18, 30], 'repository-navigation': [16, 28], 'tests-edge-cases': [55, 90]
};
const failed = {
  patch: [8, 6], 'bug-fix-ledger': [7, 5], 'feature-implementation': [7, 5],
  refactoring: [7, 5], 'repository-navigation': [7, 5], 'tests-edge-cases': [8, 6]
};
const changedLines = (diff) => diff.split('\n').filter((line) =>
  (line.startsWith('+') && !line.startsWith('+++')) || (line.startsWith('-') && !line.startsWith('---'))).length;
const reviews = [];
for (const candidate of manifest.candidates) {
  for (const nomination of manifest.nominations) {
    const dir = path.join(root, candidate.id, nomination.id, 'attempts', 'attempt-1');
    const [run, objective, diff] = await Promise.all([
      readFile(path.join(dir, 'run.json'), 'utf8').then(JSON.parse),
      readFile(path.join(dir, 'objective-evaluator.json'), 'utf8').then(JSON.parse),
      readFile(path.join(dir, 'candidate.diff'), 'utf8').catch(() => '')
    ]);
    const lines = changedLines(diff);
    const publicPass = run.tests?.status === 0;
    const objectivePass = objective.passed === true;
    const forbidden = run.outcome === 'forbidden_changes' || (run.policy?.forbidden_changes?.length ?? 0) > 0;
    if (!diff.trim()) {
      reviews.push({ candidate: candidate.id, model: candidate.model, nomination: nomination.id, status: 'no_patch', scores: null, overall: null,
        evidence: { public_pass: publicPass, objective_pass: objectivePass, outcome: run.outcome, changed_lines: 0 }, explanation: 'No candidate patch was produced, so code quality is not scored.' });
      continue;
    }
    const [functional, reliability] = objectivePass ? [10, 10] : publicPass ? failed[nomination.id] : [5, 3];
    const [focused, verbose] = thresholds[nomination.id];
    const maintainability = lines <= focused ? 9 : lines <= verbose ? 8 : 7;
    const scope = forbidden ? 0 : 10;
    const scores = { functional_correctness: functional, reliability_edge_cases: reliability, maintainability_clarity: maintainability, scope_discipline: scope };
    reviews.push({ candidate: candidate.id, model: candidate.model, nomination: nomination.id, status: 'reviewed', scores,
      overall: Object.values(scores).reduce((sum, value) => sum + value, 0) / 4,
      evidence: { public_pass: publicPass, objective_pass: objectivePass, outcome: run.outcome, changed_lines: lines },
      explanation: objectivePass
        ? `Public and objective evaluators pass. The patch changes ${lines} lines and ${forbidden ? 'violates' : 'stays within'} the allowed scope.`
        : `The objective evaluator fails${publicPass ? ' despite passing public tests' : ' together with the public test command'}. The patch changes ${lines} lines and ${forbidden ? 'violates' : 'stays within'} the allowed scope.` });
  }
}
await writeFile(path.join(root, 'expert-reviews.json'), `${JSON.stringify({ schema_version: 1, benchmark: release,
  reviewer: { name: 'ChatGPT', model: 'gpt-5.6-sol' },
  policy: 'Deterministic public/objective evidence constrains correctness and reliability; focused diff size and clarity constrain maintainability; forbidden changes constrain scope. Scores are integer dimensions and Overall is their arithmetic mean.',
  criteria: ['functional_correctness', 'reliability_edge_cases', 'maintainability_clarity', 'scope_discipline'], reviews }, null, 2)}\n`);
console.log(JSON.stringify({ release, reviews: reviews.length, scored: reviews.filter((item) => item.scores).length }));
