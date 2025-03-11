import { useQuery } from "@tanstack/react-query";
import { getTokenBalances, TokenAmount } from "@lifi/sdk";
import { useTokens } from "./useTokens";
import { formatUnits } from "viem";
import { useChains } from "./useChains";
import { useAccount } from "./useAccount";

export const useTokenBalances = (chainId: number) => {
  const { tokens: chainTokens, isLoading } = useTokens(chainId);
  const { chains } = useChains();

  const chain = chains?.find((chain) => chain.id === chainId);

  const { isConnected, accountAddress } = useAccount(chain?.chainType);

  const isBalanceFetchingEnabled =
    isConnected && Boolean(chainTokens?.length) && Boolean(chainId);

  const { data: balanceTokens, isLoading: isBalanceLoading } = useQuery({
    queryKey: ["token-balances", accountAddress, chainId, chainTokens?.length],
    queryFn: async () => {

      const tokensWithBalance: TokenAmount[] = await getTokenBalances(
        accountAddress as string,
        chainTokens!
      );

      if (!tokensWithBalance?.length) {
        return chainTokens as TokenAmount[];
      }

      const sortFn = (a: TokenAmount, b: TokenAmount) =>
        Number.parseFloat(formatUnits(b.amount ?? 0n, b.decimals)) *
          Number.parseFloat(b.priceUSD ?? "0") -
        Number.parseFloat(formatUnits(a.amount ?? 0n, a.decimals)) *
          Number.parseFloat(a.priceUSD ?? "0");

      const tokensWithAmount: TokenAmount[] = [];
      const allTokens: TokenAmount[] = [];

      tokensWithBalance.forEach((token) => {
        if (token.amount) {
          tokensWithAmount.push(token);
        } else {
          allTokens.push(token);
        }
      });

      tokensWithAmount.sort(sortFn);

      const result = [...tokensWithAmount, ...allTokens];
      return result;
    },
    enabled: isBalanceFetchingEnabled,
  });

  return {
    chainTokens,
    balanceTokens,
    isLoading,
    isBalanceLoading: isBalanceLoading && isBalanceFetchingEnabled,
  };
};
