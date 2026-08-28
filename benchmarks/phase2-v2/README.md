# Phase 2 v2 public benchmark suite

Phase 2 v2 is a clean-room, prepared five-task benchmark for a 31-by-5 rerun. It does not modify or supersede the historical `phase2` suite.

The tasks cover five distinct skill dimensions: bug fixing, feature implementation, structural refactoring, repository navigation, and tests plus edge cases. Each candidate receives only the fixture, task prompt, documented contract, and public tests. Deterministic objective evaluators also run private behavioral or structural checks after a candidate submission. Their stable opaque IDs are committed in this release manifest before the run; evaluator sources and canonical implementations remain private until the full run completes, when they will be published. Phase2-v2 materials remain embargoed and unpushed until candidate execution completes; hidden evaluator sources are published only after the full candidate run. LLM judges provide a separate qualitative axis and do not replace objective scoring.

All fixtures are self-contained Node projects with no dependencies. Baseline public-test expectations are recorded in `manifest.json`: seeded-defect tasks intentionally fail one or more public tests, while the refactoring task passes behavior tests because its required outcome is structural.

## Patch Nomination

`patch` is a fresh retry-policy repair task for the phase2-v2-r2 benchmark release.
