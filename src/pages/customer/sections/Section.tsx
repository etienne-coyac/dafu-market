import { Box, LinearProgress, Stack } from "@mui/joy";
import ProductsBreadcrumbs from "../../../components/ui/ProductsBreadcrums";
import ProductsList from "./ProductsList";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useParams } from "react-router";
import {
  getProductByCategory,
  getProductsBySection,
} from "../../../api/products.api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import ProductFilters from "./ProductsFilters";
import { getSections } from "../../../api/sections.api";
import { nameToUrl } from "../../../utils/tmp/sectionToIcon";

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

  console.log(currentCategory);

  const getCurrentRequest = () =>
    currentCategory
      ? getProductByCategory(currentCategory.idCategorie)
      : currentSection
      ? getProductsBySection(currentSection.idRayon)
      : undefined;

  const { data: products, isFetching } = useQuery({
    enabled: !!currentSection,
    queryKey: [
      "products",
      {
        idRayon: currentSection?.idRayon,
        idCategorie: currentCategory?.idCategorie,
      },
    ],
    queryFn: getCurrentRequest,
  });

  const filteredProducts = useMemo(
    () =>
      products?.filter((product) => {
        return (
          (filters.brand === undefined ||
            filters.brand.length === 0 ||
            filters.brand.includes(product.marque)) &&
          (filters.nutriscore === undefined ||
            filters.nutriscore.length === 0 ||
            (product.nutriscore &&
              filters.nutriscore.includes(product.nutriscore)))
        );
      }),
    [products, filters]
  );

  return (
    <Stack>
      <LinearProgress sx={!isFetching ? { display: "none" } : undefined} />
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
