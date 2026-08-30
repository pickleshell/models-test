# bug-fix-zen-non-gpt-completion-r1

Ranking policy is decided separately; objective evaluator results are reported independently and are not blended into judge scores.

| Candidate | Agent | Model | Tasks | Outcome | Test time | Test price (USD) | Objective | Combined average | Judges |
|---|---|---|---:|---|---:|---:|---:|---:|---:|
| 206-claude-sonnet-5 | opencode | opencode/claude-sonnet-5 | 1 | completed | 176.632 s | 0.277261 | 1/1 (100%) | N/A | 0 |
| 207-claude-opus-5 | opencode | opencode/claude-opus-5 | 1 | completed | 161.137 s | 0.525949 | 1/1 (100%) | N/A | 0 |
| 208-kimi-k3 | opencode | opencode/kimi-k3 | 1 | completed | 270.254 s | 0.313447 | 1/1 (100%) | N/A | 0 |
| 205-claude-haiku-4-5 | opencode | opencode/claude-haiku-4-5 | 1 | completed | 31.977 s | 0.027522 | 0/1 (0%) | N/A | 0 |
