import test from 'node:test';
import assert from 'node:assert/strict';
import { countByType, latestByType } from '../src/events.js';
const first = { type: 'push', timestamp: 5 }; const events = [{ type: 'push', timestamp: 2 }, first, { type: 'push', timestamp: 5 }, { type: 'issue', timestamp: 3 }, { type: 'push', timestamp: NaN }];
test('counts valid matching events', () => assert.equal(countByType(events, 'push'), 3));
test('returns the first latest matching event', () => assert.equal(latestByType(events, 'push'), first));
test('returns safe defaults for invalid top-level input', () => { assert.equal(countByType(null, 'push'), 0); assert.equal(latestByType([], ''), null); });
