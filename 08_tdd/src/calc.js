export function calculateTotalWithTax(amount, taxRate) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new TypeError('amount must be a valid number');
  }
  if (typeof taxRate !== 'number' || Number.isNaN(taxRate)) {
    throw new TypeError('taxRate must be a valid number');
  }
  if (amount < 0) {
    throw new RangeError('amount must be positive');
  }
  if (taxRate < 0) {
    throw new RangeError('taxRate must be positive');
  }

  const total = amount * (1 + taxRate);
  return Math.round((total + Number.EPSILON) * 100) / 100;
}
