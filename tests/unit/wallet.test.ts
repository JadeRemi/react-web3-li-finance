import { test, expect } from "@playwright/test";
import { formatAddress, formatNumber, formatTokenBalance, formatTokenPrice } from "../../src/utils";


test("Should format wallet address to add an ellipsis", async () => {
  const address = "0x1234567890abcdef1234567890abcdef12345678";
  const formattedAddress = formatAddress(address);
  expect(formattedAddress).toBe("0x1234...5678");
});

test("Should return an empty string for an unknown wallet address", async () => {
  const formattedAddress = formatAddress(undefined);
  expect(formattedAddress).toBe("");
});

test('Should use formatNumber to format number with specified decimals and locale', () => {
  expect(formatNumber(12345.6789, 2)).toBe('12,345.68');
  expect(formatNumber(12345.6789, 4)).toBe('12,345.6789');
  expect(formatNumber(12345.6789, 2, 'de-DE')).toBe('12.345,68');
});

test('Should use formatTokenBalance to format balance correctly', () => {
  const balance = BigInt(1000000000000000000);
  expect(formatTokenBalance(balance, 18)).toBe(1);
  expect(formatTokenBalance(BigInt(5000000000000000000), 18)).toBe(5);
  expect(formatTokenBalance(BigInt(0), 18)).toBe(0);
  expect(formatTokenBalance(undefined, 18)).toBe(0);
});

test('Should use formatTokenPrice to calculate token price correctly', () => {
  const amount = BigInt(1000000000000000000);
  const price = '2.5';
  expect(formatTokenPrice(amount, price, 18)).toBe(2.5);
  expect(formatTokenPrice(BigInt(2000000000000000000), price, 18)).toBe(5);
  expect(formatTokenPrice(undefined, price, 18)).toBe(0);
  expect(formatTokenPrice(amount, '', 18)).toBe(0);
});

