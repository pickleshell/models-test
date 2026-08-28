# Account summary renderer

The public API is `renderAccountSummary(account)` from `src/index.js`. It returns a deterministic summary string in the form `Account: <name> | Status: <status> | Balance: <balance>`. A missing or non-string name renders as an empty name; balances render as `0.00` unless they are finite numbers, in which case they render with two decimal places.

Status is user-visible. A string status is trimmed, internal whitespace is collapsed, and `_`, `-`, and whitespace are separators. Each resulting word is title-cased; numeric tokens are preserved. The output words join with one space. Empty and non-string status values render as an empty string. The public API must not throw for arbitrary account input.
