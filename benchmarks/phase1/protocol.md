# Phase 1 Screening Protocol

Baseline: use the committed repository state containing the seeded fixture. Do not run candidate models from a dirty tree.

Prepare identical isolated workspaces:

```sh
node scripts/phase1-prepare-worktrees.mjs --baseline HEAD
```

Each model gets a detached git worktree at `.worktrees/phase1/<ordinal>-<model-slug>`. Generated results go under `results/phase1/<ordinal>-<model-slug>/` and are ignored by git.

For each model, send the exact prompt from:

```sh
node scripts/phase1-print-prompt.mjs
```

Run models in this order:

1. `opencode-go/gpt-5.6-luna`
2. `opencode-go/qwen3.7-plus`
3. `opencode-go/kimi-k2.7-code`
4. `opencode-go/deepseek-v4-pro`
5. `opencode-go/glm-5.2`
6. `opencode-go/minimax-m3`
7. `opencode-go/mimo-v2.5-pro`
8. `opencode-go/qwen3.7-max`
9. `opencode-go/kimi-k3`
10. `opencode-go/grok-4.5`
11. `opencode-go/deepseek-v4-flash`
12. `opencode-go/mimo-v2.5`
13. `opencode-go/minimax-m2.7`
14. `opencode-go/kimi-k2.6`
15. `opencode-go/qwen3.6-plus`
16. `opencode-go/glm-5.1`
17. `opencode-go/hy3`

After each model run, evaluate that model's worktree:

```sh
node scripts/evaluate-phase1.mjs \
  --workspace .worktrees/phase1/01-gpt-5-6-luna \
  --model opencode-go/gpt-5.6-luna \
  --json-out results/phase1/01-gpt-5-6-luna/evaluation.json
```

Use the corresponding ordinal and slug for each model. Preserve the full model transcript and final `git diff` in the same result directory when running the full screen.
