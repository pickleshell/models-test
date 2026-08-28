import { accountName } from '../formatters/accountName.js';
import { formatBalance } from '../formatters/formatBalance.js';
import { statusLabel } from '../labels/statusLabel.js';
import { separator } from '../config/display.js';
export function buildAccountSummary(account) {
  const safe = account && typeof account === 'object' ? account : {};
  return `Account: ${accountName(safe.name)}${separator}Status: ${statusLabel(safe.status)}${separator}Balance: ${formatBalance(safe.balance)}`;
}
