import { AddShoppingCart } from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardContent,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router";
import type { ProductType } from "../../../types/protucts";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/p/${product.id}`);
  };

  return (
    <Card>
      <CardContent>
        <AspectRatio
          maxHeight={"150px"}
          minHeight={"100px"}
          sx={{ cursor: "pointer" }}
        >
          <img src={product.imageUrl} onClick={handleNavigate} />
        </AspectRatio>
        <Link component={RouterLink} to={`/products/${product.id}`}>
          <Typography level="body-sm">{product.name}</Typography>
        </Link>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          gap={1}
        >
          <IconButton size="sm" color="success" variant="soft">
            <AddShoppingCart />
          </IconButton>
          <Typography level="body-md" fontWeight={"bold"}>
            {product.price.toFixed(2)}€
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
