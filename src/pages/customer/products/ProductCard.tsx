import { AddShoppingCart } from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";

type ProductCardProps = {
  product: {
    name: string;
    price: number;
    imageUrl: string;
  };
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <Card>
      <CardContent>
        <AspectRatio maxHeight={"150px"} minHeight={"100px"}>
          <img src={product.imageUrl} />
        </AspectRatio>
        <Typography level="body-sm">{product.name}</Typography>
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
