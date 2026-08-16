export function formatLabel(value) {
  if (typeof value !== 'string') return '';
  return typeof value === 'string' ? value.trim() : '';
}
