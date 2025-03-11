import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar, Box } from "@mui/material";
import { useChains } from "../hooks/useChains";

interface SelectChainProps {
  selectedChainId?: number;
  onChange: (chainId: number) => void;
}

const SelectChain = ({ selectedChainId = -1, onChange }: SelectChainProps) => {
  const { chains } = useChains();

  return (
    <FormControl fullWidth>
      <Select
        sx={{
          borderRadius: 2,
          "&:hover": {
            borderColor: "var(--highlight-color-dark) !important",
          },
          '& > fieldset': {
            borderColor: "var(--highlight-color)",
            borderRadius: 2,
          }
        }}
        value={selectedChainId}
        onChange={(event) => onChange(event.target.value as number)}
        displayEmpty
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              overflowY: "auto",
            },
          },
        }}
      >
        <MenuItem disabled value={-1}>
          <span className="block text-[var(--highlight-color-dark)] font-[Kanit] text-[16px] leading-[24px] text-center whitespace-nowrap w-full">Select chain</span>
        </MenuItem>
        {chains?.map((chain) => (
          <MenuItem key={chain.id} value={chain.id}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                src={chain.logoURI}
                alt={chain.name}
                sx={{ width: 24, height: 24 }}
              />
              <span>{chain.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectChain;
