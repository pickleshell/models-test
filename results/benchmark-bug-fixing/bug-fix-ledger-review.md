# Bug fixing — ledger reconciliation review

Review date: 2026-08-29

The completed patches were reviewed using the same four dimensions as the patch benchmarks: Functional correctness, Reliability / edge cases, Maintainability / clarity, and Scope discipline. Scores are on a 0–10 scale. Objective-evaluator success is used as correctness evidence; maintainability and scope are assessed from the submitted diff. Unavailable routes are not scored.

| Candidate | Objective | Functional | Reliability | Maintainability | Scope | Average |
|---|---:|---:|---:|---:|---:|---:|
| 01-gpt-5-6-luna | pass | 10 | 10 | 9 | 10 | 9.75 |
| 02-qwen3-7-plus | pass | 10 | 10 | 9 | 10 | 9.75 |
| 03-kimi-k2-7-code | pass | 10 | 10 | 9 | 10 | 9.75 |
| 04-deepseek-v4-pro | pass | 10 | 10 | 8 | 10 | 9.50 |
| 05-glm-5-2 | pass | 10 | 10 | 9 | 10 | 9.75 |
| 06-minimax-m3 | pass | 10 | 10 | 8 | 10 | 9.50 |
| 07-mimo-v2-5-pro | fail | 9 | 7 | 8 | 10 | 8.50 |
| 11-deepseek-v4-flash | pass | 10 | 10 | 9 | 10 | 9.75 |
| 14-hy3 | pass | 10 | 10 | 8 | 10 | 9.50 |
| 15-glm-5-1 | pass | 10 | 10 | 9 | 10 | 9.75 |
| 16-kimi-k2-6 | pass | 10 | 10 | 8 | 10 | 9.50 |
| 18-gpt-5-3-codex-spark | pass | 10 | 10 | 9 | 10 | 9.75 |
| 19-big-pickle | pass | 10 | 10 | 9 | 10 | 9.75 |
| 27-hy3-free | pass | 10 | 10 | 9 | 10 | 9.75 |
| 46-gpt-5-6-luna | pass | 10 | 10 | 9 | 10 | 9.75 |
| 47-gpt-5-6-sol | pass | 10 | 10 | 9 | 10 | 9.75 |
| 48-gpt-5-6-terra | pass | 10 | 10 | 9 | 10 | 9.75 |
| 49-gpt-5-4 | pass | 10 | 10 | 9 | 10 | 9.75 |
| 50-gpt-5-4-mini | pass | 10 | 10 | 8 | 10 | 9.50 |
| 54-inkling-openrouter | pass | 10 | 10 | 8 | 10 | 9.50 |
| 55-glm-5-3-go | pass | 10 | 10 | 9 | 10 | 9.75 |
| 57-qwen3-8-27b-openrouter | pass | 10 | 10 | 8 | 10 | 9.50 |
| 58-grok-4-5-openrouter | pass | 10 | 10 | 8 | 10 | 9.50 |
| 59-nemotron-3-super-openrouter-free | fail | 6 | 4 | 8 | 10 | 7.00 |
| 65-grok-4-6-go | pass | 10 | 10 | 8 | 10 | 9.50 |
| 66-glm-5-3-go | pass | 10 | 10 | 9 | 10 | 9.75 |
| 67-qwen3-8-max-go | pass | 10 | 10 | 9 | 10 | 9.75 |
| 68-kimi-k3-go | pass | 10 | 10 | 9 | 10 | 9.75 |

## Findings

- All 28 submitted patches changed only the allowed `src/reconcile.js`; Scope discipline is therefore 10 for every completed candidate.
- The 26 objective passes receive full correctness and reliability credit. Maintainability is 8 for materially longer or more verbose correct implementations and 9 for focused implementations.
- MiMo fixes UTC grouping, duplicates, refund attribution, and almost all exact-money validation, but incorrectly accepts the forbidden trailing-decimal form `1.`. This is a narrow edge-case defect rather than a general functional failure.
- Nemotron fixes duplicate handling and refund attribution, but leaves the original floating-point money parsing and locale-dependent day grouping unchanged. It therefore misses two central parts of the contract.

## Not scored

The following latest attempts were unavailable at preflight and produced no patch: 51-claude-haiku-4-5, 52-claude-sonnet-5, 53-claude-opus-5, 56-kimi-k3-opencode, 60-gpt-5-6-terra-opencode, 61-gpt-5-5-opencode, 62-gpt-5-5-pro-opencode, 63-gpt-5-4-pro-opencode, and 64-gpt-5-3-codex-opencode.
