import {
  Alert,
  AspectRatio,
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
import { useLayoutEffect, useRef } from "react";
import type { ProductType } from "../../../types/protucts";

const ProductDetail = () => {
  const { productId } = useParams();
  const { idMagasin } = useClientData();
  const { data: cart } = useCart();

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
    if (product && product.idMagasin === undefined) {
      oldProductRef.current = product;
    }
  }, [product]);

  const breadcrums = product
    ? [
        {
          name: product.categories[0].rayonDTO.nomRayon,
          href: `/r/${nameToUrl(product.categories[0].rayonDTO.nomRayon)}`,
        },
        {
          name: product.categories[0].nomCategorie,
          href: `/r/${nameToUrl(
            product.categories[0].rayonDTO.nomRayon
          )}/${nameToUrl(product.categories[0].nomCategorie)}`,
        },
      ]
    : [];

  const isPromo = product?.tauxPromo !== undefined && product.tauxPromo > 0;
  const displayProduct = product ?? oldProductRef.current;

  console.log(product, oldProductRef.current);
  const isProductAvailable =
    displayProduct?.idMagasin !== undefined &&
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
          <>
            <Stack sx={{ flexDirection: { sm: "column", md: "row" } }}>
              <AspectRatio
                objectFit="contain"
                sx={{ flex: 2, maxHeight: { sm: "200px", md: "400px" } }}
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
                    <Chip size="lg" variant="soft" sx={{ mt: 2 }}>
                      {label}
                    </Chip>
                  ))}
                </Stack>
                {!idMagasin && (
                  <Alert color="warning">
                    Les prix affichés sont les prix recommandés. Pour afficher
                    les prix de votre magasin, sélectionnez un magasin
                  </Alert>
                )}
                {!isProductAvailable && idMagasin !== undefined && (
                  <Alert color="danger">
                    Ce produit n'est pas disponible dans ce magasin.
                  </Alert>
                )}
                {displayProduct.idMagasin !== undefined && (
                  <Alert color="primary">
                    Stock disponible : {displayProduct.stockDispo}
                  </Alert>
                )}
                <Alert color="neutral">
                  <div>
                    <Typography level="body-md">
                      Prix {idMagasin === undefined ? "recommandé" : "de vente"}
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
                {(isProductAvailable || idMagasin === undefined) && (
                  <div>
                    <AddToCart
                      label
                      idProduit={displayProduct?.idProduit}
                      defaultQuantity={
                        cart?.lignes.find(
                          (item) => item.idProduit === displayProduct.idProduit
                        )?.quantite
                      }
                    />
                  </div>
                )}
              </Stack>
            </Stack>
          </>
        )}
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
            {categoryProducts
              ?.filter(
                (product) => product.idProduit !== displayProduct?.idProduit
              )
              .slice(0, 6)
              .map((product) => (
                <ProductCard key={product.idProduit} product={product} />
              ))}
          </Stack>
        </CenterContent>
      </Stack>
    </Stack>
  );
};

export default ProductDetail;
