# Phase 2 Harness Suite

This is a **prepared, not yet executed** five-harness benchmark. No model runs or phase-2 results are included.

`manifest.json` is the shared interface and [`result-schema.json`](result-schema.json) defines the result contract. Every task supplies the same prompt, fixture baseline, public test command, hidden evaluator, reference source, and allowed-change list. Use `node scripts/benchmark.mjs prompt --task <id>` to print a prompt, `prepare` to create identical detached worktrees, and `evaluate` to produce one schema-versioned result per harness. Result records contain public/hidden outcomes, forbidden changes, and metrics suitable for one table per harness and a later aggregate matrix.

The bug-fix harness reuses the published phase-1 ledger fixture. The other harnesses cover feature implementation, refactoring, unfamiliar-repository navigation/change, and tests plus edge cases. Hidden evaluators are deterministic, local Node programs, and no task requires network access or external runtime dependencies.
