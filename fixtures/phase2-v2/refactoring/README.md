# Event summaries

`countByType(events, type)` counts matching valid events. `latestByType(events, type)` returns the matching valid event with the greatest timestamp, or `null`; on an equal timestamp it chooses the first matching event. A valid request has an array of events and a non-empty string `type`. A valid event is a non-null object with a non-empty string `type` and a finite numeric `timestamp`. Invalid top-level input returns `0` from `countByType` and `null` from `latestByType`. Neither function mutates input.

The public module must export only `countByType` and `latestByType`. Both functions must use one shared, non-exported helper named `matchingValidEvents(events, type)` for event selection and validation.
