function matching(events, type) {
  if (!Array.isArray(events) || typeof type !== 'string') return [];
  return events.filter((event) => event && typeof event.type === 'string' && event.type === type && typeof event.timestamp === 'number' && Number.isFinite(event.timestamp));
}

export function countByType(events, type) { return matching(events, type).length; }
export function latestByType(events, type) { return matching(events, type).reduce((latest, event) => !latest || event.timestamp > latest.timestamp ? event : latest, null); }
