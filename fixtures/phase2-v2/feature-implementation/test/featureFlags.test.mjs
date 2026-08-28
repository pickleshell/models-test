import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveFeature } from '../src/featureFlags.js';
test('supports booleans and exact boolean overrides', () => { assert.equal(resolveFeature({ chat: true, beta: false }, { feature: 'chat' }), true); assert.equal(resolveFeature({ chat: true }, { feature: 'chat', overrides: { chat: false } }), false); });
test('handles zero and one hundred percent rollouts', () => { assert.equal(resolveFeature({ search: { enabled: true, rollout: 0 } }, { feature: 'search', userId: 'u1' }), false); assert.equal(resolveFeature({ search: { enabled: true, rollout: 100 } }, { feature: 'search', userId: 'u1' }), true); });
test('uses the documented intermediate rollout vector', () => assert.equal(resolveFeature({ search: { enabled: true, rollout: 50 } }, { feature: 'search', userId: 'a' }), false));
