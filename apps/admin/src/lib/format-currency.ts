/**
 * Format currency to compact notation
 * @param amount - Amount in VND
 * @returns Formatted string with compact notation
 */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000000) {
    // Tỷ (B)
    const billions = amount / 1000000000;
    return `₫${billions.toFixed(1)}B`;
  } else if (amount >= 1000000) {
    // Triệu (M)
    const millions = amount / 1000000;
    return `₫${millions.toFixed(1)}M`;
  } else if (amount >= 1000) {
    // Nghìn (K)
    const thousands = amount / 1000;
    return `₫${thousands.toFixed(1)}K`;
  } else {
    return `₫${amount.toLocaleString("vi-VN")}`;
  }
}

/**
 * Format currency to full notation
 * @param amount - Amount in VND
 * @returns Formatted string with full notation
 */
export function formatFullCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
