import test from 'node:test';
import assert from 'node:assert/strict';
import { renderAccountSummary } from '../src/index.js';
test('renders a simple account summary through the public API', () => assert.equal(renderAccountSummary({ name: 'Ada', status: ' pending review ', balance: 12.5 }), 'Account: Ada | Status: Pending Review | Balance: 12.50'));
test('renders safe defaults for arbitrary input', () => assert.equal(renderAccountSummary(null), 'Account:  | Status:  | Balance: 0.00'));
