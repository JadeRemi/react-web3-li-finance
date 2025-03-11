import { EVM, Solana, UTXO, config, createConfig } from "@lifi/sdk";
import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { getWalletClient, switchChain } from "@wagmi/core";
import { useConfig as useWagmiConfig } from "wagmi";
import { getConnectorClient } from "@bigmi/client";
import { useConfig as useBigmiConfig } from "@bigmi/react";

createConfig({
  integrator: "Li Finance Application",
});

export const Providers = () => {
  const wagmiConfig = useWagmiConfig();
  const { wallet } = useWallet();
  const bigmiConfig = useBigmiConfig();

  useEffect(() => {

    config.setProviders([
      EVM({
        getWalletClient: () => getWalletClient(wagmiConfig),
        switchChain: async (chainId) => {
          const chain = await switchChain(wagmiConfig, { chainId });
          return getWalletClient(wagmiConfig, { chainId: chain.id });
        },
      }),
      Solana({
        async getWalletAdapter() {
          return wallet?.adapter as SignerWalletAdapter;
        },
      }),
      UTXO({
        getWalletClient: () => getConnectorClient(bigmiConfig)

      }),
    ]);
  }, [wagmiConfig, bigmiConfig, wallet?.adapter]);

  return null;
};
