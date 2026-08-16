# Event summaries

`countByType(events, type)` counts valid events with the requested type. `latestByType(events, type)` returns the valid event with the greatest numeric `timestamp`, or `null`. An event is valid only when it is an object with a non-empty string `type` and a finite numeric `timestamp`; input must not be mutated.
