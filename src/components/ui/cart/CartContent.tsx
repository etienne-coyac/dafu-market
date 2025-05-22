import { KeyboardArrowRight } from "@mui/icons-material";
import { Typography, Stack, Button } from "@mui/joy";
import { Fragment } from "react/jsx-runtime";
import ProductCard from "../ProductCard";

type CartContentProps = {
  onNextStep: () => void;
};
const CartContent = (props: CartContentProps) => {
  const { onNextStep } = props;
  return (
    <Fragment>
      <Typography level="h1">Mon panier</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} width={"100%"} gap={2}>
        <Stack flexGrow={1} gap={1}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCard
              key={index}
              product={undefined}
              orientation="horizontal"
              quantityInCart
            />
          ))}
        </Stack>
        <div>
          <Stack
            spacing={1}
            sx={{
              position: "sticky",
              top: `calc(${
                document.querySelector("header")?.offsetHeight
              }px + 1rem)`,
            }}
          >
            <Typography level="h3">Résumé</Typography>
            <Typography level="body-lg">
              Total hors promotions: 45.38€
            </Typography>
            <Typography level="body-lg">
              Total des promotions: -13.11€
            </Typography>
            <Typography level="body-lg">Total: 32.27€</Typography>
            <Button endDecorator={<KeyboardArrowRight />} onClick={onNextStep}>
              Commander
            </Button>
          </Stack>
        </div>
      </Stack>
    </Fragment>
  );
};
export default CartContent;
