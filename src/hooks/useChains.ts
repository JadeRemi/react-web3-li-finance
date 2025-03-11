import { ChainType, getChains } from "@lifi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useChains = (type?: ChainType) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      const chains = await getChains({
        chainTypes: [ChainType.EVM, ChainType.SVM, ChainType.UTXO],
      });
      return chains;
    },
  });

  const filteredData = useMemo(() => {
    if (!data) {
      return;
    }
    if (!type) {
      return data;
    }
    const filteredChains = data?.filter((chain) => chain.chainType === type);

    return filteredChains;
  }, [data, type]);

  return {
    chains: filteredData,
    isLoading,
  };
};
