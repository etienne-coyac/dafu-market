import { KeyboardArrowRight } from "@mui/icons-material";
import { Typography, Stack, Button } from "@mui/joy";
import { Fragment } from "react/jsx-runtime";
import ProductCard from "../ProductCard";
import useCart from "../../../hooks/data/useCart";

type CartContentProps = {
  onNextStep: () => void;
};
const CartContent = (props: CartContentProps) => {
  const { onNextStep } = props;
  const { data: cart } = useCart();
  return (
    <Fragment>
      <Typography level="h1">Mon panier</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} width={"100%"} gap={2}>
        <Stack flexGrow={1} gap={1}>
          {cart ? (
            <>
              {cart.lignes.map((product) => (
                <ProductCard
                  key={product.idProduit}
                  product={product}
                  orientation="horizontal"
                  defaultQuantity={product.quantite}
                />
              ))}
            </>
          ) : (
            <Typography>Votre panier est vide</Typography>
          )}
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
              Total: {cart?.totalCost ?? 0}€
            </Typography>
            <Typography level="body-lg">
              Total hors promotions: {cart?.totalSansPromo ?? 0}€
            </Typography>
            <Typography level="body-lg">
              Total des promotions: -{cart?.totalPromos ?? 0}€
            </Typography>
            <Button
              endDecorator={<KeyboardArrowRight />}
              onClick={onNextStep}
              disabled={!cart}
            >
              Commander
            </Button>
          </Stack>
        </div>
      </Stack>
    </Fragment>
  );
};
export default CartContent;
