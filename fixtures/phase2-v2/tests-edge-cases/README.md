# Integer ranges

`parseRange(value)` accepts a string containing exactly `start..end`, with surrounding whitespace allowed. Each side must use signed base-10 integer syntax: optional `+` or `-` followed by one or more digits. Decimals, exponents, hexadecimal syntax, extra separators, and non-strings are invalid. Both values must be between `-100000` and `100000`, inclusive, and `start` must not exceed `end`. Return `{ start, end }` for valid input; otherwise return `null`.
