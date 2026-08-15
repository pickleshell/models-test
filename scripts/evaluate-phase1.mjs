#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function arg(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function run(command, args, options = {}) {
  const started = Date.now();
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });
  return { command: [command, ...args].join(' '), status: result.status, stdout: result.stdout, stderr: result.stderr, duration_ms: Date.now() - started };
}

function parseStatus(output) {
  return output.split('\n').filter(Boolean).map((line) => ({ code: line.slice(0, 2), file: line.slice(3) }));
}

function assertTotals(actual, expected) {
  assert.deepEqual(actual.totals, expected.totals);
  for (const [key, value] of Object.entries(expected.metrics)) {
    assert.equal(actual.metrics[key], value, `metric ${key}`);
  }
}

const workspace = path.resolve(arg('--workspace', '.'));
const model = arg('--model', 'unknown');
const jsonOut = arg('--json-out');
const fixture = path.join(workspace, 'fixtures/phase1-ledger');
const src = path.join(fixture, 'src/reconcile.js');
const publicTest = run('npm', ['test', '--prefix', fixture], { cwd: workspace });
const status = run('git', ['-C', workspace, 'status', '--porcelain', '--', 'fixtures/phase1-ledger'], { cwd: workspace });
const changed = parseStatus(status.stdout);
const allowedChanged = new Set(['fixtures/phase1-ledger/src/reconcile.js']);
const forbiddenChanges = changed.filter((entry) => !allowedChanged.has(entry.file));

const hidden = { passed: 0, failed: 0, failures: [] };
function hiddenCase(name, fn) {
  try {
    fn();
    hidden.passed += 1;
  } catch (error) {
    hidden.failed += 1;
    hidden.failures.push({ name, message: error.message });
  }
}

let api = null;
try {
  api = await import(pathToFileURL(src).href + `?cacheBust=${Date.now()}`);
} catch (error) {
  hidden.failed += 1;
  hidden.failures.push({ name: 'module imports', message: error.message });
}

if (api) {
  hiddenCase('rejects over-precise and negative money', () => {
    assert.throws(() => api.parseAmountToCents('1.005'));
    assert.throws(() => api.parseAmountToCents('-1.00'));
    assert.equal(api.parseAmountToCents('$1,234.50'), 123450);
  });

  hiddenCase('uses UTC day boundaries', () => {
    const result = api.reconcileLedger([
      { id: 'utc-sale', type: 'sale', accountId: 'acct-utc', currency: 'USD', amount: '4.00', createdAt: '2026-01-01T00:30:00+02:00' }
    ]);
    assertTotals(result, {
      totals: [{ accountId: 'acct-utc', currency: 'USD', day: '2025-12-31', netCents: 400, count: 1 }],
      metrics: { processed: 1, duplicateCount: 0, invalidCount: 0, orphanRefundCount: 0 }
    });
  });

  hiddenCase('refunds apply to original account and currency', () => {
    const result = api.reconcileLedger([
      { id: 's-original', type: 'sale', accountId: 'merchant-a', currency: 'USD', amount: '9.99', createdAt: '2026-03-01T08:00:00Z' },
      { id: 'r-original', type: 'refund', originalId: 's-original', accountId: 'processor-hold', currency: 'EUR', amount: '9.99', createdAt: '2026-03-02T09:00:00Z' }
    ]);
    assertTotals(result, {
      totals: [
        { accountId: 'merchant-a', currency: 'USD', day: '2026-03-01', netCents: 999, count: 1 },
        { accountId: 'merchant-a', currency: 'USD', day: '2026-03-02', netCents: -999, count: 1 }
      ],
      metrics: { processed: 2, duplicateCount: 0, invalidCount: 0, orphanRefundCount: 0 }
    });
  });

  hiddenCase('duplicate ids are first-write-wins before validation', () => {
    const result = api.reconcileLedger([
      { id: 'dup', type: 'sale', accountId: 'acct-a', currency: 'USD', amount: '5.00', createdAt: '2026-04-01T00:00:00Z' },
      { id: 'dup', type: 'sale', accountId: 'acct-a', currency: 'USD', amount: 'bad', createdAt: '2026-04-01T00:00:00Z' }
    ]);
    assertTotals(result, {
      totals: [{ accountId: 'acct-a', currency: 'USD', day: '2026-04-01', netCents: 500, count: 1 }],
      metrics: { processed: 1, duplicateCount: 1, invalidCount: 0, orphanRefundCount: 0 }
    });
  });
}

const result = {
  schema_version: 1,
  benchmark: 'phase1-ledger',
  model,
  workspace,
  pass: publicTest.status === 0 && hidden.failed === 0 && forbiddenChanges.length === 0,
  metrics: {
    public_status: publicTest.status,
    public_duration_ms: publicTest.duration_ms,
    hidden_passed: hidden.passed,
    hidden_failed: hidden.failed,
    forbidden_change_count: forbiddenChanges.length,
    changed_files: changed.map((entry) => entry.file)
  },
  public_test: {
    command: publicTest.command,
    stdout: publicTest.stdout,
    stderr: publicTest.stderr
  },
  hidden,
  forbidden_changes: forbiddenChanges
};

if (jsonOut) {
  mkdirSync(path.dirname(path.resolve(jsonOut)), { recursive: true });
  writeFileSync(jsonOut, JSON.stringify(result, null, 2) + '\n');
}

console.log(JSON.stringify(result, null, 2));
process.exit(result.pass ? 0 : 1);
