import { TokenAmount } from "@lifi/sdk";
import { useTokenBalances } from "../hooks/useTokenBalances";
import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import TokenRow from "./TokenRow";
import { Box, Skeleton } from "@mui/material";
import { styledScrollbar } from "../utils/styles";

interface TokenListProps {
  chainId: number;
}

const TokenList = ({ chainId }: TokenListProps) => {
  const { chainTokens, balanceTokens, isBalanceLoading, isLoading } =
    useTokenBalances(chainId);
  const parentRef = useRef<HTMLDivElement>(null);

  const tokens = (balanceTokens ?? chainTokens ?? []) as TokenAmount[];

  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  useEffect(() => {
    rowVirtualizer.scrollToOffset(0);
  }, [chainId, rowVirtualizer]);

  return (
    <div>
      {isLoading ? (
        <Box>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
              padding="10px"
              borderBottom="1px solid #ddd"
            >
              <Skeleton
                variant="circular"
                width={30}
                height={30}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="150px"
                height="20px"
                animation="wave"
              />
            </Box>
          ))}
        </Box>
      ) : (
        <div
          ref={parentRef}
          style={{
            marginTop: "8px",
            maxHeight: "300px",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "var(--highlight-color)",


            ...styledScrollbar
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const token = tokens[virtualRow.index];
              return (
                <TokenRow
                  key={token.address}
                  token={token}
                  startPosition={virtualRow.start}
                  isBalanceLoading={isBalanceLoading}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenList;
