import { formatUnits } from "viem";

export const formatTokenBalance = (
  balance: bigint | undefined,
  decimals: number
): number => {
  return balance ? Number(formatUnits(balance, decimals)) : 0;
};

export const formatTokenPrice = (
  amount: bigint | undefined,
  price: string,
  decimals: number
) => {
  if (!amount || !price) return 0;


  const formattedAmount = formatUnits(amount, decimals);

  return Number.parseFloat(formattedAmount) * Number.parseFloat(price);
};

export const formatAddress = (address: string | undefined): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatNumber = (
  num: number,
  decimals: number,
  locale: string = "en-US"
) => {
  const fixedNum = parseFloat(num.toFixed(6));
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimals,
  }).format(fixedNum);
};
