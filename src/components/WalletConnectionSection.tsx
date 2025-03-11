import React from "react";
import { formatAddress } from "../utils";

interface WalletConnectionSectionProps {
  isConnected: boolean;
  address: string | undefined;
  onConnect: () => void;
  onDisconnect: () => void;
  connectButtonText: string;
  connectedText: string;
  WalletMultiButton?: React.ReactNode;
}

const WalletConnectionSection: React.FC<WalletConnectionSectionProps> = ({
  isConnected,
  address,
  onConnect,
  onDisconnect,
  connectButtonText,
  connectedText,
  WalletMultiButton,
}) => {
  return (
    <div className="mt-2 w-full">
      {isConnected ? (
        <div className="flex gap-x-4 items-center justify-between">
          <button onClick={onDisconnect} className="bg-[var(--interactive-color)] rounded-lg w-80 h-10 p-0 reusable-button cursor-pointer text-white">
            {connectedText}: {formatAddress(address)}
          </button>
        </div>
      ) : (
        WalletMultiButton || (
          <button onClick={onConnect} className="bg-[var(--interactive-color)] rounded-lg w-80 h-10 p-0 reusable-button cursor-pointer text-white">
            {connectButtonText}
          </button>
        )
      )}
    </div>
  );
};

export default WalletConnectionSection;
