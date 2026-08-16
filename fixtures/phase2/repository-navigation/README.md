# Label formatting

`formatLabel(value)` accepts a string, trims it, collapses internal whitespace, and title-cases each word. It joins words with a single space. Empty or non-string input returns an empty string. Existing punctuation is preserved and the function must not throw for arbitrary input.
