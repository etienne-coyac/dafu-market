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
import { useState } from "react";
import Quantity from "./Quantity";

type ProductCardProps = {
  product: ProductType | undefined;
  orientation?: "horizontal" | "vertical";
  quantityInCart?: boolean;
};

const ProductCard = (props: ProductCardProps) => {
  const {
    product,
    orientation = "vertical",
    quantityInCart: isInCart = false,
  } = props;
  const [quantityMode, setQuantityMode] = useState<boolean>(isInCart);

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!product) return;
    navigate(`/p/${product.idProduit}`);
  };

  return (
    <Card
      sx={(theme) =>
        product?.prixAvecPromo === undefined
          ? {
              borderColor: theme.vars.palette.danger[500],
              borderWidth: 2,
            }
          : {}
      }
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
        }}
      >
        <AspectRatio
          maxHeight={"150px"}
          minHeight={"100px"}
          sx={{ cursor: "pointer", flex: 1, position: "relative" }}
        >
          <Skeleton loading={!product} variant="overlay">
            <img src={product?.imageUrl} onClick={handleNavigate} />
          </Skeleton>
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
            -40%
          </Chip>
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
              <Quantity value={1} onChange={() => null} />
            ) : (
              <IconButton
                size="sm"
                color="success"
                variant="soft"
                disabled={!product}
                onClick={() => {
                  setQuantityMode(true);
                }}
              >
                <AddShoppingCart />
              </IconButton>
            )}

            <Typography level="body-md" fontWeight={"bold"}>
              <Skeleton loading={!product}>
                {product?.prixRecommande?.toFixed(2) ?? "0.00"}€
              </Skeleton>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
