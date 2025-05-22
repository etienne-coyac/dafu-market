import { Box, Stack } from "@mui/joy";

import CartStepper, {
  type CartStepperSteps,
} from "../../../components/ui/cart/CartStepper";
import { useState } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import CartContent from "../../../components/ui/cart/CartContent";

const CartPage = () => {
  const [activeStep, setActiveStep] = useState<CartStepperSteps>(0);
  useMediaQuery("down", "sm");
  console.log(document.querySelector("header")?.offsetHeight);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        width: "100%",
      }}
    >
      <Stack
        gap={2}
        sx={{ width: { xs: "100%", md: "70%" }, maxWidth: "1000px" }}
      >
        <CartStepper activeStep={activeStep} setActiveStep={setActiveStep} />
        {activeStep === 0 && (
          <CartContent onNextStep={() => setActiveStep(1)} />
        )}
      </Stack>
    </Box>
  );
};

export default CartPage;
