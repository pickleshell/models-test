import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRange } from '../src/range.js';
test('parses an inclusive range', () => assert.deepEqual(parseRange('2..7'), { start: 2, end: 7 }));
test('accepts surrounding whitespace', () => assert.deepEqual(parseRange(' -2..0 '), { start: -2, end: 0 }));
test('rejects one malformed range', () => assert.equal(parseRange('2-7'), null));
test('rejects a reversed range', () => assert.equal(parseRange('7..2'), null));
