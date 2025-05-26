import {
  AspectRatio,
  Card,
  CardContent,
  Chip,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";
import { useNavigate, Link as RouterLink } from "react-router";
import type { ProductType } from "../../types/protucts";
import { memo } from "react";
import { getDisplayPrice } from "../../utils/products.utils";
import AddToCart from "./AddToCart";

type ProductCardProps = {
  product: ProductType | undefined;
  orientation?: "horizontal" | "vertical";
  defaultQuantity?: number;
};

const ProductCard = memo((props: ProductCardProps) => {
  const { product, defaultQuantity, orientation = "vertical" } = props;
  const navigate = useNavigate();

  const isPromotion = !!product?.tauxPromo && !!product.prixAvecPromo;

  const handleNavigate = () => {
    if (!product) return;
    navigate(`/p/${product.idProduit}`);
  };
  return (
    <Card
      sx={(theme) => ({
        boxSizing: "border-box",
        minWidth: "150px",
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
          <Link component={RouterLink} to={`/p/${product?.idProduit}`}>
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
            <AddToCart
              idProduit={product?.idProduit}
              defaultQuantity={defaultQuantity}
            />

            <Typography level="body-md" fontWeight={"bold"}>
              <Skeleton loading={!product}>
                {product ? `${getDisplayPrice(product)}€` : ""}
              </Skeleton>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
});

export default ProductCard;
