# Phase 2 provisional aggregate ranking

Historical/provisional aggregate over all five harnesses. `Harnesses passed` requires both public and hidden evaluators to pass. Score is the arithmetic mean of the ten binary public/hidden indicators across five records.

Audit limitation: reference path matches 55/155 and hidden path matches 25/155. The hidden/reference paths were available in shared Git history, so this result is not blind.

Arithmetic check: 31 candidates x 5 harnesses = 155 task records.

| Rank | Candidate | Model | Harnesses passed | Public | Hidden | Forbidden | Score | Avg time (s) |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | 47-gpt-5-6-sol | gpt-5.6-sol | 5/5 | 5 | 5 | 0 | 1.00 | 0.177 |
| 2 | 48-gpt-5-6-terra | gpt-5.6-terra | 5/5 | 5 | 5 | 0 | 1.00 | 0.179 |
| 3 | 46-gpt-5-6-luna | gpt-5.6-luna | 5/5 | 5 | 5 | 0 | 1.00 | 0.179 |
| 4 | 01-gpt-5-6-luna | opencode-go/gpt-5.6-luna | 5/5 | 5 | 5 | 0 | 1.00 | 0.179 |
| 5 | 53-claude-opus-5 | opencode/claude-opus-5 | 5/5 | 5 | 5 | 0 | 1.00 | 0.180 |
| 6 | 10-kimi-k3 | opencode-go/kimi-k3 | 5/5 | 5 | 5 | 0 | 1.00 | 0.180 |
| 7 | 52-claude-sonnet-5 | opencode/claude-sonnet-5 | 5/5 | 5 | 5 | 0 | 1.00 | 0.180 |
| 8 | 06-minimax-m3 | opencode-go/minimax-m3 | 5/5 | 5 | 5 | 0 | 1.00 | 0.180 |
| 9 | 18-gpt-5-3-codex-spark | gpt-5.3-codex-spark | 5/5 | 5 | 5 | 0 | 1.00 | 0.181 |
| 10 | 05-glm-5-2 | opencode-go/glm-5.2 | 5/5 | 5 | 5 | 0 | 1.00 | 0.181 |
| 11 | 04-deepseek-v4-pro | opencode-go/deepseek-v4-pro | 5/5 | 5 | 5 | 0 | 1.00 | 0.181 |
| 12 | 07-mimo-v2-5-pro | opencode-go/mimo-v2.5-pro | 5/5 | 5 | 5 | 0 | 1.00 | 0.181 |
| 13 | 49-gpt-5-4 | gpt-5.4 | 5/5 | 5 | 5 | 0 | 1.00 | 0.182 |
| 14 | 15-glm-5-1 | opencode-go/glm-5.1 | 5/5 | 5 | 5 | 0 | 1.00 | 0.182 |
| 15 | 09-grok-4-5 | opencode-go/grok-4.5 | 5/5 | 5 | 5 | 0 | 1.00 | 0.182 |
| 16 | 03-kimi-k2-7-code | opencode-go/kimi-k2.7-code | 5/5 | 5 | 5 | 0 | 1.00 | 0.182 |
| 17 | 11-deepseek-v4-flash | opencode-go/deepseek-v4-flash | 5/5 | 5 | 5 | 0 | 1.00 | 0.182 |
| 18 | 50-gpt-5-4-mini | gpt-5.4-mini | 5/5 | 5 | 5 | 0 | 1.00 | 0.182 |
| 19 | 22-deepseek-v4-flash-free | opencode/deepseek-v4-flash-free | 5/5 | 5 | 5 | 0 | 1.00 | 0.183 |
| 20 | 16-kimi-k2-6 | opencode-go/kimi-k2.6 | 5/5 | 5 | 5 | 0 | 1.00 | 0.184 |
| 21 | 27-hy3-free | opencode/hy3-free | 4/5 | 5 | 4 | 0 | 0.90 | 0.181 |
| 22 | 51-claude-haiku-4-5 | opencode/claude-haiku-4-5 | 4/5 | 5 | 4 | 0 | 0.90 | 0.181 |
| 23 | 14-hy3 | opencode-go/hy3 | 4/5 | 5 | 4 | 0 | 0.90 | 0.183 |
| 24 | 19-big-pickle | opencode/big-pickle | 4/5 | 5 | 4 | 0 | 0.90 | 0.184 |
| 25 | 13-mimo-v2-5 | opencode-go/mimo-v2.5 | 4/5 | 5 | 4 | 0 | 0.90 | 0.185 |
| 26 | 33-nemotron-3-5-lightning-free | opencode/nemotron-3.5-lightning-free | 3/5 | 5 | 3 | 0 | 0.80 | 0.184 |
| 27 | 17-minimax-m2-7 | opencode-go/minimax-m2.7 | 3/5 | 5 | 3 | 0 | 0.80 | 0.186 |
| 28 | 35-nemotron-3-ultra-free | opencode/nemotron-3-ultra-free | 3/5 | 4 | 3 | 0 | 0.70 | 0.185 |
| 29 | 20-laguna-s-2-1-free | opencode/laguna-s-2.1-free | 3/5 | 3 | 3 | 0 | 0.60 | 0.183 |
| 30 | 28-mimo-v2-5-free | opencode/mimo-v2.5-free | 2/5 | 4 | 2 | 0 | 0.60 | 0.184 |
| 31 | 02-qwen3-7-plus | opencode-go/qwen3.7-plus | 0/5 | 0 | 0 | 0 | 0.00 | 0.185 |
