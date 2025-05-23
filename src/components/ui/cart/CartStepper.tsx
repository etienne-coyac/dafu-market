import { CheckRounded, ShoppingBasket, Storefront } from "@mui/icons-material";
import {
  Step,
  StepButton,
  stepClasses,
  StepIndicator,
  stepIndicatorClasses,
  Stepper,
  Typography,
  typographyClasses,
} from "@mui/joy";
import useMediaQuery from "../../../hooks/useMediaQuery";
export type CartStepperSteps = 0 | 1 | 2;

type CartStepperProps = {
  activeStep: CartStepperSteps;
  setActiveStep: (step: CartStepperSteps) => void;
};

const CartStepper = (props: CartStepperProps) => {
  const { activeStep, setActiveStep } = props;
  const mobile = useMediaQuery("down", "sm");
  return (
    <Stepper
      sx={(theme) => ({
        "--Stepper-verticalGap": "2.5rem",
        "--StepIndicator-size": "2.5rem",
        "--Step-gap": "1rem",
        "--Step-connectorInset": "0.5rem",
        "--Step-connectorRadius": "1rem",
        "--Step-connectorThickness": "4px",
        "--joy-palette-success-solidBg": "var(--joy-palette-success-400)",
        [`& .${stepClasses.root} > :not(.${stepClasses.indicator})`]: {
          display: mobile ? "none" : "block",
        },
        [`& .${stepClasses.completed}`]: {
          "&::after": { bgcolor: "success.solidBg" },
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            border: "4px solid",
            borderColor: "#fff",
            boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          color: "neutral.softDisabledColor",
        },
        [`& .${typographyClasses["title-sm"]}`]: {
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontSize: "10px",
        },
      })}
    >
      <Step
        completed={activeStep > 0}
        active={activeStep === 0}
        orientation={mobile ? "vertical" : "horizontal"}
        indicator={
          <StepButton onClick={() => activeStep > 0 && setActiveStep(0)}>
            <StepIndicator
              variant={activeStep > 0 ? "solid" : "soft"}
              color={
                activeStep > 0
                  ? "success"
                  : activeStep === 0
                  ? "primary"
                  : "neutral"
              }
            >
              <ShoppingBasket
                sx={activeStep > 0 ? { color: "white" } : undefined}
              />
            </StepIndicator>
          </StepButton>
        }
      >
        <div>
          <Typography level="title-sm">Étape 1</Typography>
          Panier
        </div>
      </Step>
      <Step
        active={activeStep === 1}
        completed={activeStep > 1}
        orientation={mobile ? "vertical" : "horizontal"}
        indicator={
          <StepButton onClick={() => activeStep > 1 && setActiveStep(1)}>
            <StepIndicator
              variant={activeStep > 1 ? "solid" : "soft"}
              color={
                activeStep > 1
                  ? "success"
                  : activeStep === 1
                  ? "primary"
                  : "neutral"
              }
            >
              <Storefront
                sx={activeStep > 1 ? { color: "white" } : undefined}
              />
            </StepIndicator>
          </StepButton>
        }
      >
        <div>
          <Typography level="title-sm">Étape 2</Typography>
          Confirmation du magasin
        </div>
      </Step>
      <Step
        active={activeStep === 2}
        completed={activeStep > 2}
        orientation={mobile ? "vertical" : "horizontal"}
        indicator={
          <StepIndicator
            variant={activeStep > 2 ? "solid" : "soft"}
            color={
              activeStep > 2
                ? "success"
                : activeStep === 2
                ? "primary"
                : "neutral"
            }
          >
            <CheckRounded />
          </StepIndicator>
        }
      >
        <div>
          <Typography level="title-sm">Étape 3</Typography>
          Confirmation
        </div>
      </Step>
    </Stepper>
  );
};

export default CartStepper;
