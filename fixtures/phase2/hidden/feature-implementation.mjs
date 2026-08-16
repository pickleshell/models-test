import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const source = process.argv[process.argv.indexOf('--source') + 1];
const { resolveFeature } = await import(pathToFileURL(source).href);
assert.equal(resolveFeature({ x: { enabled: true, rollout: 0 } }, { feature: 'x', userId: 'stable' }), false);
assert.equal(resolveFeature({ x: { enabled: true, rollout: 100 } }, { feature: 'x', userId: 'stable' }), true);
assert.equal(resolveFeature({ x: false }, { feature: 'x', overrides: { x: true } }), true);
assert.equal(resolveFeature({ x: { enabled: true, rollout: 50 } }, { feature: 'x' }), false);
