import { ChainId } from "@lifi/sdk";
import { type FC, type PropsWithChildren } from "react";
import { Chain, createClient, http } from "viem";
import type { Config, CreateConnectorFn } from "wagmi";
import { createConfig } from "wagmi";
import { BigmiProvider } from "@bigmi/react";
import { phantom, unisat, xverse } from "@bigmi/client";
import { bitcoin } from "@bigmi/core";

const connectorConfig = { chainId: ChainId.BTC };

const connectors: CreateConnectorFn[] = [
  xverse(connectorConfig),
  phantom(connectorConfig),
  unisat(connectorConfig)
];

const bigmiConfig: Config = createConfig({
  chains: [bitcoin as Chain],
  connectors,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

const BitcoinProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BigmiProvider config={bigmiConfig} reconnectOnMount={false}>
      {children}
    </BigmiProvider>
  );
};

export default BitcoinProvider;
