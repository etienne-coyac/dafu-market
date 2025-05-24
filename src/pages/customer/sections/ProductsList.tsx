import { Grid, Stack, Typography } from "@mui/joy";
import ProductCard from "../../../components/ui/ProductCard";
import { useParams } from "react-router";
import type { ProductType } from "../../../types/protucts";
import LoginModal from "../../../components/ui/modals/LoginModal";
import ChoseMagasinModal from "../../../components/ui/modals/ChoseMagasinModal";
import { useCallback, useState } from "react";
import useAuth from "../../../context/auth.context";
import useClientData from "../../../context/client.context";
import useCart from "../../../hooks/data/useCart";

type ProductsListProps = {
  products: ProductType[] | undefined;
  loading?: boolean;
};

const ProductsList = (props: ProductsListProps) => {
  const { products, loading } = props;
  const { section, category } = useParams();
  const { user } = useAuth();
  const { idMagasin } = useClientData();
  const { data: cart, isLoading: cartLoading } = useCart();
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openChoseMagasin, setOpenChoseMagasin] = useState<boolean>(false);

  // TODO: à optimiser, cause un rerender de tous les ProductCard pas nécessaire au moment de la connexion
  // rerender à la sélection du magasin normal car les produits changent
  // déjà testé et marche pas :
  // - contexte CartGuardProvider (car ProductCard y est subscribe indirectement via handleBeforeAddCart)
  // - memo pour la même raison
  const handleBeforeAddCart = useCallback(() => {
    if (!user) setOpenLoginModal(true);
    else if (!idMagasin) setOpenChoseMagasin(true);
  }, [idMagasin, user]);

  return (
    <Stack rowGap={1} sx={{ flex: 1 }}>
      <Typography level="h2">{category ?? section}</Typography>
      <Grid container spacing={1}>
        {loading || cartLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <ProductCard product={undefined} beforeAddCart={() => null} />
              </Grid>
            ))
          : products?.map((product) => (
              <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={product.idProduit}>
                <ProductCard
                  product={product}
                  beforeAddCart={handleBeforeAddCart}
                  defaultQuantity={
                    cart?.lignes.find(
                      (item) => item.idProduit === product.idProduit
                    )?.quantite
                  }
                />
              </Grid>
            ))}
      </Grid>
      <LoginModal
        open={openLoginModal}
        setOpen={setOpenLoginModal}
        next={() => {
          if (!idMagasin) setOpenChoseMagasin(true);
        }}
      />
      <ChoseMagasinModal
        open={openChoseMagasin}
        setOpen={setOpenChoseMagasin}
      />
    </Stack>
  );
};

export default ProductsList;
