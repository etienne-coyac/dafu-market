import { Add, Remove } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";
import { useEffect, useRef, useState } from "react";

type QuantityProps = {
  value: number;
  onChange: (value: number) => void;
  delay?: number;
  shouldUpdateOnFirstRender?: boolean;
};
const Quantity = (props: QuantityProps) => {
  const { value, onChange, delay = 700, shouldUpdateOnFirstRender } = props;
  const [displayValue, setDisplayValue] = useState<number>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (displayValue === value) return;
      onChange(displayValue);
    }, delay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayValue, delay]);
  const firstRender = useRef(true);
  useEffect(() => {
    // on display add 1
    console.log("render", shouldUpdateOnFirstRender);
    if (firstRender.current) {
      firstRender.current = false;
      console.log("render quantity");
      if (shouldUpdateOnFirstRender) onChange(value);
    }
  }, []);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={1}
      borderRadius={"var(--IconButton-radius, var(--joy-radius-sm))"}
      flexGrow={0}
      border={"1px solid var(--joy-palette-neutral-200)"}
    >
      <IconButton
        size="sm"
        onClick={() => {
          if (displayValue - 1 === 0) {
            onChange(0);
          }
          if (displayValue === 1) return;
          setDisplayValue((prev) => prev - 1);
        }}
      >
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
