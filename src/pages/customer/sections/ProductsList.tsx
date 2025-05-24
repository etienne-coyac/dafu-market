import { Grid, Stack, Typography } from "@mui/joy";
import ProductCard from "../../../components/ui/ProductCard";
import { useParams } from "react-router";
import type { ProductType } from "../../../types/protucts";
import useCart from "../../../hooks/data/useCart";

type ProductsListProps = {
  products: ProductType[] | undefined;
  loading?: boolean;
};

const ProductsList = (props: ProductsListProps) => {
  const { products, loading } = props;
  const { section, category } = useParams();
  const { data: cart, isLoading: cartLoading } = useCart();

  return (
    <Stack rowGap={1} sx={{ flex: 1 }}>
      <Typography level="h2">{category ?? section}</Typography>
      <Grid container spacing={1}>
        {loading || cartLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={index + "loader"}>
                <ProductCard product={undefined} />
              </Grid>
            ))
          : products?.map((product) => (
              <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={product.idProduit}>
                <ProductCard
                  product={product}
                  defaultQuantity={
                    cart?.lignes.find(
                      (item) => item.idProduit === product.idProduit
                    )?.quantite
                  }
                />
              </Grid>
            ))}
      </Grid>
    </Stack>
  );
};

export default ProductsList;
