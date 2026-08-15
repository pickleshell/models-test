You are working in the `models-test` repository on the phase-1 ledger fixture.

Do not modify tests, benchmark scripts, package metadata, `.gitignore`, or files outside `fixtures/phase1-ledger/src/`.

Task: diagnose and fix the settlement reconciliation implementation in `fixtures/phase1-ledger/src/reconcile.js` with the smallest code change that satisfies the documented behavior below.

Expected behavior:
- Each transaction `id` is idempotent. If the same `id` appears more than once, count it in `duplicateCount` and ignore every duplicate after the first occurrence.
- Parse money exactly from decimal strings or numbers representing dollars. Accept optional `$` and comma separators. Reject malformed values, negative values, and values with more than two decimal places instead of rounding them.
- Group totals by UTC calendar day from `createdAt`.
- A sale adds its amount to that sale's `accountId` and `currency`.
- A refund subtracts from the original sale's `accountId` and `currency`, using the refund's `createdAt` day. Ignore orphan refunds and count them in `orphanRefundCount`.
- `processed` counts only rows that actually affect totals.
- Keep the public API shape unchanged: `parseAmountToCents(amount)` and `reconcileLedger(entries)`.

Before finishing, run:

```sh
npm test --prefix fixtures/phase1-ledger
node scripts/evaluate-phase1.mjs --workspace . --model opencode-go/gpt-5.6-luna --json-out results/phase1/manual/evaluation.json
```

Report changed files, test results, and `git diff`.
