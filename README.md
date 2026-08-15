# models-test

Standalone local repository for reproducible OpenCode Go model benchmark runs.

The repository intentionally stays small: model selection lives in `benchmarks/opencode-go-model-manifest.json`, task inputs live in `fixtures/`, scoring guidance lives in `rubrics/`, and run artifacts should be written under `results/`.

## Layout

- `benchmarks/` - benchmark manifests and run definitions.
- `fixtures/` - small prompt/task fixtures used as benchmark inputs.
- `results/` - generated benchmark outputs; only `.gitkeep` is tracked.
- `rubrics/` - scoring criteria for manual or scripted review.
- `scripts/` - lightweight helper scripts.

## Reproducibility Notes

Record the manifest version, model ID, fixture ID, command, runtime, and timestamp for each run. Do not commit generated result payloads unless they are intentionally curated examples.
