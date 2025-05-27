import { Typography } from "@mui/joy";

import CartStepper, {
  type CartStepperSteps,
} from "../../../components/ui/cart/CartStepper";
import { useState } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import CartContent from "../../../components/ui/cart/CartContent";
import CartChooseMagasin from "../../../components/ui/cart/CartChooseMagasin";
import CenterContent from "../../../components/layout/CenterContent";
import { snackbar } from "../../../providers/snackbar/snackbar";

const CartPage = () => {
  const [activeStep, setActiveStep] = useState<CartStepperSteps>(0);
  useMediaQuery("down", "sm");

  return (
    <CenterContent>
      <CartStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      {activeStep === 0 && <CartContent onNextStep={() => setActiveStep(1)} />}
      {activeStep === 1 && (
        <CartChooseMagasin
          onNextStep={() => setActiveStep(2)}
          onError={() => {
            setActiveStep(0);
            snackbar.error({
              text: "Les produits de votre panier ne sont pas proposés par ce magasin.",
            });
          }}
        />
      )}
      {activeStep === 2 && <Typography>Confirmation</Typography>}
    </CenterContent>
  );
};

export default CartPage;
