import test from 'node:test';
import assert from 'node:assert/strict';
const { parseRange } = await import(process.env.BENCHMARK_SOURCE ? `${process.env.BENCHMARK_SOURCE}/range.js` : '../src/range.js');

test('parses an inclusive range', () => assert.deepEqual(parseRange('2..7'), { start: 2, end: 7 }));
test('accepts surrounding whitespace', () => assert.deepEqual(parseRange(' -2..0 '), { start: -2, end: 0 }));
test('rejects malformed ranges', () => assert.equal(parseRange('2-7'), null));
test('rejects a reversed range', () => assert.equal(parseRange('7..2'), null));
