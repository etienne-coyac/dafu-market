import { Typography, Grid, Box, CircularProgress } from "@mui/joy";
import ProductCard from "../../../components/ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsByMarque } from "../../../api/products.api";
import type { ProductType } from "../../../types/protucts";

const getRandomProducts = (products: ProductType[], count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const LandingPage = () => {
  const marque = "Nestlé";
  const { data: dafuProducts, isLoading } = useQuery({
    queryKey: ["produits", { marque }],
    queryFn: () => getProductsByMarque(marque),
  });

  const randomFour = dafuProducts ? getRandomProducts(dafuProducts, 4) : [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 4,
        background: `linear-gradient(to bottom, #b2d8f7 0%, #eac7f8 30%, white 65%)`,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography level="h1" fontWeight="lg">
          Bienvenue chez Dafu Market
        </Typography>
        <Typography level="body-lg">
          Découvrez nos produits populaires
        </Typography>
      </Box>

      {(() => {
        if (isLoading) {
          return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          );
        }

        if (randomFour.length) {
          return (
            <Grid container spacing={3}>
              {randomFour.map((product) => (
                <Grid xs={12} sm={6} md={3} key={product.idProduit}>
                  <ProductCard product={product} layout="Landing" />
                </Grid>
              ))}
            </Grid>
          );
        }

        return (
          <Typography level="body-md" sx={{ textAlign: "center", mt: 4 }}>
            Aucun produit trouvé pour la marque "{marque}"
          </Typography>
        );
      })()}
    </Box>
  );
};

export default LandingPage;
