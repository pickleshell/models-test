import test from 'node:test';
import assert from 'node:assert/strict';
const { resolveFeature } = await import(process.env.BENCHMARK_SOURCE ? `${process.env.BENCHMARK_SOURCE}/featureFlags.js` : '../src/featureFlags.js');

test('supports boolean flags and explicit overrides', () => {
  assert.equal(resolveFeature({ chat: true, beta: false }, { feature: 'chat' }), true);
  assert.equal(resolveFeature({ chat: true }, { feature: 'chat', overrides: { chat: false } }), false);
});

test('enables a 100 percent rollout for a user', () => {
  assert.equal(resolveFeature({ search: { enabled: true, rollout: 100 } }, { feature: 'search', userId: 'u1' }), true);
});
