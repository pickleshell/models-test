const MAX_DELAY_MS = 300_000;

export function parseRetryAfter(value, nowMs) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const seconds = Number(trimmed);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
  const dateMs = Date.parse(trimmed);
  if (!Number.isFinite(dateMs) || !Number.isFinite(nowMs)) return null;
  return dateMs - nowMs;
}

export function computeRetryDelay({ attempt, retryAfter, nowMs }) {
  if (!Number.isFinite(attempt) || attempt < 1) throw new Error('attempt must be positive');
  if (!Number.isFinite(nowMs)) throw new Error('nowMs must be finite');
  const retryAfterMs = parseRetryAfter(retryAfter, nowMs);
  if (retryAfterMs !== null) return Math.min(MAX_DELAY_MS, retryAfterMs);
  return Math.min(MAX_DELAY_MS, 1000 * (2 ** attempt));
}
