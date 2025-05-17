import { Box, Stack } from "@mui/joy";
import ProductsBreadcrumbs from "../../../components/ui/ProductsBreadcrums";
import ProductFilters from "./ProductsFilters";
import ProductsList from "./ProductsList";
import useMediaQuery from "../../../hooks/useMediaQuery";

const Products = () => {
  const isDesktop = useMediaQuery("up", "md");
  return (
    <Stack>
      <ProductsBreadcrumbs />
      <Stack direction={!isDesktop ? "column" : "row"} spacing={1}>
        {/* filters */}
        <Box sx={{ width: isDesktop ? "300px" : "auto" }}>
          <ProductFilters />
        </Box>

        {/* products list */}
        <ProductsList />
      </Stack>
    </Stack>
  );
};

export default Products;
