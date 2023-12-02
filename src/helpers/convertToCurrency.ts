export function convertToCurrency(amount: number) {
  const fullGrn = Math.floor(amount);
  const kopecks = Math.round((amount - fullGrn) * 100);

  if (!kopecks) {
    return `${fullGrn} грн`;
  }

  return `${fullGrn} грн ${kopecks} коп`;
}
