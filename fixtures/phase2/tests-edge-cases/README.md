# Integer ranges

`parseRange(value)` parses exactly `start..end`, allowing surrounding whitespace. Both values are base-10 integers between -100000 and 100000 inclusive, and start must not exceed end. It returns `{ start, end }`; malformed, non-string, reversed, decimal, or out-of-bound input returns `null`.
