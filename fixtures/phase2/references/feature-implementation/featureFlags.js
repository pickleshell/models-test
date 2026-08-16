export function resolveFeature(config, context) {
  if (!config || !context || typeof context !== 'object') return false;
  const name = context.feature;
  const flag = config[name];
  if (context.overrides && typeof context.overrides[name] === 'boolean') return context.overrides[name];
  if (typeof flag === 'boolean') return flag;
  if (!flag || typeof flag !== 'object' || flag.enabled !== true) return false;
  if (flag.rollout === undefined) return true;
  if (!Number.isInteger(flag.rollout) || flag.rollout < 0 || flag.rollout > 100 || typeof context.userId !== 'string') return false;
  let hash = 0;
  for (const char of context.userId) hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  return hash % 100 < flag.rollout;
}
