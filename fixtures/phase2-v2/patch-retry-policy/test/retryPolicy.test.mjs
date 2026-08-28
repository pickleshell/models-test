import test from 'node:test';
import assert from 'node:assert/strict';
import { computeRetryDelay, parseRetryAfter } from '../src/retryPolicy.js';

const now = Date.parse('2026-08-26T20:00:00Z');

test('parses delta-seconds and a future HTTP-date', () => {
  assert.equal(parseRetryAfter('5', now), 5000);
  assert.equal(parseRetryAfter(' 10 ', now), 10000);
  assert.equal(parseRetryAfter('Wed, 26 Aug 2026 20:00:20 GMT', now), 20000);
  assert.equal(parseRetryAfter('not-a-date', now), null);
});

test('Retry-After overrides fallback backoff', () => {
  assert.equal(computeRetryDelay({ attempt: 4, retryAfter: '2', nowMs: now }), 2000);
});

test('fallback starts at one second and doubles by attempt', () => {
  assert.equal(computeRetryDelay({ attempt: 1, retryAfter: null, nowMs: now }), 1000);
  assert.equal(computeRetryDelay({ attempt: 2, retryAfter: null, nowMs: now }), 2000);
});

test('invalid attempts are rejected', () => {
  assert.throws(() => computeRetryDelay({ attempt: 0, retryAfter: null, nowMs: now }));
});
