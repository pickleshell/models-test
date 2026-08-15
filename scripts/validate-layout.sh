#!/usr/bin/env sh
set -eu

for path in README.md .gitignore benchmarks fixtures results rubrics scripts; do
  test -e "$path" || { echo "missing: $path" >&2; exit 1; }
done

node -e '
const fs = require("fs");
const manifest = JSON.parse(fs.readFileSync("benchmarks/opencode-go-model-manifest.json", "utf8"));
if (manifest.runtime !== "opencode-go") throw new Error("unexpected runtime");
if (!Array.isArray(manifest.models)) throw new Error("models must be an array");
if (manifest.models.length !== manifest.model_count) throw new Error("model_count mismatch");
if (manifest.models.length !== 17) throw new Error("expected 17 models");
for (const model of manifest.models) {
  if (!model.startsWith("opencode-go/")) throw new Error(`unexpected model: ${model}`);
}
console.log(`validated ${manifest.models.length} models`);
'
