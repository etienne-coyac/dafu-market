import { Grid, Stack, Typography } from "@mui/joy";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/products.api";

const ProductsList = () => {
  const { section, category } = useParams();

  const { data: products } = useQuery({
    queryKey: ["productsExample"],
    queryFn: getProducts,
  });

  console.log(products);

  return (
    <Stack rowGap={1} sx={{ flex: 1 }}>
      <Typography level="h2">{category ?? section}</Typography>
      <Grid container spacing={1}>
        {products?.map((product) => (
          <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ProductsList;
