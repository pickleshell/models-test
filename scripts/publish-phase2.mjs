#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const repo = process.cwd();
const resultsRoot = path.join(repo, 'results/phase2');
const manifest = JSON.parse(await readFile(path.join(repo, 'benchmarks/phase2/manifest.json'), 'utf8'));
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
      duration: record.agent.wall_time_ms / 1000
    });
  }
}

if (records.length !== 155 || candidates.length !== 31) {
  throw new Error(`expected 31 candidates and 155 task records, got ${candidates.length} and ${records.length}`);
}

const score = (row) => Number(((Number(row.publicPass) + Number(row.hiddenPass)) / 2).toFixed(2));
const sortRows = (rows) => rows.slice().sort((a, b) => {
  const scoreA = 'score' in a ? a.score : score(a);
  const scoreB = 'score' in b ? b.score : score(b);
  return scoreB - scoreA || Number(b.hiddenPass ?? b.hidden) - Number(a.hiddenPass ?? a.hidden) || (a.duration ?? a.time) - (b.duration ?? b.time) || a.candidate.localeCompare(b.candidate, undefined, { numeric: true });
});
const table = (rows, aggregate = false) => {
  const header = aggregate
    ? '| Rank | Candidate | Model | Harnesses passed | Public | Hidden | Forbidden | Score | Avg time (s) |\n|---:|---|---|---:|---:|---:|---:|---:|---:|'
    : '| Rank | Candidate | Model | Public | Hidden | Forbidden | Score | Time (s) |\n|---:|---|---|---:|---:|---:|---:|---:|';
  const lines = sortRows(rows).map((row, index) => aggregate
    ? `| ${index + 1} | ${row.candidate} | ${row.model} | ${row.passed}/5 | ${row.public} | ${row.hidden} | ${row.forbidden} | ${row.score.toFixed(2)} | ${row.time.toFixed(3)} |`
    : `| ${index + 1} | ${row.candidate} | ${row.model} | ${row.publicPass ? 'pass' : 'fail'} | ${row.hiddenPass ? 'pass' : 'fail'} | ${row.forbidden} | ${score(row).toFixed(2)} | ${row.duration.toFixed(3)} |`);
  return [header, ...lines].join('\n');
};

await mkdir(resultsRoot, { recursive: true });
for (const task of manifest.tasks) {
  const rows = records.filter((record) => record.task === task.id);
  const markdown = [
    `# Phase 2 provisional ranking: ${task.id}`,
    '',
    'Historical/provisional publication from the recorded Phase 2 task records. Score is the arithmetic mean of the public and hidden evaluator pass indicators: `(public + hidden) / 2`.',
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
  return {
    candidate,
    model: rows[0].model,
    passed: rows.filter((row) => row.publicPass && row.hiddenPass).length,
    public: rows.filter((row) => row.publicPass).length,
    hidden: rows.filter((row) => row.hiddenPass).length,
    forbidden: rows.reduce((sum, row) => sum + row.forbidden, 0),
    score: rows.reduce((sum, row) => sum + Number(row.publicPass) + Number(row.hiddenPass), 0) / (rows.length * 2),
    time: rows.reduce((sum, row) => sum + row.duration, 0) / rows.length
  };
});

const aggregateMarkdown = [
  '# Phase 2 provisional aggregate ranking',
  '',
  'Historical/provisional aggregate over all five harnesses. `Harnesses passed` requires both public and hidden evaluators to pass. Score is the arithmetic mean of the ten binary public/hidden indicators across five records.',
  '',
  auditNote,
  '',
  `Arithmetic check: ${candidates.length} candidates x ${manifest.tasks.length} harnesses = ${records.length} task records.`,
  '',
  table(aggregate, true),
  ''
].join('\n');
await writeFile(path.join(resultsRoot, 'aggregate-ranking.md'), aggregateMarkdown);

const csv = ['rank,candidate,model,harnesses_passed,public_passes,hidden_passes,forbidden_changes,score,average_time_seconds'];
for (const [index, row] of sortRows(aggregate).entries()) {
  csv.push([index + 1, row.candidate, row.model, `${row.passed}/5`, row.public, row.hidden, row.forbidden, row.score.toFixed(2), row.time.toFixed(3)].join(','));
}
await writeFile(path.join(resultsRoot, 'aggregate-ranking.csv'), `${csv.join('\n')}\n`);
console.log(JSON.stringify({ candidates: candidates.length, tasks: manifest.tasks.length, records: records.length, audit: { reference_path_matches: '55/155', hidden_path_matches: '25/155', blind: false } }, null, 2));
