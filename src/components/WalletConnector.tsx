import {
  useAccount as useWagmiAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConfig as useBigmiConfig } from "@bigmi/react";
import { disconnect } from "wagmi/actions";
import WalletConnectionSection from "./WalletConnectionSection";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '../index.css';

const WalletConnector = () => {
  // NOTE: connection for Ethereum
  const { connect: ethConnect, connectors: ethConnectors } = useConnect();
  const { isConnected: isEthConnected, address: ethAddress } =
    useWagmiAccount();
  const { disconnect: ethDisconnect } = useDisconnect();

  // NOTE: connection for Solana
  const {
    publicKey,
    connected: isSolConnected,
    disconnect: solDisconnect,
  } = useWallet();

  // NOTE: connection for BTC
  const bigmiConfig = useBigmiConfig();
  const { isConnected: utxoConnected, address: utxoAddress } = useWagmiAccount({
    config: bigmiConfig,
  });
  const { connect: bigmiConnect, connectors: bigmiConnectors } = useConnect({
    config: bigmiConfig,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-[ethnocentric,sans-serif] mt-2 mb-2 text-[var(--highlight-color-dark)]">LI FINANCE WEB3</h1>
      <hr className="border-t border-[var(--highlight-color)] mt-4 mb-2 w-full" />

      <h2 className="text-2xl font-[Kanit] text-[var(--highlight-color-dark)] text-center w-full">Connect your wallet below:</h2>
      <WalletConnectionSection
        isConnected={isEthConnected}
        address={ethAddress}
        onConnect={() => ethConnect({ connector: ethConnectors[0] })}
        onDisconnect={ethDisconnect}
        connectButtonText="Connect Ethereum Wallet"
        connectedText="Ethereum Connected"
      />

      <WalletConnectionSection
        isConnected={isSolConnected}
        address={publicKey?.toString()}
        onConnect={() => { }}
        onDisconnect={solDisconnect}
        connectButtonText="Connect Solana Wallet"
        connectedText="Solana Connected"
        WalletMultiButton={
          <div className="bg-[var(--interactive-color)] rounded-lg w-80 h-10 p-0 reusable-button cursor-pointer">
            <div className="flex items-center justify-center align-center bg-transparent font-[Kanit] text-[16px] leading-[24px] h-[38px] text-white absolute whitespace-nowrap w-full">
              Connect Solana Wallet
            </div>
            <WalletMultiButton />
          </div>
        }
      />

      <WalletConnectionSection
        isConnected={utxoConnected}
        address={utxoAddress}
        onConnect={() => bigmiConnect({ connector: bigmiConnectors[0] })}
        onDisconnect={() => disconnect(bigmiConfig)}
        connectButtonText="Connect Bitcoin Wallet"
        connectedText="Bitcoin Connected"
      />
    </div>
  );
};

export default WalletConnector;
