function matching(events, type) {
  return events.filter((event) => event && event.type === type);
}

export function countByType(events, type) {
  return matching(events, type).length;
}

export function latestByType(events, type) {
  return matching(events, type).reduce((latest, event) => !latest || event.timestamp > latest.timestamp ? event : latest, null);
}
