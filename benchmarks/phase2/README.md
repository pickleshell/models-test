# Phase 2 Harness Suite

This is a **prepared, not yet executed** five-harness benchmark. No model runs or phase-2 results are included.

`manifest.json` is the shared interface and [`result-schema.json`](result-schema.json) defines the result contract. Every task supplies the same prompt, fixture baseline, public test command, hidden evaluator, reference source, and allowed-change list. Use `node scripts/benchmark.mjs prompt --task <id>` to print a prompt, `prepare` to create identical detached worktrees, and `evaluate` to produce one schema-versioned result per harness.

## Sequential runner

`node scripts/phase2-runner.mjs` derives candidates from `results/phase1`: only directories with a non-empty `candidate.diff` are selected, and the recorded `runtime` and exact `model` are retained. The runner executes candidate-major order, completing all five tasks for one candidate before starting the next. Each task gets a detached worktree from the same baseline under `.worktrees/phase2/`.

The runner is resumable. A completed `task-record.json` is skipped, while `results/phase2/runner-state.json` is updated after every task. Records include the baseline, prompt path, exact invocation, wall time, exit status, failure classification, patch, evaluator JSON, and paths to raw agent/evaluator stdout and stderr. Agent and evaluator processes are timeout-limited to 900 seconds by default.

Do not pass hidden-test paths in a prompt. The runner removes each hidden evaluator from the candidate worktree before invoking the model and restores it only after the agent exits, immediately before local evaluation. Hidden tests are never sent to a model.

Preview the exact candidate/task order without starting a model:

```sh
node scripts/phase2-runner.mjs --dry-run
```

Run selected candidates with an alternate baseline or timeout:

```sh
node scripts/phase2-runner.mjs --candidate 01-gpt-5-6-luna --candidate gpt-5.3-codex-spark \
  --baseline HEAD --timeout-seconds 900
```

Candidate filters match a Phase 1 result directory, exact model identifier, or slug. The runner invokes OpenCode with `opencode run --model <exact-id>` and Codex with `codex exec --model <exact-id> --cd <worktree>`; no benchmark process makes network requests independently of those CLIs.

The bug-fix harness reuses the published phase-1 ledger fixture. The other harnesses cover feature implementation, refactoring, unfamiliar-repository navigation/change, and tests plus edge cases. Hidden evaluators are deterministic, local Node programs, and no task requires network access or external runtime dependencies.
