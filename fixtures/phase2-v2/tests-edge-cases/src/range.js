export function parseRange(value) {
  if (typeof value !== 'string') return null;
  const [left, right] = value.split('..');
  const start = Number(left);
  const end = Number(right);
  if (!Number.isInteger(start) || !Number.isInteger(end)) return null;
  return { start, end };
}
