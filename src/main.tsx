import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@solana/wallet-adapter-react-ui/styles.css";
import EthereumProvider from "./utils/providers/Ethereum.tsx";
import SolanaProvider from "./utils/providers/SolanaProvider.tsx";
import { Providers } from "./utils/providers/Providers.tsx";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import BitcoinProvider from "./utils/providers/Bitcoin.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <EthereumProvider>
        <SolanaProvider>
          <BitcoinProvider>
            <Providers />
            <WalletModalProvider>
              <App />
            </WalletModalProvider>
          </BitcoinProvider>
        </SolanaProvider>
      </EthereumProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
