export const priceFormatter = Intl.NumberFormat("en", { notation: "compact" });

export const formatTwoDigitsAfterDecimal = (num: string) => {
  return parseFloat(num).toFixed(2);
};

export function numberFormatter(n: string, digit: number) {
  const number = parseInt(n);

  if (number < 1e3) return number;
  if (number >= 1e3 && number < 1e6)
    return +(number / 1e3).toFixed(digit) + "K";
  if (number >= 1e6 && number < 1e9)
    return +(number / 1e6).toFixed(digit) + "M";
  if (number >= 1e9 && number < 1e12)
    return +(number / 1e9).toFixed(digit) + "B";
  if (number >= 1e12) return +(number / 1e12).toFixed(digit) + "T";
}
