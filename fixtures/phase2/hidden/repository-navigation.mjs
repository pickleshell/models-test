import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const source = process.argv[process.argv.indexOf('--source') + 1];
const { formatLabel } = await import(pathToFileURL(source).href);
assert.equal(formatLabel('  API   response CODE '), 'Api Response Code');
assert.equal(formatLabel(null), '');
assert.equal(formatLabel('one\ttwo\nthree'), 'One Two Three');
