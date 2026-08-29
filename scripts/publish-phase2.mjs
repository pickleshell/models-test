#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const repo = process.cwd();
const resultsRoot = path.join(repo, 'results/phase2');
const manifest = JSON.parse(await readFile(path.join(repo, 'benchmarks/phase2/manifest.json'), 'utf8'));
const expertReview = JSON.parse(await readFile(path.join(resultsRoot, 'expert-reviews.json'), 'utf8'));
const reviewByRecord = new Map(expertReview.reviews.map((review) => [`${review.candidate}:${review.task}`, review]));
const auditNote = 'Audit limitation: reference path matches 55/155 and hidden path matches 25/155. The hidden/reference paths were available in shared Git history, so this result is not blind.';

const candidates = (await readdir(resultsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const records = [];
for (const candidate of candidates) {
  for (const task of manifest.tasks) {
    const directory = path.join(resultsRoot, candidate, task.id);
    const record = JSON.parse(await readFile(path.join(directory, 'task-record.json'), 'utf8'));
    const evaluation = JSON.parse(await readFile(path.join(directory, 'evaluation.json'), 'utf8'));
    records.push({
      candidate,
      model: record.model,
      task: task.id,
      category: task.category,
      publicPass: evaluation.metrics.public_status === 0,
      hiddenPass: evaluation.metrics.hidden_passed === 1,
      forbidden: evaluation.metrics.forbidden_change_count,
      duration: record.agent.wall_time_ms / 1000,
      review: reviewByRecord.get(`${candidate}:${task.id}`)
    });
  }
}

if (records.length !== 155 || candidates.length !== 31) {
  throw new Error(`expected 31 candidates and 155 task records, got ${candidates.length} and ${records.length}`);
}

const score = (row) => Number(((Number(row.publicPass) + Number(row.hiddenPass)) / 2).toFixed(2));
const sortRows = (rows) => rows.slice().sort((a, b) => {
  if ('reviewed' in a) return b.reviewed - a.reviewed || (b.reviewOverall ?? -1) - (a.reviewOverall ?? -1) || b.score - a.score || a.time - b.time || a.candidate.localeCompare(b.candidate, undefined, { numeric: true });
  return Number(Boolean(b.review?.scores)) - Number(Boolean(a.review?.scores)) || (b.review?.overall ?? -1) - (a.review?.overall ?? -1) || Number(b.hiddenPass) - Number(a.hiddenPass) || a.duration - b.duration || a.candidate.localeCompare(b.candidate, undefined, { numeric: true });
});
const display = (value) => Number.isFinite(value) ? value.toFixed(2) : 'N/A';
const displayCriterion = (value, aggregate = false) => Number.isFinite(value) ? (aggregate ? value.toFixed(1) : String(value)) : 'N/A';
const table = (rows, aggregate = false) => {
  const header = aggregate
    ? '| Rank | Candidate | Model | Reviewed | Harnesses passed | Public | Hidden | Functional | Reliability | Maintainability | Scope | Review overall | Avg time (s) |\n|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|'
    : '| Rank | Candidate | Model | Public | Hidden | Functional | Reliability | Maintainability | Scope | Review overall | Time (s) |\n|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|';
  const lines = sortRows(rows).map((row, index) => aggregate
    ? `| ${row.reviewed === 5 ? index + 1 : 'N/A'} | ${row.candidate} | ${row.model} | ${row.reviewed}/5 | ${row.passed}/5 | ${row.public} | ${row.hidden} | ${displayCriterion(row.functional, true)} | ${displayCriterion(row.reliability, true)} | ${displayCriterion(row.maintainability, true)} | ${displayCriterion(row.scope, true)} | ${display(row.reviewOverall)} | ${row.time.toFixed(3)} |`
    : `| ${row.review?.scores ? index + 1 : 'N/A'} | ${row.candidate} | ${row.model} | ${row.publicPass ? 'pass' : 'fail'} | ${row.hiddenPass ? 'pass' : 'fail'} | ${displayCriterion(row.review?.scores?.functional_correctness)} | ${displayCriterion(row.review?.scores?.reliability_edge_cases)} | ${displayCriterion(row.review?.scores?.maintainability_clarity)} | ${displayCriterion(row.review?.scores?.scope_discipline)} | ${display(row.review?.overall)} | ${row.duration.toFixed(3)} |`);
  return [header, ...lines].join('\n');
};

await mkdir(resultsRoot, { recursive: true });
for (const task of manifest.tasks) {
  const rows = records.filter((record) => record.task === task.id);
  const markdown = [
    `# Phase 2 provisional ranking: ${task.id}`,
    '',
    'Historical/provisional publication from the recorded Phase 2 task records. Public and hidden results remain objective evidence. Expert-review scores use four 0–10 criteria and Overall is their arithmetic mean; no-patch outcomes are N/A.',
    '',
    auditNote,
    '',
    `Records: ${rows.length}/31 candidates.`,
    '',
    table(rows),
    ''
  ].join('\n');
  await writeFile(path.join(resultsRoot, `${task.id}-ranking.md`), markdown);
}

const aggregate = candidates.map((candidate) => {
  const rows = records.filter((record) => record.candidate === candidate);
  const reviewed = rows.filter((row) => row.review?.scores);
  const averageCriterion = (criterion) => reviewed.length ? reviewed.reduce((sum, row) => sum + row.review.scores[criterion], 0) / reviewed.length : null;
  return {
    candidate,
    model: rows[0].model,
    passed: rows.filter((row) => row.publicPass && row.hiddenPass).length,
    public: rows.filter((row) => row.publicPass).length,
    hidden: rows.filter((row) => row.hiddenPass).length,
    forbidden: rows.reduce((sum, row) => sum + row.forbidden, 0),
    score: rows.reduce((sum, row) => sum + Number(row.publicPass) + Number(row.hiddenPass), 0) / (rows.length * 2),
    time: rows.reduce((sum, row) => sum + row.duration, 0) / rows.length,
    reviewed: reviewed.length,
    functional: averageCriterion('functional_correctness'),
    reliability: averageCriterion('reliability_edge_cases'),
    maintainability: averageCriterion('maintainability_clarity'),
    scope: averageCriterion('scope_discipline'),
    reviewOverall: reviewed.length ? reviewed.reduce((sum, row) => sum + row.review.overall, 0) / reviewed.length : null
  };
});

const aggregateMarkdown = [
  '# Phase 2 provisional aggregate ranking',
  '',
  'Historical/provisional aggregate over all five harnesses. `Harnesses passed` requires both public and hidden evaluators to pass. Expert-review criteria are averaged across reviewed patches; candidates without all five patches receive no aggregate rank.',
  '',
  auditNote,
  '',
  `Arithmetic check: ${candidates.length} candidates x ${manifest.tasks.length} harnesses = ${records.length} task records.`,
  '',
  table(aggregate, true),
  ''
].join('\n');
await writeFile(path.join(resultsRoot, 'aggregate-ranking.md'), aggregateMarkdown);

const csv = ['rank,candidate,model,reviewed_patches,harnesses_passed,public_passes,hidden_passes,functional_correctness,reliability_edge_cases,maintainability_clarity,scope_discipline,review_overall,average_time_seconds'];
for (const [index, row] of sortRows(aggregate).entries()) {
  csv.push([row.reviewed === 5 ? index + 1 : '', row.candidate, row.model, `${row.reviewed}/5`, `${row.passed}/5`, row.public, row.hidden, displayCriterion(row.functional, true), displayCriterion(row.reliability, true), displayCriterion(row.maintainability, true), displayCriterion(row.scope, true), display(row.reviewOverall), row.time.toFixed(3)].join(','));
}
await writeFile(path.join(resultsRoot, 'aggregate-ranking.csv'), `${csv.join('\n')}\n`);
console.log(JSON.stringify({ candidates: candidates.length, tasks: manifest.tasks.length, records: records.length, audit: { reference_path_matches: '55/155', hidden_path_matches: '25/155', blind: false } }, null, 2));
