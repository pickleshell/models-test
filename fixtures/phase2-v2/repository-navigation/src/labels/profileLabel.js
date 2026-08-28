export function profileLabel(value) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}
