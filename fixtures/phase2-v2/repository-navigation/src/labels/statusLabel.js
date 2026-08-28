export function statusLabel(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}
