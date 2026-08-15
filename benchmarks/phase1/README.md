# Phase 1 Ledger Screening

This benchmark compares the 17 OpenCode Go models on one compact code-repair task. The fixture is intentionally small but requires inspection, diagnosis, a minimal source edit, test execution, and final diff reporting.

Primary files:

- Candidate prompt: `fixtures/phase1-ledger/PROMPT.md`
- Fixture source: `fixtures/phase1-ledger/src/reconcile.js`
- Public tests: `fixtures/phase1-ledger/test/reconcile.test.mjs`
- Evaluator: `scripts/evaluate-phase1.mjs`
- Run protocol: `benchmarks/phase1/protocol.md`
- Model order: `benchmarks/phase1/model-order.json`
