export const formatPrice = (price, currency = 'VND') => {
  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  });
  return formatter.format(price);
};
export const getPercent = (price, salePrice) => {
  const percent = Math.round(100 - (salePrice / price) * 100);

  return `${percent}%`;
};
