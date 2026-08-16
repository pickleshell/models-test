# Phase 1 code-quality ranking

Scores assess only visible candidate patches against the public task/API, with recorded public and hidden counts used as correctness evidence. Hidden evaluator and test implementations were not inspected.

Scoring anchors: **10 exceptional**, **8 strong**, **6 adequate**, **4 fragile or needlessly complex**, **2 seriously flawed**. Correctness evidence constrains `reliability` and `edge_cases`; `overall` is the arithmetic mean of the five integer quality scores. `price` is reserved as `TBD`.

## Ranked patches

Sorted by overall score descending, then execution time ascending.

| Rank | Candidate | Model | Simplicity | Readability | No extra code | Reliability | Edge cases | Overall | Time (s) | Public | Hidden | Forbidden | Diff lines | Status | Price | Evidence |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---|---|---:|---:|---|---|---|
| 1 | 48-gpt-5-6-terra | gpt-5.6-terra | 9 | 9 | 9 | 10 | 10 | 9.4 | 52.637 | 4/4 | 4/4 | 0 | 72 | success | TBD | The patch combines concise validation, safe-integer checks, and direct ledger corrections, though the whole-part extraction is slightly denser than ideal. |
| 2 | 47-gpt-5-6-sol | gpt-5.6-sol | 9 | 9 | 9 | 10 | 10 | 9.4 | 83.836 | 4/4 | 4/4 | 0 | 69 | success | TBD | Exact range-checked BigInt parsing and focused ledger fixes provide excellent safety, with only modest regex density as a readability cost. |
| 3 | 49-gpt-5-4 | gpt-5.4 | 9 | 9 | 10 | 8 | 9 | 9.0 | 48.633 | 4/4 | 4/4 | 0 | 50 | success | TBD | This is the leanest high-quality complete patch, but its money conversion does not explicitly reject safe-integer overflow. |
| 4 | 19-big-pickle | opencode/big-pickle | 9 | 9 | 9 | 8 | 9 | 8.8 | 68.472 | 4/4 | 4/4 | 0 | 50 | success | TBD | The regex capture approach is concise and readable with strong recorded correctness, though it does not guard safe-integer overflow. |
| 5 | 04-deepseek-v4-pro | opencode-go/deepseek-v4-pro | 9 | 9 | 9 | 8 | 9 | 8.8 | 141.098 | 4/4 | 4/4 | 0 | 60 | success | TBD | A concise validated parser and minimal ledger fixes make this easy to audit, though large values still rely on ordinary Number arithmetic. |
| 6 | 14-hy3 | opencode-go/hy3 | 9 | 9 | 10 | 7 | 8 | 8.6 | 53.079 | 4/4 | 4/4 | 0 | 45 | success | TBD | This is one of the smallest complete recorded fixes, but permissive symbol stripping and retained floating-point rounding reduce defensive confidence. |
| 7 | 01-gpt-5-6-luna | opencode-go/gpt-5.6-luna | 8 | 8 | 7 | 10 | 10 | 8.6 | 53.378 | 4/4 | 4/4 | 0 | 98 | success | TBD | Exact BigInt parsing and deferred refund resolution are robust, but the two-pass refund queue adds noticeable machinery. |
| 8 | 09-grok-4-5 | opencode-go/grok-4.5 | 9 | 9 | 9 | 7 | 8 | 8.4 | 37.682 | 4/4 | 4/4 | 0 | 46 | success | TBD | The solution is notably small and readable, but validating only after removing all dollar/comma characters accepts malformed money strings. |
| 9 | 27-hy3-free | opencode/hy3-free | 9 | 9 | 9 | 7 | 8 | 8.4 | 65.815 | 4/4 | 4/4 | 0 | 54 | success | TBD | The patch is compact and passes all recorded checks, but stripping punctuation before its regex permits malformed currency formatting. |
| 10 | 02-qwen3-7-plus | opencode-go/qwen3.7-plus | 9 | 9 | 9 | 7 | 8 | 8.4 | 74.826 | 4/4 | 4/4 | 0 | 45 | success | TBD | The patch is compact and easy to follow, but stripping currency punctuation before validation admits malformed formatting and retains Number rounding. |
| 11 | 50-gpt-5-4-mini | gpt-5.4-mini | 8 | 9 | 8 | 8 | 9 | 8.4 | 137.074 | 4/4 | 4/4 | 0 | 76 | success | TBD | Clear type-specific ledger flow and exact BigInt construction aid correctness, but converting BigInt to Number without a range guard weakens numeric safety. |
| 12 | 10-kimi-k3 | opencode-go/kimi-k3 | 9 | 9 | 9 | 7 | 8 | 8.4 | 230.178 | 4/4 | 4/4 | 0 | 48 | success | TBD | The core fix is economical and clear, but its loose comma grammar allows malformed groupings and Number arithmetic lacks a range check. |
| 13 | 18-gpt-5-3-codex-spark | gpt-5.3-codex-spark | 8 | 8 | 7 | 8 | 9 | 8.0 | 42.152 | 4/4 | 4/4 | 0 | 61 | success | TBD | The validated decimal grammar and UTC logic are robust, but a redundant decimal-length check and Number arithmetic make the patch larger than necessary. |
| 14 | 03-kimi-k2-7-code | opencode-go/kimi-k2.7-code | 8 | 8 | 8 | 7 | 9 | 8.0 | 121.960 | 4/4 | 4/4 | 0 | 62 | success | TBD | Integer-style BigInt parsing is clear and covers the required cases, but converting an unbounded result back to Number lacks a safe-range guard. |
| 15 | 15-glm-5-1 | opencode-go/glm-5.1 | 8 | 8 | 9 | 7 | 8 | 8.0 | 156.355 | 4/4 | 4/4 | 0 | 57 | success | TBD | The implementation is compact and understandable, though permissive punctuation removal and unchecked Number arithmetic leave avoidable input-safety gaps. |
| 16 | 11-deepseek-v4-flash | opencode-go/deepseek-v4-flash | 8 | 8 | 7 | 8 | 8 | 7.8 | 91.645 | 4/4 | 4/4 | 0 | 56 | success | TBD | The parser and UTC/refund fixes are concise, but delaying seen-id registration makes invalid or orphan first occurrences behave inconsistently for idempotency. |
| 17 | 05-glm-5-2 | opencode-go/glm-5.2 | 8 | 8 | 8 | 7 | 8 | 7.8 | 91.990 | 4/4 | 4/4 | 0 | 52 | success | TBD | The changes are structured and direct, but permissive comma removal and Number-based construction weaken malformed-input and large-value safety. |
| 18 | 22-deepseek-v4-flash-free | opencode/deepseek-v4-flash-free | 7 | 8 | 6 | 9 | 9 | 7.8 | 93.522 | 4/4 | 4/4 | 0 | 72 | success | TBD | Separate handling for numeric inputs is defensively careful, but tolerance arithmetic and branch-specific seen-id updates make the solution more complex than needed. |
| 19 | 46-gpt-5-6-luna | gpt-5.6-luna | 6 | 7 | 5 | 10 | 10 | 7.6 | 84.371 | 4/4 | 4/4 | 0 | 125 | success | TBD | It is exceptionally defensive and passes every recorded case, but exponent expansion plus two full ledger passes create substantial unnecessary complexity. |
| 20 | 06-minimax-m3 | opencode-go/minimax-m3 | 8 | 8 | 7 | 7 | 8 | 7.6 | 235.614 | 4/4 | 4/4 | 0 | 67 | success | TBD | Sale-only ownership checks and UTC handling are sensible, but extra date type validation and permissive punctuation normalization add complexity without full safety. |
| 21 | 35-nemotron-3-ultra-free | opencode/nemotron-3-ultra-free | 7 | 7 | 6 | 8 | 9 | 7.4 | 99.421 | 4/4 | 4/4 | 0 | 64 | agent_error_with_partial_patch | TBD | The partial-error patch nevertheless passes all recorded checks, but redundant refund-day recomputation and a missing final newline reduce polish. |
| 22 | 07-mimo-v2-5-pro | opencode-go/mimo-v2.5-pro | 7 | 7 | 6 | 7 | 8 | 7.0 | 98.725 | 4/4 | 4/4 | 0 | 51 | success | TBD | It fixes all recorded correctness cases, but ad hoc decimal slicing and validation after punctuation stripping are harder to trust and maintain. |
| 23 | 20-laguna-s-2-1-free | opencode/laguna-s-2.1-free | 7 | 7 | 6 | 7 | 8 | 7.0 | 450.765 | 4/4 | 4/4 | 0 | 51 | success | TBD | The required behavior is covered, but repeated string splitting and locale-dependent date formatting are less direct and maintainable than simple alternatives. |
| 24 | 17-minimax-m2-7 | opencode-go/minimax-m2.7 | 10 | 10 | 10 | 2 | 2 | 6.8 | 36.705 | 4/4 | 2/4 | 0 | 12 | evaluated_failure | TBD | The duplicate guard is perfectly direct, but recorded hidden results confirm that half of the required behavior remains unfixed. |
| 25 | 13-mimo-v2-5 | opencode-go/mimo-v2.5 | 10 | 10 | 10 | 2 | 2 | 6.8 | 55.470 | 4/4 | 2/4 | 0 | 12 | evaluated_failure | TBD | The one-line duplicate fix is exceptionally economical, but recorded hidden results show it leaves two of four required correctness areas broken. |
| 26 | 16-kimi-k2-6 | opencode-go/kimi-k2.6 | 6 | 7 | 5 | 7 | 8 | 6.6 | 159.868 | 4/4 | 4/4 | 0 | 58 | success | TBD | Manual component parsing passes recorded checks, but the branching is needlessly long and accepts questionable forms after indiscriminate symbol removal. |
| 27 | 33-nemotron-3-5-lightning-free | opencode/nemotron-3.5-lightning-free | 7 | 7 | 6 | 6 | 7 | 6.6 | 202.094 | 4/4 | 4/4 | 0 | 53 | success | TBD | The ledger fixes are straightforward, but fragmented validation can accept empty or punctuation-only amounts and still depends on rounding. |
| 28 | 28-mimo-v2-5-free | opencode/mimo-v2.5-free | 8 | 8 | 8 | 4 | 4 | 6.4 | 79.247 | 4/4 | 3/4 | 0 | 36 | evaluated_failure | TBD | The partial patch cleanly fixes duplicates, UTC dates, and decimal limits, but recorded hidden failure and the untouched refund ownership bug materially limit reliability. |

