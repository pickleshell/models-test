# Historical Phase 2 expert-review methodology

The 155 historical task records are reviewed on the same four 0–10 dimensions used by the current clean-room benchmarks:

- **Functional correctness** — how fully the submitted patch implements the task contract.
- **Reliability / edge cases** — how safely it handles invalid, boundary, and unusual inputs.
- **Maintainability / clarity** — how focused, readable, and proportionate the implementation is.
- **Scope discipline** — whether the patch stays within the allowed files and avoids unrelated work.

Public and hidden evaluator outcomes are retained as separate objective evidence and constrain correctness and reliability. A patch that fails the hidden evaluator cannot receive full correctness or reliability credit. Maintainability is assessed from the submitted diff relative to the size of the task; materially verbose solutions score below focused solutions with the same objective result. Scope is constrained by the recorded forbidden-change count.

No-patch runtime/provider outcomes are reported as N/A rather than code-quality failures. Overall is the arithmetic mean of the four review scores. In the aggregate ranking, criterion scores are averaged across the five reviewed patches; a candidate without all five patches receives no aggregate quality rank.

These reviews remain **Historical / Provisional**. The earlier Phase 2 run was not blind because reference and hidden paths were available in shared Git history. The review adds useful differentiation to the preserved evidence but does not remove that limitation.
