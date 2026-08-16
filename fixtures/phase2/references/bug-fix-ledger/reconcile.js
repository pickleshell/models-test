export function parseAmountToCents(amount) {
  if (typeof amount !== 'string' && typeof amount !== 'number') throw new Error('amount must be a decimal string or number');
  const text = String(amount).trim().replace(/[$,]/g, '');
  if (!/^\d+(?:\.\d{1,2})?$/.test(text)) throw new Error(`invalid amount: ${amount}`);
  const [whole, fraction = ''] = text.split('.');
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}
function dayKey(value) { const date = new Date(value); if (Number.isNaN(date.getTime())) throw new Error(`invalid createdAt: ${value}`); return date.toISOString().slice(0, 10); }
function addTotal(totals, accountId, currency, day, cents) { const key = `${accountId}|${currency}|${day}`; const current = totals.get(key) || { accountId, currency, day, netCents: 0, count: 0 }; current.netCents += cents; current.count += 1; totals.set(key, current); }
export function reconcileLedger(entries) {
  if (!Array.isArray(entries)) throw new Error('entries must be an array');
  const totals = new Map(), seen = new Set(), originals = new Map(), metrics = { processed: 0, duplicateCount: 0, invalidCount: 0, orphanRefundCount: 0 };
  for (const entry of entries) { try { if (!entry || typeof entry !== 'object' || !entry.id || !entry.accountId || !entry.currency) throw new Error('invalid entry'); if (seen.has(entry.id)) { metrics.duplicateCount += 1; continue; } seen.add(entry.id); const cents = parseAmountToCents(entry.amount), day = dayKey(entry.createdAt); if (entry.type === 'sale') { originals.set(entry.id, entry); addTotal(totals, entry.accountId, entry.currency, day, cents); metrics.processed += 1; } else if (entry.type === 'refund') { const original = originals.get(entry.originalId); if (!original) { metrics.orphanRefundCount += 1; continue; } addTotal(totals, original.accountId, original.currency, day, -cents); metrics.processed += 1; } else throw new Error('unsupported type'); } catch (_) { metrics.invalidCount += 1; } }
  return { totals: [...totals.values()].sort((a, b) => a.accountId.localeCompare(b.accountId) || a.currency.localeCompare(b.currency) || a.day.localeCompare(b.day)), metrics };
}
