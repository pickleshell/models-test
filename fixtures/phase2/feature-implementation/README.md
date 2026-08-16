# Feature flags

`resolveFeature(config, context)` returns whether a named feature is enabled. An exact boolean in `context.overrides` wins, then a boolean flag value is used. A flag object may contain `enabled` and `rollout` (an integer percentage from 0 through 100); rollout uses a stable hash of `context.userId`, and missing or invalid input is disabled. The function must not mutate either argument.
