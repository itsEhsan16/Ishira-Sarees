const aed = new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 });

/** "AED 4,850" — matches the Figma price style. */
export function formatAED(amount: number) {
  return `AED ${aed.format(amount)}`;
}
