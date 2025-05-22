import { Box, LinearProgress, Stack } from "@mui/joy";
import ProductsBreadcrumbs from "../../../components/ui/ProductsBreadcrums";
import ProductsList from "./ProductsList";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useParams } from "react-router";
import {
  getProductByCategory,
  getProductsBySection,
} from "../../../api/products.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import ProductFilters from "./ProductsFilters";
import { nameToUrl } from "../../../utils/tmp/sectionToIcon";
import type { ProductType } from "../../../types/protucts";
import { getSections } from "../../../api/sections.api";

export type ProductFiltersType = {
  brand?: string[];
  nutriscore?: string[];
};

const Products = () => {
  const { section, category } = useParams<{
    section: string;
    category?: string;
  }>();
  const isDesktop = useMediaQuery("up", "md");
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<ProductFiltersType>({});

  const { data: sections } = useQuery({
    queryKey: ["sections"],
    queryFn: getSections,
  });
  const currentSection = sections?.find(
    (s) => nameToUrl(s.nomRayon) === section
  );
  const currentCategory = currentSection?.categories.find(
    (c) => nameToUrl(c.nomCategorie) === category
  );

  const existingProducts = queryClient
    .getQueryData<ProductType[]>([
      "products",
      { idRayon: currentSection?.idRayon },
    ])
    ?.filter(
      (p) =>
        p.categories.findIndex(
          (c) => c.idCategorie === currentCategory?.idCategorie
        ) !== -1
    );

  const getCurrentRequest = () =>
    currentCategory
      ? getProductByCategory(currentCategory.idCategorie)
      : currentSection
      ? getProductsBySection(currentSection.idRayon)
      : undefined;

  const { data: fetchProducts, isFetching } = useQuery({
    enabled: !!currentSection && !existingProducts?.length,
    queryKey: [
      "products",
      {
        idRayon: currentSection?.idRayon,
        idCategorie: currentCategory?.idCategorie,
      },
    ],
    queryFn: getCurrentRequest,
  });

  const products = existingProducts?.length ? existingProducts : fetchProducts;

  const filteredProducts = useMemo(
    () =>
      (existingProducts?.length ? existingProducts : products)?.filter(
        (product) => {
          return (
            (filters.brand === undefined ||
              filters.brand.length === 0 ||
              filters.brand.includes(product.marque)) &&
            (filters.nutriscore === undefined ||
              filters.nutriscore.length === 0 ||
              (product.nutriscore &&
                filters.nutriscore.includes(product.nutriscore)))
          );
        }
      ),
    [existingProducts, products, filters.brand, filters.nutriscore]
  );

  return (
    <Stack sx={{ position: "relative" }}>
      <LinearProgress
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          display: isFetching ? "block" : "none",
        }}
      />
      <ProductsBreadcrumbs
        steps={[
          ...(section ? [{ name: section, href: `/r/${section}` }] : []),
          ...(category
            ? [{ name: category, href: `/r/${section}/${category}` }]
            : []),
        ]}
      />
      <Stack direction={!isDesktop ? "column" : "row"} spacing={1}>
        {/* filters */}
        <Box sx={{ width: isDesktop ? "300px" : "auto" }}>
          <ProductFilters
            products={products}
            loading={isFetching}
            filters={filters}
            setFilters={setFilters}
          />
        </Box>

        {/* products list */}
        <ProductsList products={filteredProducts} loading={isFetching} />
      </Stack>
    </Stack>
  );
};

export default Products;
