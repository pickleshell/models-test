# bug-fix-new-api-available-r1

Ranking policy is decided separately; objective evaluator results are reported independently and are not blended into judge scores.

| Candidate | Agent | Model | Tasks | Outcome | Test time | Test price (USD) | Objective | Combined average | Judges |
|---|---|---|---:|---|---:|---:|---:|---:|---:|
| 152-claude-opus-4-7-zen | opencode | opencode/claude-opus-4-7 | 1 | completed | 62.302 s | 0.238527 | 1/1 (100%) | N/A | 0 |
| 153-claude-opus-4-8-zen | opencode | opencode/claude-opus-4-8 | 1 | completed | 89.776 s | 0.365843 | 1/1 (100%) | N/A | 0 |
| 155-claude-sonnet-4-6-zen | opencode | opencode/claude-sonnet-4-6 | 1 | completed | 69.096 s | 0.116286 | 1/1 (100%) | N/A | 0 |
| 157-gemini-3-7-flash-zen | opencode | opencode/gemini-3.7-flash | 1 | completed | 209.917 s | 0.446894 | 1/1 (100%) | N/A | 0 |
| 158-glm-5-zen | opencode | opencode/glm-5 | 1 | completed | 336.117 s | 0.176435 | 1/1 (100%) | N/A | 0 |
| 159-glm-5-1-zen | opencode | opencode/glm-5.1 | 1 | completed | 297.863 s | 0.220124 | 1/1 (100%) | N/A | 0 |
| 160-glm-5-2-zen | opencode | opencode/glm-5.2 | 1 | completed | 253.512 s | 0.168969 | 1/1 (100%) | N/A | 0 |
| 161-gpt-5-1-codex-zen | opencode | opencode/gpt-5.1-codex | 1 | completed | 212.620 s | 0.184884 | 1/1 (100%) | N/A | 0 |
| 162-gpt-5-1-codex-mini-zen | opencode | opencode/gpt-5.1-codex-mini | 1 | completed | 136.640 s | 0.043008 | 1/1 (100%) | N/A | 0 |
| 163-gpt-5-2-codex-zen | opencode | opencode/gpt-5.2-codex | 1 | completed | 67.791 s | 0.075034 | 1/1 (100%) | N/A | 0 |
| 164-gpt-5-4-zen | opencode | opencode/gpt-5.4 | 1 | completed | 45.150 s | 0.120839 | 1/1 (100%) | N/A | 0 |
| 165-gpt-5-4-mini-zen | opencode | opencode/gpt-5.4-mini | 1 | completed | 50.997 s | 0.042184 | 1/1 (100%) | N/A | 0 |
| 166-gpt-5-6-luna-zen | opencode | opencode/gpt-5.6-luna | 1 | completed | 56.507 s | 0.010351 | 1/1 (100%) | N/A | 0 |
| 167-grok-4-6-zen | opencode | opencode/grok-4.6 | 1 | completed | 183.161 s | 0.138644 | 1/1 (100%) | N/A | 0 |
| 177-deepseek-v4-flash-vision-exp-go | opencode | opencode-go/deepseek-v4-flash-vision-exp | 1 | completed | 105.323 s | 0.009719 | 1/1 (100%) | N/A | 0 |
| 178-glm-5-3-flash-go | opencode | opencode-go/glm-5.3-flash | 1 | completed | 376.907 s | 0.008131 | 1/1 (100%) | N/A | 0 |
| 179-hy4-preview-go | opencode | opencode-go/hy4-preview | 1 | completed | 194.194 s | 0.051317 | 1/1 (100%) | N/A | 0 |
| 183-qwen3-7-max-go | opencode | opencode-go/qwen3.7-max | 1 | completed | 191.307 s | 0.314018 | 1/1 (100%) | N/A | 0 |
| 184-qwen3-8-flash-go | opencode | opencode-go/qwen3.8-flash | 1 | completed | 94.251 s | 0.007536 | 1/1 (100%) | N/A | 0 |
| 185-gpt-5-4-openai | opencode | openai/gpt-5.4 | 1 | completed | 64.231 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 186-gpt-5-4-fast-openai | opencode | openai/gpt-5.4-fast | 1 | completed | 56.460 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 189-gpt-5-6-luna-openai | opencode | openai/gpt-5.6-luna | 1 | completed | 95.676 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 190-gpt-5-6-luna-fast-openai | opencode | openai/gpt-5.6-luna-fast | 1 | completed | 141.661 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 191-gpt-5-6-sol-openai | opencode | openai/gpt-5.6-sol | 1 | completed | 107.743 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 192-gpt-5-6-sol-fast-openai | opencode | openai/gpt-5.6-sol-fast | 1 | completed | 130.250 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 193-gpt-5-6-terra-openai | opencode | openai/gpt-5.6-terra | 1 | completed | 81.494 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 194-gpt-5-6-terra-fast-openai | opencode | openai/gpt-5.6-terra-fast | 1 | completed | 79.895 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 150-claude-fable-5-zen | opencode | opencode/claude-fable-5 | 1 | completed | 65.150 s | 0.412830 | 0/1 (0%) | N/A | 0 |
| 151-claude-opus-4-5-zen | opencode | opencode/claude-opus-4-5 | 1 | completed | 75.653 s | 0.177978 | 0/1 (0%) | N/A | 0 |
| 154-claude-sonnet-4-5-zen | opencode | opencode/claude-sonnet-4-5 | 1 | completed | 77.032 s | 0.122873 | 0/1 (0%) | N/A | 0 |
| 156-gemini-3-5-flash-lite-zen | opencode | opencode/gemini-3.5-flash-lite | 1 | completed | 69.047 s | 0.065226 | 0/1 (0%) | N/A | 0 |
| 168-grok-build-0-1-zen | opencode | opencode/grok-build-0.1 | 1 | agent_failure | 160.145 s | 0.148706 | 0/1 (0%) | N/A | 0 |
| 169-mimo-v2-5-free-zen | opencode | opencode/mimo-v2.5-free | 1 | completed | 103.868 s | 0.000000 | 0/1 (0%) | N/A | 0 |
| 180-mimo-v2-5-go | opencode | opencode-go/mimo-v2.5 | 1 | completed | 63.763 s | 0.001936 | 0/1 (0%) | N/A | 0 |
| 181-minimax-m2-7-go | opencode | opencode-go/minimax-m2.7 | 1 | completed | 54.375 s | 0.010717 | 0/1 (0%) | N/A | 0 |
| 182-qwen3-6-plus-go | opencode | opencode-go/qwen3.6-plus | 1 | completed | 66.358 s | 0.062808 | 0/1 (0%) | N/A | 0 |
| 187-gpt-5-5-openai | opencode | openai/gpt-5.5 | 1 | completed | 86.000 s | 0.000000 | 0/1 (0%) | N/A | 0 |
| 188-gpt-5-5-fast-openai | opencode | openai/gpt-5.5-fast | 1 | completed | 86.699 s | 0.000000 | 0/1 (0%) | N/A | 0 |
| 170-minimax-m2-5-zen | opencode | opencode/minimax-m2.5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 171-minimax-m2-7-zen | opencode | opencode/minimax-m2.7 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 172-minimax-m3-zen | opencode | opencode/minimax-m3 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 173-muse-spark-1-2-zen | opencode | opencode/muse-spark-1.2 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 174-nemotron-3-ultra-free-zen | opencode | opencode/nemotron-3-ultra-free | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 175-qwen3-5-plus-zen | opencode | opencode/qwen3.5-plus | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 176-qwen3-6-plus-zen | opencode | opencode/qwen3.6-plus | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
