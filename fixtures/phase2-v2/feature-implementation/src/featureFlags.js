export function resolveFeature(config, context) {
  if (!config || !context || typeof context !== 'object') return false;
  const flag = config[context.feature];
  return typeof flag === 'boolean' ? flag : Boolean(flag && flag.enabled);
}
