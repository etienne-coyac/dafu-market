import { Box, Button, IconButton } from "@mui/joy";
import Quantity from "./Quantity";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useClientData from "../../context/client.context";
import { updateQuantityPanier } from "../../api/panier.api";
import useCartGuard from "../../context/cartGuard.context";
import useAuth from "../../context/auth.context";
import { AddShoppingCart } from "@mui/icons-material";
import type { PanierType } from "../../types/panier";

type AddToCartProps = {
  idProduit?: number;
  defaultQuantity?: number;
  label?: boolean;
};

const AddToCart = (props: AddToCartProps) => {
  const { defaultQuantity, idProduit, label } = props;
  const queryClient = useQueryClient();
  const { idMagasin } = useClientData();
  const { beforeAddCart } = useCartGuard();
  const { user } = useAuth();
  const [quantityMode, setQuantityMode] = useState<boolean>(
    defaultQuantity !== undefined
  );

  const quantityMutation = useMutation({
    mutationFn: async (quantity: number) => {
      if (!idProduit || !idMagasin) return;
      return updateQuantityPanier(idProduit, quantity, idMagasin);
    },

    onSuccess: (res: PanierType | undefined) => {
      // backend limitation, the cart is empty on first row update so refetch the cart
      if (res && res?.lignes.length === 0) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        queryClient.setQueriesData(
          {
            queryKey: ["cart"],
          },
          () => (!res ? null : res)
        );
      }
    },
  });

  const handleClick = () => {
    if (!!idMagasin && !!user) {
      setQuantityMode(true);
    } else {
      beforeAddCart();
    }
  };

  return (
    <Box display={"flex"}>
      {quantityMode ? (
        <Quantity
          value={defaultQuantity ?? 1}
          onChange={(newQtt) => {
            if (newQtt === 0) setQuantityMode(false);
            quantityMutation.mutate(newQtt);
          }}
        />
      ) : (
        <>
          {label ? (
            <Button
              startDecorator={<AddShoppingCart />}
              disabled={!idProduit}
              onClick={handleClick}
              color="success"
              variant="soft"
            >
              Ajouter au panier
            </Button>
          ) : (
            <IconButton
              size="sm"
              color="success"
              variant="soft"
              disabled={!idProduit}
              onClick={handleClick}
            >
              <AddShoppingCart />
            </IconButton>
          )}
        </>
      )}
    </Box>
  );
};

export default AddToCart;
