import test from 'node:test';
import assert from 'node:assert/strict';
import { reconcileLedger, parseAmountToCents } from '../src/reconcile.js';

test('parses ordinary decimal money into cents', () => {
  assert.equal(parseAmountToCents('12.34'), 1234);
  assert.equal(parseAmountToCents('$1,200.05'), 120005);
});

test('summarizes sales by account, currency, and UTC day', () => {
  const result = reconcileLedger([
    { id: 's1', type: 'sale', accountId: 'acct-a', currency: 'USD', amount: '10.00', createdAt: '2026-02-03T10:00:00Z' },
    { id: 's2', type: 'sale', accountId: 'acct-a', currency: 'USD', amount: '2.50', createdAt: '2026-02-03T18:00:00Z' },
    { id: 's3', type: 'sale', accountId: 'acct-b', currency: 'EUR', amount: '7.00', createdAt: '2026-02-03T12:00:00Z' }
  ]);

  assert.deepEqual(result.totals, [
    { accountId: 'acct-a', currency: 'USD', day: '2026-02-03', netCents: 1250, count: 2 },
    { accountId: 'acct-b', currency: 'EUR', day: '2026-02-03', netCents: 700, count: 1 }
  ]);
  assert.equal(result.metrics.processed, 3);
});

test('does not double count duplicate transaction ids', () => {
  const result = reconcileLedger([
    { id: 's1', type: 'sale', accountId: 'acct-a', currency: 'USD', amount: '10.00', createdAt: '2026-02-03T10:00:00Z' },
    { id: 's1', type: 'sale', accountId: 'acct-a', currency: 'USD', amount: '99.00', createdAt: '2026-02-03T10:05:00Z' }
  ]);

  assert.equal(result.metrics.duplicateCount, 1);
  assert.equal(result.metrics.processed, 1);
  assert.deepEqual(result.totals, [
    { accountId: 'acct-a', currency: 'USD', day: '2026-02-03', netCents: 1000, count: 1 }
  ]);
});

test('counts invalid rows and orphan refunds without adding them to totals', () => {
  const result = reconcileLedger([
    { id: 'bad', type: 'sale', accountId: 'acct-a', currency: 'USD', amount: 'not-money', createdAt: '2026-02-03T10:00:00Z' },
    { id: 'r1', type: 'refund', originalId: 'missing', accountId: 'acct-a', currency: 'USD', amount: '3.00', createdAt: '2026-02-04T10:00:00Z' }
  ]);

  assert.equal(result.metrics.invalidCount, 1);
  assert.equal(result.metrics.orphanRefundCount, 1);
  assert.deepEqual(result.totals, []);
});
