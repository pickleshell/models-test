# Feature resolution

`resolveFeature(config, context)` returns whether `context.feature` is enabled. Invalid input returns `false`, and neither argument may be mutated. `config` and `context` must be non-null objects and `context.feature` must be a non-empty string.

An exact boolean value at `context.overrides[context.feature]` wins. Otherwise a boolean flag at `config[context.feature]` wins. Otherwise the flag must be an object whose `enabled` is exactly `true`; any other flag value is disabled. For an enabled object, omitted `rollout` means enabled. A present rollout must be an integer from 0 through 100. `0` disables and `100` enables. For any other rollout, `context.userId` must be a non-empty string.

For percentage rollout, initialize an unsigned 32-bit hash to zero. For each Unicode code point in `userId`, compute `hash = (hash * 31 + codePoint) >>> 0`; the bucket is `hash % 100`. Enable exactly when the bucket is less than `rollout`. Invalid rollout or user input is disabled.
