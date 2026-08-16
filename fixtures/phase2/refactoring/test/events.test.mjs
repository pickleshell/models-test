import test from 'node:test';
import assert from 'node:assert/strict';
const { countByType, latestByType } = await import(process.env.BENCHMARK_SOURCE ? `${process.env.BENCHMARK_SOURCE}/events.js` : '../src/events.js');

const events = [{ type: 'push', timestamp: 2 }, { type: 'push', timestamp: 5 }, { type: 'issue', timestamp: 3 }];
test('counts matching events', () => assert.equal(countByType(events, 'push'), 2));
test('returns the latest matching event', () => assert.deepEqual(latestByType(events, 'push'), events[1]));
test('ignores malformed timestamps', () => assert.equal(countByType([{ type: 'push', timestamp: NaN }], 'push'), 0));
