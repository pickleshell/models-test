#!/usr/bin/env node
import { readFileSync } from 'node:fs';

process.stdout.write(readFileSync(new URL('../fixtures/phase1-ledger/PROMPT.md', import.meta.url), 'utf8'));
