import { config } from "@lifi/sdk";
import { useSyncWagmiConfig } from "@lifi/wallet-management";
import { type FC, type PropsWithChildren } from "react";
import { createClient, http } from "viem";
import { mainnet } from "viem/chains";
import type { Config, CreateConnectorFn } from "wagmi";
import { WagmiProvider, createConfig } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import { useChains } from "../../hooks/useChains";

const connectors: CreateConnectorFn[] = [injected(), metaMask()];

const wagmiConfig: Config = createConfig({
  chains: [mainnet],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

const EthereumProvider: FC<PropsWithChildren> = ({ children }) => {
  const { chains } = useChains();

  if (chains) {
    config.setChains(chains);
  }

  useSyncWagmiConfig(wagmiConfig, connectors, chains);

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      {children}
    </WagmiProvider>
  );
};

export default EthereumProvider;
