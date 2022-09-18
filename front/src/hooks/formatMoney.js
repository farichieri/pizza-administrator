export const formatMoney = (money) => {
  const newMoney = Number(money);
  return newMoney.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    useGrouping: true,
    maximumSignificantDigits: 9,
  });
};
