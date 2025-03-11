import { getTokens, ChainType } from "@lifi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useTokens = (chainId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["tokens"],
    queryFn: () =>
      getTokens({ chainTypes: [ChainType.EVM, ChainType.SVM, ChainType.UTXO] }),
  });

  const filteredData = useMemo(() => {
    if (!data) {
      return;
    }
    const filteredTokens = data.tokens?.[chainId] || [];

    return {
      tokens: filteredTokens,
    };
  }, [data, chainId]);

  return {
    tokens: filteredData?.tokens,
    isLoading,
  };
};
