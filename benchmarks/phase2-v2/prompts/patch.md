# Nomination: Patch

You are working on the retry-policy fixture in this repository.

Make the smallest clear patch that satisfies the contract below. Modify only:

`fixtures/phase2-v2/patch-retry-policy/src/retryPolicy.js`

Do not change tests, package metadata, benchmark files, or other fixtures. Use Node.js built-ins only and keep the public API unchanged:

- `parseRetryAfter(value, nowMs)`
- `computeRetryDelay({ attempt, retryAfter, nowMs })`

## Required behavior

### `parseRetryAfter(value, nowMs)`

- `value` must be a string. Ignore optional surrounding whitespace.
- If the trimmed value contains only ASCII decimal digits (`0`-`9`), interpret it as whole delta-seconds and return milliseconds.
- Signed numbers, fractional numbers, exponent notation, hexadecimal notation, empty values, and non-string values are invalid and return `null`.
- Otherwise, accept a valid HTTP-date that JavaScript `Date` can parse.
- For an HTTP-date, `nowMs` must be finite. Return `max(0, dateMs - nowMs)`.
- Invalid dates return `null`.

### `computeRetryDelay({ attempt, retryAfter, nowMs })`

- `attempt` must be a positive integer; otherwise throw.
- `nowMs` must be finite; otherwise throw.
- A valid `Retry-After` value overrides exponential backoff.
- Cap every returned delay at `300000` ms.
- Without a valid `Retry-After`, use `1000 * 2^(attempt - 1)`, capped at `300000` ms.
- Very large valid attempt values must still return a finite capped delay.

Before finishing, run:

```sh
npm test --prefix fixtures/phase2-v2/patch-retry-policy
```

Report the changed file, test result, and `git diff`.
