import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const source = process.argv[process.argv.indexOf('--source') + 1];
const api = await import(pathToFileURL(source).href);
assert.throws(() => api.parseAmountToCents('1.005'));
assert.throws(() => api.parseAmountToCents('-1'));
const result = api.reconcileLedger([
  { id: 's', type: 'sale', accountId: 'merchant', currency: 'USD', amount: '5.00', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'r', type: 'refund', originalId: 's', accountId: 'other', currency: 'EUR', amount: '2.00', createdAt: '2026-01-02T00:00:00Z' },
  { id: 's', type: 'sale', accountId: 'merchant', currency: 'USD', amount: 'bad', createdAt: '2026-01-01T00:00:00Z' }
]);
assert.deepEqual(result.totals, [
  { accountId: 'merchant', currency: 'USD', day: '2026-01-01', netCents: 500, count: 1 },
  { accountId: 'merchant', currency: 'USD', day: '2026-01-02', netCents: -200, count: 1 }
]);
assert.deepEqual(result.metrics, { processed: 2, duplicateCount: 1, invalidCount: 0, orphanRefundCount: 0 });
