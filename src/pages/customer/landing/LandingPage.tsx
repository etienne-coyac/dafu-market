import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Stack,
  Chip,
  Divider,
} from "@mui/joy";
import ProductCard from "../../../components/ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsByMarque } from "../../../api/products.api";
import type { ProductType } from "../../../types/protucts";
import { getAllCategoriesPreview } from "../../../api/rayons.api";
import { useNavigate } from "react-router";
import { nameToUrl } from "../../../utils/tmp/sectionToIcon";
import useClientData from "../../../context/client.context";

const getRandomProducts = (products: ProductType[], count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { idMagasin } = useClientData();
  const marque = "DAFU";
  const { data: dafuProducts, isLoading } = useQuery({
    queryKey: ["produits", { marque, idMagasin }],
    queryFn: () => getProductsByMarque(marque, idMagasin),
  });

  const { data: catPreview, isLoading: isCatLoading } = useQuery({
    queryKey: ["catPreview"],
    queryFn: getAllCategoriesPreview,
  });

  const randomFour = dafuProducts ? getRandomProducts(dafuProducts, 4) : [];

  return (
    <Stack
      gap={5}
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 4,
        borderRadius: "1rem",
        background: `linear-gradient(to bottom, #b2d8f7 0%, #eac7f8 30%, white 65%)`,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
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
      <Divider orientation="horizontal" />
      <Stack gap={1}>
        <Typography level="h3">Catégories recommandées</Typography>
        <Typography level="body-sm">
          Retrouvez ici les produits à ne pas manquer !
        </Typography>
        {isCatLoading ? (
          <CircularProgress />
        ) : (
          <Stack
            direction={"row"}
            gap={1}
            flexWrap={"wrap"}
            justifyContent={"center"}
            mt={1}
          >
            {catPreview?.map((cat) => (
              <Chip
                onClick={() =>
                  navigate(
                    `/r/${nameToUrl(cat.rayonDTO.nomRayon)}/${nameToUrl(
                      cat.nomCategorie
                    )}`
                  )
                }
                key={cat.idCategorie}
                size="lg"
              >
                {cat.nomCategorie}
              </Chip>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default LandingPage;
