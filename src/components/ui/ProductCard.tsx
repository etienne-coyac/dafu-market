import { AddShoppingCart } from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardContent,
  Chip,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";
import { useNavigate, Link as RouterLink } from "react-router";
import type { ProductType } from "../../types/protucts";
import { memo, useState } from "react";
import Quantity from "./Quantity";
import { getDisplayPrice } from "../../utils/products.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuantityPanier } from "../../api/panier.api";
import { snackbar } from "../../providers/snackbar/snackbar";
import useClientData from "../../context/client.context";
import useAuth from "../../context/auth.context";
import type { CartType } from "../../types/cart";
import useCartGuard from "../../context/cartGuard.context";

type ProductCardProps = {
  product: ProductType | undefined;
  orientation?: "horizontal" | "vertical";
  defaultQuantity?: number;
};

const ProductCard = memo((props: ProductCardProps) => {
  const { product, defaultQuantity, orientation = "vertical" } = props;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { idMagasin } = useClientData();
  const { beforeAddCart } = useCartGuard();

  const [quantityMode, setQuantityMode] = useState<boolean>(
    defaultQuantity !== undefined
  );

  const quantityMutation = useMutation({
    mutationFn: async (quantity: number) => {
      if (!product || !idMagasin) return;
      return updateQuantityPanier(product.idProduit, quantity, idMagasin);
    },

    onSuccess: (res: CartType | undefined) => {
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
      snackbar.success({ text: "Quantité mise à jour" });
    },
  });

  const isPromotion = product?.tauxPromo && product.prixAvecPromo;

  const handleNavigate = () => {
    if (!product) return;
    navigate(`/p/${product.idProduit}`);
  };
  return (
    <Card
      sx={(theme) => ({
        boxSizing: "border-box",
        ...(orientation === "vertical" && {
          height: "100%",
        }),
        ...(isPromotion && {
          borderColor: theme.vars.palette.danger[500],
          borderWidth: 2,
        }),
      })}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
        }}
      >
        <AspectRatio
          maxHeight={"120px"}
          minHeight={"100px"}
          sx={{ cursor: "pointer", flex: 1 }}
        >
          <Skeleton loading={!product} variant="overlay">
            <img
              src={product?.imageUrl}
              loading="lazy"
              onClick={handleNavigate}
            />
          </Skeleton>
          {isPromotion && (
            <Chip
              color="danger"
              variant="solid"
              sx={{
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                zIndex: 10,
              }}
            >
              -{product.tauxPromo}%
            </Chip>
          )}
        </AspectRatio>

        <Stack flex={1} justifyContent={"space-between"}>
          <Link component={RouterLink} to={`/products/${product?.idProduit}`}>
            <Typography level="body-sm">
              <Skeleton loading={!product}>
                {product?.nom ?? "Nom du produit très long "}
              </Skeleton>
            </Typography>
          </Link>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            gap={1}
          >
            {quantityMode ? (
              <Quantity
                value={defaultQuantity ?? 1}
                onChange={(newQtt) => {
                  if (newQtt === 0) setQuantityMode(false);
                  quantityMutation.mutate(newQtt);
                }}
              />
            ) : (
              <IconButton
                size="sm"
                color="success"
                variant="soft"
                disabled={!product}
                onClick={() => {
                  if (!!idMagasin && !!user) {
                    setQuantityMode(true);
                  } else {
                    beforeAddCart();
                  }
                }}
              >
                <AddShoppingCart />
              </IconButton>
            )}

            <Typography level="body-md" fontWeight={"bold"}>
              <Skeleton loading={!product}>
                {product ? getDisplayPrice(product) : ""}
              </Skeleton>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
});

export default ProductCard;
