import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const source = process.argv[process.argv.indexOf('--source') + 1];
const api = await import(pathToFileURL(source).href);
const events = [{ type: 'x', timestamp: 1 }, null, { type: 'x', timestamp: NaN }, { type: 'x', timestamp: 4 }, { type: 'y', timestamp: 9 }];
assert.equal(api.countByType(events, 'x'), 2);
assert.deepEqual(api.latestByType(events, 'x'), events[3]);
assert.equal(api.latestByType([], 'x'), null);
