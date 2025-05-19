import { AddShoppingCart } from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardContent,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router";
import type { ProductType } from "../../types/protucts";

type ProductCardProps = {
  product: ProductType | undefined;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!product) return;
    navigate(`/p/${product.idProduit}`);
  };

  return (
    <Card>
      <CardContent>
        <AspectRatio
          maxHeight={"150px"}
          minHeight={"100px"}
          sx={{ cursor: "pointer" }}
        >
          <Skeleton loading={!product} variant="overlay">
            <img src="" onClick={handleNavigate} />
          </Skeleton>
        </AspectRatio>

        <Link component={RouterLink} to={`/products/${product?.idProduit}`}>
          <Typography level="body-sm">
            <Skeleton loading={!product}>
              {product?.nom ?? "Nom du produit"}
            </Skeleton>
          </Typography>
        </Link>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          gap={1}
        >
          <IconButton
            size="sm"
            color="success"
            variant="soft"
            disabled={!product}
          >
            <AddShoppingCart />
          </IconButton>
          <Typography level="body-md" fontWeight={"bold"}>
            <Skeleton loading={!product}>
              {product?.prixRecommande?.toFixed(2) ?? "0.00"}€
            </Skeleton>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
