export function parseRange(value) {
  if (typeof value !== 'string') return null;
  const match = /^\s*(-?\d+)\.\.(-?\d+)\s*$/.exec(value);
  if (!match) return null;
  const start = Number(match[1]);
  const end = Number(match[2]);
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < -100000 || end > 100000 || start > end) return null;
  return { start, end };
}
