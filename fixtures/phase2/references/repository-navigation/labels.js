export function formatLabel(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
