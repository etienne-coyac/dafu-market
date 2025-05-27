import {
  Alert,
  AspectRatio,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import {
  getProductByCategory,
  getProductById,
} from "../../../api/products.api";
import useClientData from "../../../context/client.context";
import ProductsBreadcrumbs from "../../../components/ui/ProductsBreadcrums";
import { nameToUrl } from "../../../utils/tmp/sectionToIcon";
import {
  getDisplayPrice,
  getNutriscoreColor,
} from "../../../utils/products.utils";
import CenterContent from "../../../components/layout/CenterContent";
import ProductCard from "../../../components/ui/ProductCard";
import AddToCart from "../../../components/ui/AddToCart";
import useCart from "../../../hooks/data/useCart";
import { useLayoutEffect, useRef, useState } from "react";
import type { ProductType } from "../../../types/protucts";
import useAuth from "../../../context/auth.context";
import { Add } from "@mui/icons-material";
import AddProductToListModal from "../../../components/ui/modals/AddProductToListModal";

const ProductDetail = () => {
  const { productId } = useParams();
  const { idMagasin } = useClientData();
  const { data: cart } = useCart();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const oldProductRef = useRef<ProductType | null>(null);

  const { data: product, isFetching } = useQuery({
    queryKey: ["product", productId, idMagasin],
    queryFn: productId
      ? () => getProductById(+productId, idMagasin)
      : undefined,
    enabled: productId !== undefined,
  });

  // save old non magasin related product in case of magasin change
  useLayoutEffect(() => {
    if (product) {
      oldProductRef.current = product;
    }
  }, [product]);

  const isPromo = product?.tauxPromo !== undefined && product.tauxPromo > 0;

  const displayProduct = product ?? oldProductRef.current;

  const breadcrums = displayProduct
    ? [
        {
          name: displayProduct.categories[0].rayonDTO.nomRayon,
          href: `/r/${nameToUrl(
            displayProduct.categories[0].rayonDTO.nomRayon
          )}`,
        },
        {
          name: displayProduct.categories[0].nomCategorie,
          href: `/r/${nameToUrl(
            displayProduct.categories[0].rayonDTO.nomRayon
          )}/${nameToUrl(displayProduct.categories[0].nomCategorie)}`,
        },
      ]
    : [];

  const isProductAvailable =
    displayProduct?.idMagasin === idMagasin &&
    displayProduct?.stockDispo !== undefined &&
    displayProduct?.stockDispo !== 0;

  const { data: categoryProducts } = useQuery({
    enabled: !!displayProduct?.categories,
    queryKey: [
      "products",
      {
        idCategory: displayProduct?.categories[0].idCategorie,
        idMagasin,
      },
    ],
    queryFn: () => {
      if (!displayProduct?.categories[0].idCategorie) return;
      return getProductByCategory(
        displayProduct.categories[0].idCategorie,
        idMagasin
      );
    },
  });

  const crossSelling = categoryProducts
    ?.filter((product) => product.idProduit !== displayProduct?.idProduit)
    .slice(0, 6);

  if (displayProduct === null && !isFetching) {
    return <Navigate to="/404" />;
  }
  return (
    <Stack gap={1}>
      <ProductsBreadcrumbs steps={breadcrums} />
      <Stack gap={3}>
        {isFetching || !displayProduct ? (
          <LinearProgress />
        ) : (
          <Stack sx={{ flexDirection: { sm: "column", md: "row" } }}>
            <AspectRatio
              objectFit="contain"
              maxHeight={"400px"}
              sx={{ flex: 2 }}
            >
              <img
                src={displayProduct?.imageUrl}
                alt={displayProduct?.nom}
                loading="lazy"
              />
            </AspectRatio>
            <Stack gap={2} sx={{ flex: 3, mt: 2 }}>
              <div>
                <Typography
                  level="h2"
                  textAlign={{ xs: "center", sm: "left" }}
                >{`${displayProduct?.nom} - ${displayProduct?.marque}`}</Typography>
                <Typography
                  level="body-lg"
                  textAlign={{ xs: "center", sm: "left" }}
                >
                  {displayProduct?.description}
                </Typography>
              </div>
              <Stack columnGap={1} direction={"row"} flexWrap={"wrap"}>
                {isPromo && (
                  <Chip
                    size="lg"
                    variant="solid"
                    color="danger"
                    sx={{ mt: 2 }}
                  >{`Promotion : -${displayProduct.tauxPromo}%`}</Chip>
                )}
                {displayProduct.nutriscore && (
                  <Chip
                    size="lg"
                    variant="soft"
                    sx={{
                      mt: 2,
                      backgroundColor: getNutriscoreColor(
                        displayProduct.nutriscore
                      ),
                      color: "white",
                    }}
                  >{`Nutriscore : ${displayProduct.nutriscore}`}</Chip>
                )}
                {displayProduct.labels?.map((label) => (
                  <Chip size="lg" variant="soft" sx={{ mt: 2 }} key={label}>
                    {label}
                  </Chip>
                ))}
              </Stack>
              {!idMagasin && (
                <Alert color="warning">
                  Les prix affichés sont les prix recommandés. Pour afficher les
                  prix de votre magasin, sélectionnez un magasin
                </Alert>
              )}
              {!isProductAvailable && idMagasin !== undefined && (
                <Alert color="danger">
                  Ce produit n'est pas disponible dans ce magasin.
                </Alert>
              )}
              {displayProduct.idMagasin === idMagasin &&
                idMagasin !== undefined && (
                  <Alert color="primary">
                    Stock disponible : {displayProduct.stockDispo}
                  </Alert>
                )}
              <Alert color="neutral">
                <div>
                  <Typography level="body-md">
                    Prix{" "}
                    {displayProduct.idMagasin !== idMagasin
                      ? "recommandé"
                      : "de vente"}
                    :
                  </Typography>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Typography
                      level="h3"
                      color={isPromo ? "danger" : "neutral"}
                    >
                      {getDisplayPrice(displayProduct)}€
                    </Typography>
                    {isPromo && (
                      <Typography
                        level="body-md"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {getDisplayPrice(displayProduct, "old")}€
                      </Typography>
                    )}
                  </Stack>
                </div>
              </Alert>
              <Stack direction={"row"} gap={1}>
                {(isProductAvailable || idMagasin === undefined) && (
                  <AddToCart
                    label
                    idProduit={displayProduct?.idProduit}
                    defaultQuantity={
                      cart?.lignes.find(
                        (item) => item.idProduit === displayProduct.idProduit
                      )?.quantite
                    }
                    shouldUpdateOnFirstRender
                  />
                )}
                {user && (
                  <Button
                    color="success"
                    variant="outlined"
                    startDecorator={<Add />}
                    onClick={() => setOpenModal(true)}
                  >
                    Placer dans une liste
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
        {crossSelling && crossSelling.length > 0 && (
          <CenterContent>
            <Divider />
            <Typography level="h4">
              Ces produits pourraient vous intéresser :
            </Typography>
            <Stack
              direction={"row"}
              gap={1}
              sx={{ overflowX: "auto", width: "100%" }}
            >
              {crossSelling.map((product) => (
                <ProductCard key={product.idProduit} product={product} />
              ))}
            </Stack>
          </CenterContent>
        )}
      </Stack>
      {displayProduct && (
        <AddProductToListModal
          open={openModal}
          setOpen={setOpenModal}
          idProduit={displayProduct.idProduit}
        />
      )}
    </Stack>
  );
};

export default ProductDetail;