## N/A availability failures

These candidates produced no patch, so all quality scores are N/A. They are availability outcomes, not quality judgments.

| Candidate | Model | Time (s) | Public | Hidden | Forbidden | Diff lines | Status | Price |
|---|---|---:|---|---|---:|---:|---|---|
| 08-qwen3-7-max | opencode-go/qwen3.7-max | 600.007 | N/A | N/A | N/A | 0 | timeout | TBD |
| 12-qwen3-6-plus | opencode-go/qwen3.6-plus | 600.008 | N/A | N/A | N/A | 0 | timeout | TBD |
| 21-grok-code | opencode/grok-code | 2.567 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 23-qwen3-6-plus-free | opencode/qwen3.6-plus-free | 2.523 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 24-kimi-k2-5-free | opencode/kimi-k2.5-free | 2.524 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 25-glm-5-free | opencode/glm-5-free | 2.498 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 26-hy3-preview-free | opencode/hy3-preview-free | 2.549 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 29-mimo-v2-pro-free | opencode/mimo-v2-pro-free | 2.523 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 30-minimax-m3-free | opencode/minimax-m3-free | 2.540 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 31-north-mini-code-free | opencode/north-mini-code-free | 2.545 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 32-longcat-2-0-free | opencode/longcat-2.0-free | 2.505 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 34-nemotron-3-super-free | opencode/nemotron-3-super-free | 2.602 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 36-trinity-large-preview-free | opencode/trinity-large-preview-free | 2.562 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 37-ring-2-6-1t-free | opencode/ring-2.6-1t-free | 2.563 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 38-ling-3-0-flash-free | opencode/ling-3.0-flash-free | 2.554 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 39-ling-3-0-tiny-free | opencode/ling-3.0-tiny-free | 2.588 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 40-ling-2-6-flash-free | opencode/ling-2.6-flash-free | 2.586 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 41-mimo-v2-flash-free | opencode/mimo-v2-flash-free | 2.566 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 42-mimo-v2-omni-free | opencode/mimo-v2-omni-free | 2.536 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 43-minimax-m2-5-free | opencode/minimax-m2.5-free | 2.555 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 44-minimax-m2-1-free | opencode/minimax-m2.1-free | 2.699 | N/A | N/A | 0 | 0 | provider_error | TBD |
| 45-glm-4-7-free | opencode/glm-4.7-free | 2.732 | N/A | N/A | 0 | 0 | provider_error | TBD |
