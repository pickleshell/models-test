# Phase 2 provisional aggregate ranking

Historical/provisional aggregate over all five harnesses. `Harnesses passed` requires both public and hidden evaluators to pass. Expert-review criteria are averaged across reviewed patches; candidates without all five patches receive no aggregate rank.

Audit limitation: reference path matches 55/155 and hidden path matches 25/155. The hidden/reference paths were available in shared Git history, so this result is not blind.

Arithmetic check: 31 candidates x 5 harnesses = 155 task records.

| Rank | Candidate | Model | Reviewed | Harnesses passed | Public | Hidden | Functional | Reliability | Maintainability | Scope | Review overall | Avg time (s) |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 04-deepseek-v4-pro | opencode-go/deepseek-v4-pro | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 9.00 | 10.00 | 9.75 | 65.574 |
| 2 | 05-glm-5-2 | opencode-go/glm-5.2 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 9.00 | 10.00 | 9.75 | 119.742 |
| 3 | 01-gpt-5-6-luna | opencode-go/gpt-5.6-luna | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 38.673 |
| 4 | 22-deepseek-v4-flash-free | opencode/deepseek-v4-flash-free | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 51.981 |
| 5 | 52-claude-sonnet-5 | opencode/claude-sonnet-5 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 68.213 |
| 6 | 11-deepseek-v4-flash | opencode-go/deepseek-v4-flash | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 74.143 |
| 7 | 48-gpt-5-6-terra | gpt-5.6-terra | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 87.055 |
| 8 | 16-kimi-k2-6 | opencode-go/kimi-k2.6 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 91.592 |
| 9 | 03-kimi-k2-7-code | opencode-go/kimi-k2.7-code | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 99.379 |
| 10 | 06-minimax-m3 | opencode-go/minimax-m3 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 101.459 |
| 11 | 49-gpt-5-4 | gpt-5.4 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 119.703 |
| 12 | 15-glm-5-1 | opencode-go/glm-5.1 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.80 | 10.00 | 9.70 | 135.099 |
| 13 | 09-grok-4-5 | opencode-go/grok-4.5 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.60 | 10.00 | 9.65 | 29.899 |
| 14 | 07-mimo-v2-5-pro | opencode-go/mimo-v2.5-pro | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.60 | 10.00 | 9.65 | 105.134 |
| 15 | 47-gpt-5-6-sol | gpt-5.6-sol | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.60 | 10.00 | 9.65 | 121.107 |
| 16 | 50-gpt-5-4-mini | gpt-5.4-mini | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.60 | 10.00 | 9.65 | 124.081 |
| 17 | 46-gpt-5-6-luna | gpt-5.6-luna | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.60 | 10.00 | 9.65 | 195.330 |
| 18 | 10-kimi-k3 | opencode-go/kimi-k3 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.40 | 10.00 | 9.60 | 189.396 |
| 19 | 18-gpt-5-3-codex-spark | gpt-5.3-codex-spark | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.20 | 10.00 | 9.55 | 60.725 |
| 20 | 53-claude-opus-5 | opencode/claude-opus-5 | 5/5 | 5/5 | 5 | 5 | 10.00 | 10.00 | 8.20 | 10.00 | 9.55 | 143.420 |
| 21 | 13-mimo-v2-5 | opencode-go/mimo-v2.5 | 5/5 | 4/5 | 5 | 4 | 9.40 | 9.00 | 8.80 | 10.00 | 9.30 | 72.584 |
| 22 | 27-hy3-free | opencode/hy3-free | 5/5 | 4/5 | 5 | 4 | 9.40 | 9.00 | 8.60 | 10.00 | 9.25 | 59.818 |
| 23 | 19-big-pickle | opencode/big-pickle | 5/5 | 4/5 | 5 | 4 | 9.00 | 8.60 | 9.00 | 10.00 | 9.15 | 68.279 |
| 24 | 14-hy3 | opencode-go/hy3 | 5/5 | 4/5 | 5 | 4 | 9.00 | 8.60 | 8.80 | 10.00 | 9.10 | 42.575 |
| 25 | 51-claude-haiku-4-5 | opencode/claude-haiku-4-5 | 5/5 | 4/5 | 5 | 4 | 9.00 | 8.60 | 8.20 | 10.00 | 8.95 | 55.642 |
| 26 | 17-minimax-m2-7 | opencode-go/minimax-m2.7 | 5/5 | 3/5 | 5 | 3 | 8.60 | 7.80 | 8.80 | 10.00 | 8.80 | 88.774 |
| 27 | 33-nemotron-3-5-lightning-free | opencode/nemotron-3.5-lightning-free | 5/5 | 3/5 | 5 | 3 | 8.40 | 7.60 | 9.00 | 10.00 | 8.75 | 55.641 |
| N/A | 35-nemotron-3-ultra-free | opencode/nemotron-3-ultra-free | 4/5 | 3/5 | 4 | 3 | 8.75 | 8.25 | 9.00 | 10.00 | 9.00 | 81.606 |
| N/A | 28-mimo-v2-5-free | opencode/mimo-v2.5-free | 4/5 | 2/5 | 4 | 2 | 8.00 | 7.00 | 8.75 | 10.00 | 8.44 | 168.850 |
| N/A | 20-laguna-s-2-1-free | opencode/laguna-s-2.1-free | 3/5 | 3/5 | 3 | 3 | 10.00 | 10.00 | 8.67 | 10.00 | 9.67 | 499.955 |
| N/A | 02-qwen3-7-plus | opencode-go/qwen3.7-plus | 0/5 | 0/5 | 0 | 0 | N/A | N/A | N/A | N/A | N/A | 900.024 |
