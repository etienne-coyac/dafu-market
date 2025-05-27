import { Delete, KeyboardArrowRight } from "@mui/icons-material";
import { Typography, Stack, Button } from "@mui/joy";
import { Fragment } from "react/jsx-runtime";
import ProductCard from "../ProductCard";
import useCart from "../../../hooks/data/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "../../../api/panier.api";

type CartContentProps = {
  onNextStep: () => void;
};
const CartContent = (props: CartContentProps) => {
  const { onNextStep } = props;
  const queryClient = useQueryClient();
  const { data: cart } = useCart();

  const deletePanierMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-client"] });
    },
  });
  return (
    <Fragment>
      <Typography level="h1">Mon panier</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} width={"100%"} gap={2}>
        <Stack flexGrow={1} gap={1}>
          {cart && cart.lignes.length > 0 ? (
            <>
              {cart.lignes.map((product) => (
                <ProductCard
                  key={product.idProduit}
                  product={product}
                  orientation="horizontal"
                  defaultQuantity={product.quantite}
                />
              ))}
              <Button
                startDecorator={<Delete />}
                onClick={() => deletePanierMutation.mutate()}
                loading={deletePanierMutation.isPending}
                disabled={!cart || !cart.lignes.length}
                color="danger"
                variant="outlined"
              >
                Vider le panier
              </Button>
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
              Total des promotions: -{cart?.totalPromo ?? 0}€
            </Typography>
            <Button
              endDecorator={<KeyboardArrowRight />}
              onClick={onNextStep}
              disabled={!cart || !cart.lignes.length}
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
