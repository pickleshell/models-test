import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const source = process.argv[process.argv.indexOf('--source') + 1];
const { parseRange } = await import(pathToFileURL(source).href);
assert.deepEqual(parseRange('-100000..100000'), { start: -100000, end: 100000 });
for (const value of ['3..2', '1.0..2', '1..100001', '1..2..3', 4, '']) assert.equal(parseRange(value), null, value);
