# phase2-refactoring-working-r1

Ranking policy is decided separately; objective evaluator results are reported independently and are not blended into judge scores.

| Candidate | Agent | Model | Tasks | Outcome | Test time | Test price (USD) | Objective | Combined average | Judges |
|---|---|---|---:|---|---:|---:|---:|---:|---:|
| 54-inkling-openrouter | opencode | openrouter/thinkingmachines/inkling | 1 | completed | 12.720 s | 0.025345 | 1/1 (100%) | N/A | 0 |
| 18-gpt-5-3-codex-spark | codex | gpt-5.3-codex-spark | 1 | completed | 11.990 s | N/A | 1/1 (100%) | N/A | 0 |
| 49-gpt-5-4 | codex | gpt-5.4 | 1 | completed | 31.593 s | N/A | 1/1 (100%) | N/A | 0 |
| 50-gpt-5-4-mini | codex | gpt-5.4-mini | 1 | completed | 28.882 s | N/A | 1/1 (100%) | N/A | 0 |
| 46-gpt-5-6-luna | codex | gpt-5.6-luna | 1 | completed | 34.764 s | N/A | 1/1 (100%) | N/A | 0 |
| 47-gpt-5-6-sol | codex | gpt-5.6-sol | 1 | completed | 42.514 s | N/A | 1/1 (100%) | N/A | 0 |
| 48-gpt-5-6-terra | codex | gpt-5.6-terra | 1 | completed | 33.648 s | N/A | 1/1 (100%) | N/A | 0 |
| 185-gpt-5-4 | opencode | openai/gpt-5.4 | 1 | completed | 31.979 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 186-gpt-5-4-fast | opencode | openai/gpt-5.4-fast | 1 | completed | 32.874 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 187-gpt-5-5 | opencode | openai/gpt-5.5 | 1 | completed | 31.492 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 188-gpt-5-5-fast | opencode | openai/gpt-5.5-fast | 1 | completed | 31.225 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 189-gpt-5-6-luna | opencode | openai/gpt-5.6-luna | 1 | completed | 46.199 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 190-gpt-5-6-luna-fast | opencode | openai/gpt-5.6-luna-fast | 1 | completed | 44.604 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 191-gpt-5-6-sol | opencode | openai/gpt-5.6-sol | 1 | completed | 36.939 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 192-gpt-5-6-sol-fast | opencode | openai/gpt-5.6-sol-fast | 1 | completed | 42.307 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 193-gpt-5-6-terra | opencode | openai/gpt-5.6-terra | 1 | completed | 33.516 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 194-gpt-5-6-terra-fast | opencode | openai/gpt-5.6-terra-fast | 1 | completed | 29.551 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 195-meta-muse-spark-1-2 | opencode | openrouter/meta/muse-spark-1.2 | 1 | completed | 29.074 s | 0.048291 | 1/1 (100%) | N/A | 0 |
| 196-minimax-minimax-m2-5 | opencode | openrouter/minimax/minimax-m2.5 | 1 | completed | 13.841 s | 0.002621 | 1/1 (100%) | N/A | 0 |
| 197-minimax-minimax-m2-7 | opencode | openrouter/minimax/minimax-m2.7 | 1 | completed | 36.866 s | 0.008073 | 1/1 (100%) | N/A | 0 |
| 200-nvidia-nemotron-3-ultra-550b-a55b | opencode | openrouter/nvidia/nemotron-3-ultra-550b-a55b | 1 | completed | 55.365 s | 0.020138 | 1/1 (100%) | N/A | 0 |
| 202-qwen-qwen3-5-plus-02-15 | opencode | openrouter/qwen/qwen3.5-plus-02-15 | 1 | completed | 23.138 s | 0.009758 | 1/1 (100%) | N/A | 0 |
| 203-qwen-qwen3-5-plus-20260420 | opencode | openrouter/qwen/qwen3.5-plus-20260420 | 1 | completed | 26.146 s | 0.016887 | 1/1 (100%) | N/A | 0 |
| 204-qwen-qwen3-6-plus | opencode | openrouter/qwen/qwen3.6-plus | 1 | completed | 25.904 s | 0.015305 | 1/1 (100%) | N/A | 0 |
| 58-grok-4-5-openrouter | opencode | openrouter/x-ai/grok-4.5 | 1 | completed | 19.837 s | 0.059411 | 1/1 (100%) | N/A | 0 |
| 57-qwen3-8-27b-openrouter | opencode | openrouter/qwen/qwen3.8-27b | 1 | completed | 59.961 s | 0.025752 | 1/1 (100%) | N/A | 0 |
| 27-hy3-free | opencode | opencode/hy3-free | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 55-glm-5-3-go | opencode | opencode-go/glm-5.3 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 150-claude-fable-5 | opencode | opencode/claude-fable-5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 151-claude-opus-4-5 | opencode | opencode/claude-opus-4-5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 152-claude-opus-4-7 | opencode | opencode/claude-opus-4-7 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 153-claude-opus-4-8 | opencode | opencode/claude-opus-4-8 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 154-claude-sonnet-4-5 | opencode | opencode/claude-sonnet-4-5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 155-claude-sonnet-4-6 | opencode | opencode/claude-sonnet-4-6 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 156-gemini-3-5-flash-lite | opencode | opencode/gemini-3.5-flash-lite | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 157-gemini-3-7-flash | opencode | opencode/gemini-3.7-flash | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 158-glm-5 | opencode | opencode/glm-5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 159-glm-5-1 | opencode | opencode/glm-5.1 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 160-glm-5-2 | opencode | opencode/glm-5.2 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 167-grok-4-6 | opencode | opencode/grok-4.6 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 169-mimo-v2-5-free | opencode | opencode/mimo-v2.5-free | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 177-deepseek-v4-flash-vision-exp | opencode | opencode-go/deepseek-v4-flash-vision-exp | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 178-glm-5-3-flash | opencode | opencode-go/glm-5.3-flash | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 179-hy4-preview | opencode | opencode-go/hy4-preview | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 180-mimo-v2-5 | opencode | opencode-go/mimo-v2.5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 181-minimax-m2-7 | opencode | opencode-go/minimax-m2.7 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 182-qwen3-6-plus | opencode | opencode-go/qwen3.6-plus | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 183-qwen3-7-max | opencode | opencode-go/qwen3.7-max | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 184-qwen3-8-flash | opencode | opencode-go/qwen3.8-flash | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 205-claude-haiku-4-5 | opencode | opencode/claude-haiku-4-5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 206-claude-sonnet-5 | opencode | opencode/claude-sonnet-5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 207-claude-opus-5 | opencode | opencode/claude-opus-5 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 208-kimi-k3 | opencode | opencode/kimi-k3 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 03-kimi-k2-7-code | opencode | opencode-go/kimi-k2.7-code | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 06-minimax-m3 | opencode | opencode-go/minimax-m3 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 07-mimo-v2-5-pro | opencode | opencode-go/mimo-v2.5-pro | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 11-deepseek-v4-flash | opencode | opencode-go/deepseek-v4-flash | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 14-hy3 | opencode | opencode-go/hy3 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 15-glm-5-1 | opencode | opencode-go/glm-5.1 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 19-big-pickle | opencode | opencode/big-pickle | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 16-kimi-k2-6 | opencode | opencode-go/kimi-k2.6 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 01-gpt-5-6-luna | opencode | opencode-go/gpt-5.6-luna | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 05-glm-5-2 | opencode | opencode-go/glm-5.2 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 65-grok-4-6-go | opencode | opencode-go/grok-4.6 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 67-qwen3-8-max-go | opencode | opencode-go/qwen3.8-max | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 68-kimi-k3-go | opencode | opencode-go/kimi-k3 | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 02-qwen3-7-plus | opencode | opencode-go/qwen3.7-plus | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
| 04-deepseek-v4-pro | opencode | opencode-go/deepseek-v4-pro | 1 | unavailable | 0.000 s | N/A | N/A | N/A | 0 |
