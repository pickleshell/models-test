# bug-fix-openrouter-fallback-r1

Ranking policy is decided separately; objective evaluator results are reported independently and are not blended into judge scores.

| Candidate | Agent | Model | Tasks | Outcome | Test time | Test price (USD) | Objective | Combined average | Judges |
|---|---|---|---:|---|---:|---:|---:|---:|---:|
| 195-meta-muse-spark-1-2 | opencode | openrouter/meta/muse-spark-1.2 | 1 | completed | 252.961 s | 0.199863 | 1/1 (100%) | N/A | 0 |
| 199-minimax-minimax-m3-free | opencode | openrouter/minimax/minimax-m3:free | 1 | completed | 72.860 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 200-nvidia-nemotron-3-ultra-550b-a55b | opencode | openrouter/nvidia/nemotron-3-ultra-550b-a55b | 1 | completed | 31.754 s | 0.037719 | 1/1 (100%) | N/A | 0 |
| 201-nvidia-nemotron-3-ultra-550b-a55b-free | opencode | openrouter/nvidia/nemotron-3-ultra-550b-a55b:free | 1 | completed | 70.846 s | 0.000000 | 1/1 (100%) | N/A | 0 |
| 203-qwen-qwen3-5-plus-20260420 | opencode | openrouter/qwen/qwen3.5-plus-20260420 | 1 | completed | 107.228 s | 0.028199 | 1/1 (100%) | N/A | 0 |
| 196-minimax-minimax-m2-5 | opencode | openrouter/minimax/minimax-m2.5 | 1 | completed | 20.806 s | 0.004093 | 0/1 (0%) | N/A | 0 |
| 197-minimax-minimax-m2-7 | opencode | openrouter/minimax/minimax-m2.7 | 1 | completed | 55.937 s | 0.009105 | 0/1 (0%) | N/A | 0 |
| 198-minimax-minimax-m2-7-free | opencode | openrouter/minimax/minimax-m2.7:free | 1 | completed | 53.538 s | 0.000000 | 0/1 (0%) | N/A | 0 |
| 202-qwen-qwen3-5-plus-02-15 | opencode | openrouter/qwen/qwen3.5-plus-02-15 | 1 | completed | 42.427 s | 0.017934 | 0/1 (0%) | N/A | 0 |
| 204-qwen-qwen3-6-plus | opencode | openrouter/qwen/qwen3.6-plus | 1 | completed | 82.933 s | 0.024495 | 0/1 (0%) | N/A | 0 |
