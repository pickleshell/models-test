# models-test

> [!NOTE]
> This is an independent open-source benchmark created and maintained by an individual developer for personal purposes and shared with the public. It is not an official test suite from OpenAI, OpenCode, or any model provider.
>
> A newer, more reliable model-testing pipeline is available in [models-benchmark](https://github.com/pickleshell/models-benchmark).

A reproducible benchmark for empirical model selection in coding-agent workflows. Rather than relying on generic leaderboards, this repository compares models on the same small, auditable software-maintenance task and preserves each candidate patch, execution record, evaluator report, and comparative code-quality review.

Authors: Me, ChatGPT, PickleShell, and 53 other models.

## Phase 2: prepared multi-harness suite

Phase 2 is **prepared and not yet executed**. It defines five independent coding-task harnesses in [`benchmarks/phase2/manifest.json`](benchmarks/phase2/manifest.json): bug fix (reusing the phase-1 ledger), feature implementation, refactoring, unfamiliar repository navigation/change, and tests plus edge cases. No models have been run and no phase-2 results have been published.

The suite uses a shared prompt, detached-worktree preparation, evaluator, and result schema for every task. Each fixture has a deterministic local hidden evaluator, a reference solution, a deliberately failing baseline, and an allowed-change list. See [`benchmarks/phase2/README.md`](benchmarks/phase2/README.md) for the prepared-stage protocol.

## Phase 1: ledger reconciliation

Every model received the same baseline and prompt to repair the JavaScript settlement reconciler in [`fixtures/phase1-ledger`](fixtures/phase1-ledger/). The task tests:

- transaction-ID idempotency and duplicate accounting;
- exact non-negative money parsing with optional dollar signs and comma separators;
- rejection of malformed values and precision beyond two decimal places;
- UTC-day grouping;
- sale/refund attribution, including original-sale account and currency ownership;
- orphan-refund and invalid-row metrics; and
- preservation of the exported `parseAmountToCents` and `reconcileLedger` API.

The exact candidate instructions are in [`PROMPT.md`](fixtures/phase1-ledger/PROMPT.md), with the public fixture tests beside the source.

## Fair-test methodology

Each candidate started from an identical Git baseline and prompt in its own isolated detached worktree. The candidate could run the public tests, while an independent evaluator measured public results, hidden cases, and forbidden file changes afterward. Reviewers did not inspect hidden evaluator or hidden-test implementation; hidden evidence is used only through recorded pass/fail counts. All visible patches were assessed against the same rubric, and runtime/provider availability is reported separately from code quality.

Runs span OpenCode Go, OpenCode Free, and Codex over MCP. During the Codex series, the CLI was upgraded from 0.143.0 to 0.147.0; the earlier infrastructure-incompatible Luna and Terra reports were replaced by successful post-upgrade reruns, explicitly marked in their metadata.

## Results and artifacts

[`results/phase1/`](results/phase1/) contains one directory per tested candidate. Depending on execution outcome, a directory includes:

- `candidate.diff` — the exact patch against the shared baseline;
- `run-metadata.json` — model, runtime, duration, status, and result summary;
- `evaluation.json` and/or `evaluator.stdout.json` — structured evaluator output;
- `evaluator.stderr.txt` — captured evaluator diagnostics; and
- the aggregate [detailed Markdown ranking](results/phase1/code-quality-ranking.md) and [machine-readable CSV](results/phase1/code-quality-ranking.csv).

Thirty-one candidates produced patches and received quality scores. Twenty-two no-patch provider/timeout outcomes are listed as N/A availability outcomes, not model-quality failures.

## Code-quality rubric

Visible patches are scored from 1–10 on simplicity, readability, absence of extra code, reliability, and edge-case handling. Overall is the arithmetic mean of those five integer scores. Anchors are 10 exceptional, 8 strong, 6 adequate, 4 fragile or needlessly complex, and 2 seriously flawed. The review is necessarily comparative and subjective, but correctness evidence constrains reliability and edge-case scores. Price is reserved as TBD.

**[Open the interactive model comparison](https://pickleshell.github.io/model-comparison.html) for sortable columns and pricing dated on the page.**

| Rank | Model | Simplicity | Readability | No extra code | Reliability | Edge cases | Overall | Seconds | Price |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | gpt-5.6-terra | 9 | 9 | 9 | 10 | 10 | 9.4 | 52.637 | TBD |
| 2 | gpt-5.6-sol | 9 | 9 | 9 | 10 | 10 | 9.4 | 83.836 | TBD |
| 3 | gpt-5.4 | 9 | 9 | 10 | 8 | 9 | 9.0 | 48.633 | TBD |
| 4 | opencode/big-pickle | 9 | 9 | 9 | 8 | 9 | 8.8 | 68.472 | TBD |
| 5 | opencode-go/deepseek-v4-pro | 9 | 9 | 9 | 8 | 9 | 8.8 | 141.098 | TBD |
| 6 | opencode-go/hy3 | 9 | 9 | 10 | 7 | 8 | 8.6 | 53.079 | TBD |
| 7 | opencode-go/gpt-5.6-luna | 8 | 8 | 7 | 10 | 10 | 8.6 | 53.378 | TBD |
| 8 | opencode-go/grok-4.5 | 9 | 9 | 9 | 7 | 8 | 8.4 | 37.682 | TBD |
| 9 | opencode/hy3-free | 9 | 9 | 9 | 7 | 8 | 8.4 | 65.815 | TBD |
| 10 | opencode-go/qwen3.7-plus | 9 | 9 | 9 | 7 | 8 | 8.4 | 74.826 | TBD |
| 11 | gpt-5.4-mini | 8 | 9 | 8 | 8 | 9 | 8.4 | 137.074 | TBD |
| 12 | opencode-go/kimi-k3 | 9 | 9 | 9 | 7 | 8 | 8.4 | 230.178 | TBD |
| 13 | opencode/claude-sonnet-5 | 9 | 9 | 9 | 7 | 8 | 8.4 | 142.335 | TBD |
| 14 | opencode/claude-opus-5 | 8 | 8 | 8 | 8 | 9 | 8.2 | 168.971 | TBD |
| 15 | gpt-5.3-codex-spark | 8 | 8 | 7 | 8 | 9 | 8.0 | 42.152 | TBD |
| 16 | opencode/claude-haiku-4-5 | 9 | 8 | 9 | 7 | 7 | 8.0 | 48.291 | TBD |
| 17 | opencode-go/kimi-k2.7-code | 8 | 8 | 8 | 7 | 9 | 8.0 | 121.960 | TBD |
| 18 | opencode-go/glm-5.1 | 8 | 8 | 9 | 7 | 8 | 8.0 | 156.355 | TBD |
| 19 | opencode-go/deepseek-v4-flash | 8 | 8 | 7 | 8 | 8 | 7.8 | 91.645 | TBD |
| 20 | opencode-go/glm-5.2 | 8 | 8 | 8 | 7 | 8 | 7.8 | 91.990 | TBD |
| 21 | opencode/deepseek-v4-flash-free | 7 | 8 | 6 | 9 | 9 | 7.8 | 93.522 | TBD |
| 22 | gpt-5.6-luna | 6 | 7 | 5 | 10 | 10 | 7.6 | 84.371 | TBD |
| 23 | opencode-go/minimax-m3 | 8 | 8 | 7 | 7 | 8 | 7.6 | 235.614 | TBD |
| 24 | opencode/nemotron-3-ultra-free | 7 | 7 | 6 | 8 | 9 | 7.4 | 99.421 | TBD |
| 25 | opencode-go/mimo-v2.5-pro | 7 | 7 | 6 | 7 | 8 | 7.0 | 98.725 | TBD |
| 26 | opencode/laguna-s-2.1-free | 7 | 7 | 6 | 7 | 8 | 7.0 | 450.765 | TBD |
| 27 | opencode-go/minimax-m2.7 | 10 | 10 | 10 | 2 | 2 | 6.8 | 36.705 | TBD |
| 28 | opencode-go/mimo-v2.5 | 10 | 10 | 10 | 2 | 2 | 6.8 | 55.470 | TBD |
| 29 | opencode-go/kimi-k2.6 | 6 | 7 | 5 | 7 | 8 | 6.6 | 159.868 | TBD |
| 30 | opencode/nemotron-3.5-lightning-free | 7 | 7 | 6 | 6 | 7 | 6.6 | 202.094 | TBD |
| 31 | opencode/mimo-v2.5-free | 8 | 8 | 8 | 4 | 4 | 6.4 | 79.247 | TBD |

## Key conclusions

- GPT-5.6 Terra and GPT-5.6 Sol share the highest quality score at 9.4.
- GPT-5.4 offers the strongest quality/speed balance among the top-ranked solutions.
- Grok 4.5 is the fastest strong solution in the scored set.
- Claude Sonnet 5 ranks 13th at 8.4, Claude Opus 5 ranks 14th at 8.2, and Claude Haiku 4.5 ranks 16th at 8.0.
- Provider failures and timeouts remain separate from patch-quality judgments.

### Claude phase-1 result details

- Candidate 51 `opencode/claude-haiku-4-5`: request `req_msweqn6b-198956b2`, session `ses_ff33276c9ffewJH4E2McgLCXMP`, started `2026-08-16T22:59:50.868Z`, completed `2026-08-16T23:00:39.159Z`, duration `48.291 s`; public `4/4`, hidden `4/4`.
- Candidate 52 `opencode/claude-sonnet-5`: request `req_msweqo7y-5688781d`, session `ses_ff33270e1ffenOozNYXQ0FxQu1`, started `2026-08-16T22:59:52.223Z`, completed `2026-08-16T23:02:14.558Z`, duration `142.335 s`; public `4/4`, hidden `4/4`.
- Candidate 53 `opencode/claude-opus-5`: request `req_mswewp8d-a7fe1b62`, session `ses_ff32e26cbffe0ksZ7gUtP18gT2`, started `2026-08-16T23:04:33.470Z`, completed `2026-08-16T23:07:22.441Z`, duration `168.971 s`; public `4/4`, hidden `4/4`.

## Reproducing locally

Requirements: Node.js with npm and Git. From the repository root:

The committed source is intentionally buggy: its public suite is expected to pass 3/4 tests and fail the duplicate-ID case. That baseline failure defines the repair task; it is not a publication failure. To reproduce a successful recorded candidate from a fresh clone, prepare its detached worktree, apply the published patch, then test and evaluate that exact workspace:

```sh
# Expected baseline result: 3/4; duplicate-ID test fails.
npm test --prefix fixtures/phase1-ledger

node scripts/phase1-prepare-worktrees.mjs
git -C .worktrees/phase1/48-gpt-5-6-terra apply "$(pwd)/results/phase1/48-gpt-5-6-terra/candidate.diff"

# Expected Terra result: 4/4.
npm test --prefix .worktrees/phase1/48-gpt-5-6-terra/fixtures/phase1-ledger

node scripts/evaluate-phase1.mjs \
  --workspace "$(pwd)/.worktrees/phase1/48-gpt-5-6-terra" \
  --model gpt-5.6-terra \
  --json-out results/phase1/48-gpt-5-6-terra/evaluation.json
```

Use an exact detached worktree for each candidate and save evaluator output under its corresponding `results/phase1/<candidate>/` directory. The evaluator requires an explicit candidate-worktree path; the intentionally broken repository root is not a successful candidate workspace. See the [phase-1 protocol](benchmarks/phase1/protocol.md), [benchmark definition](benchmarks/phase1/README.md), and [scoring guidance](rubrics/scoring.md).

## Limitations

This phase covers one maintenance task, one JavaScript fixture, and a small hidden case set. Provider availability and latency vary over time, and execution duration is not a stable model property. Quality scores are reviewer judgments grounded in visible code and recorded correctness rather than a universal measure. Pricing has not yet been added.
