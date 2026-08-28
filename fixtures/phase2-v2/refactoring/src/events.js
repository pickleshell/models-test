export function countByType(events, type) {
  if (!Array.isArray(events) || typeof type !== 'string' || type.length === 0) return 0;
  let count = 0;
  for (const event of events) {
    if (event && typeof event === 'object' && typeof event.type === 'string' && event.type.length > 0 && Number.isFinite(event.timestamp) && event.type === type) count += 1;
  }
  return count;
}

export function latestByType(events, type) {
  if (!Array.isArray(events) || typeof type !== 'string' || type.length === 0) return null;
  let latest = null;
  for (const event of events) {
    if (event && typeof event === 'object' && typeof event.type === 'string' && event.type.length > 0 && Number.isFinite(event.timestamp) && event.type === type && (!latest || event.timestamp > latest.timestamp)) latest = event;
  }
  return latest;
}
