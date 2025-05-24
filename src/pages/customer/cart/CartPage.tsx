import { Box, Stack, Typography } from "@mui/joy";

import CartStepper, {
  type CartStepperSteps,
} from "../../../components/ui/cart/CartStepper";
import { useState } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import CartContent from "../../../components/ui/cart/CartContent";

const CartPage = () => {
  const [activeStep, setActiveStep] = useState<CartStepperSteps>(0);
  useMediaQuery("down", "sm");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        p: 2,
        boxSizing: "border-box",
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
        {activeStep === 1 && <Typography>Choix du magasin</Typography>}
        {activeStep === 2 && <Typography>Confirmation</Typography>}
      </Stack>
    </Box>
  );
};

export default CartPage;
