import { Add, Remove } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

type QuantityProps = {
  value: number;
  onChange: (value: number) => void;
  delay?: number;
};
const Quantity = (props: QuantityProps) => {
  const { value, onChange, delay = 700 } = props;
  const [displayValue, setDisplayValue] = useState<number>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(displayValue);
    }, delay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayValue, delay]);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={1}
      borderRadius={"var(--IconButton-radius, var(--joy-radius-sm))"}
      flexGrow={0}
      border={"1px solid var(--joy-palette-neutral-100)"}
    >
      <IconButton size="sm" onClick={() => setDisplayValue((prev) => prev - 1)}>
        <Remove />
      </IconButton>
      <Typography sx={{ width: "1.2rem", textAlign: "center" }}>
        {displayValue}
      </Typography>
      <IconButton size="sm" onClick={() => setDisplayValue((prev) => prev + 1)}>
        <Add />
      </IconButton>
    </Stack>
  );
};

export default Quantity;
