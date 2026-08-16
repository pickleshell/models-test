import test from 'node:test';
import assert from 'node:assert/strict';
const { formatLabel } = await import(process.env.BENCHMARK_SOURCE ? `${process.env.BENCHMARK_SOURCE}/labels.js` : '../src/labels.js');

test('formats a simple label', () => assert.equal(formatLabel('  account status '), 'Account Status'));
test('returns empty for empty input', () => assert.equal(formatLabel(''), ''));
