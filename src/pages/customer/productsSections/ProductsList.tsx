import { Grid, Stack, Typography } from "@mui/joy";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/products.api";
import type { ProductType } from "../../../types/protucts";

const templateProduct: ProductType = {
  id: 1,
  name: "Coca-Cola avec un nom très très long",
  imageUrl:
    "https://media.carrefour.fr/medias/544c1d918fa04e82a73f1371c443062a/p_200x200/5449000267436_0.jpg",
  price: 5.99,
  section: "boissons",
  category: "sodas",
};

const products: ProductType[] = new Array(14).fill(templateProduct);

const ProductsList = () => {
  const { section, category } = useParams();

  const { data: exemple } = useQuery({
    queryKey: ["productsExample"],
    queryFn: getProducts,
  });

  console.log(exemple);

  return (
    <Stack rowGap={1} sx={{ flex: 1 }}>
      <Typography level="h2">{category || section}</Typography>
      <Grid container spacing={1}>
        {products.map((product, index) => (
          <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ProductsList;
