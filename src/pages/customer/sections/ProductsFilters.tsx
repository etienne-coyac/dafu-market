import {
  AccordionGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Checkbox,
  styled,
  Drawer,
  Button,
  Sheet,
  Stack,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/joy";
import { Fragment, useState, type Dispatch, type SetStateAction } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ConditionnalWrapper from "../../../components/ui/ConditionnalWrapper";
import { Close, Tune } from "@mui/icons-material";
import type { ProductType } from "../../../types/protucts";
import type { ProductFiltersType } from "./Section";

const nutriScore = ["A", "B", "C", "D", "E"];

const FilterList = styled(List)({
  maxHeight: "250px",
  overflowX: "hidden",
});

type ProductFiltersProps = {
  products: ProductType[] | undefined;
  loading?: boolean;
  filters: ProductFiltersType;
  setFilters: Dispatch<SetStateAction<ProductFiltersType>>;
};

const ProductFilters = (props: ProductFiltersProps) => {
  const { products, loading, filters, setFilters } = props;
  const [mobileFilterDrowerOpen, setMobileFilterDrowerOpen] =
    useState<boolean>(false);
  const media = useMediaQuery("down", "md");

  const brands =
    products?.map((p) => p.marque).filter((v, i, a) => a.indexOf(v) === i) ??
    [];

  const handleBrandChange = (brand: string) => {
    if (filters.brand?.includes(brand)) {
      setFilters((prev) => ({
        ...prev,
        brand: prev.brand?.filter((b) => b !== brand),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        brand: [...(prev.brand ?? []), brand],
      }));
    }
  };

  const handleNutriScoreChange = (score: string) => {
    if (filters.nutriscore?.includes(score)) {
      setFilters((prev) => ({
        ...prev,
        nutriscore: prev.nutriscore?.filter((s) => s !== score),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        nutriscore: [...(prev.nutriscore ?? []), score],
      }));
    }
  };

  const handlePromoChange = (promo: boolean) => {
    setFilters((prev) => ({
      ...prev,
      promo,
    }));
  };

  const displayNutriScoreFilter = () => {
    return products?.some((p) => p.nutriscore !== undefined);
  };

  return (
    <ConditionnalWrapper
      wrapper={(children) => (
        <Fragment>
          <Button
            startDecorator={<Tune />}
            onClick={() => setMobileFilterDrowerOpen(true)}
            fullWidth
            disabled={loading}
          >
            Filtrer
          </Button>
          <Drawer
            anchor="top"
            open={mobileFilterDrowerOpen}
            onClose={() => setMobileFilterDrowerOpen(false)}
            slotProps={{
              content: {
                sx: {
                  width: "100%",
                  height: "auto",
                  maxHeight: "100dvh",
                  bgcolor: "transparent",
                  p: 3,
                  boxShadow: "none",
                },
              },
            }}
          >
            <Sheet
              sx={{
                borderRadius: "md",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                height: "100%",
                overflow: "auto",
                transitionDuration: ".4s",
              }}
            >
              {children}
            </Sheet>
          </Drawer>
        </Fragment>
      )}
      condition={media}
    >
      <Stack gap={1}>
        <Stack
          sx={!media ? { display: "none" } : {}}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>Filtres</Typography>
          <IconButton onClick={() => setMobileFilterDrowerOpen(false)}>
            <Close />
          </IconButton>
        </Stack>

        <AccordionGroup
          transition={"none"}
          sx={{ border: "1px solid lightgrey", borderRadius: "0.5rem" }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary>Promotions</AccordionSummary>
            <AccordionDetails sx={{ boxSizing: "border-box" }}>
              <FilterList>
                {!loading ? (
                  <ListItem>
                    <Checkbox
                      label={"Promotions"}
                      checked={filters.promo}
                      onChange={(e) => handlePromoChange(e.target.checked)}
                    />
                  </ListItem>
                ) : (
                  <Skeleton variant="text" width={"100%"} height={"1rem"} />
                )}
              </FilterList>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary>Marque</AccordionSummary>
            <AccordionDetails sx={{ boxSizing: "border-box" }}>
              <FilterList
                sx={{
                  maxHeight: "250px",
                  overflowX: "hidden",
                }}
              >
                {brands && !loading ? (
                  brands.map((brand) => (
                    <ListItem key={brand}>
                      <Checkbox
                        value={brand}
                        checked={filters.brand?.includes(brand) ?? false}
                        onChange={() => handleBrandChange(brand)}
                        label={brand}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Skeleton variant="text" width={"100%"} height={"1rem"} />
                )}
              </FilterList>
            </AccordionDetails>
          </Accordion>
          {displayNutriScoreFilter() && (
            <Accordion defaultExpanded>
              <AccordionSummary>Nutriscore</AccordionSummary>
              <AccordionDetails>
                <FilterList>
                  {!loading ? (
                    nutriScore.map((score) => (
                      <ListItem key={score}>
                        <Checkbox
                          value={score}
                          checked={filters.nutriscore?.includes(score) ?? false}
                          onChange={() => handleNutriScoreChange(score)}
                          label={score}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Skeleton variant="text" width={"100%"} height={"1rem"} />
                  )}
                </FilterList>
              </AccordionDetails>
            </Accordion>
          )}
        </AccordionGroup>
      </Stack>
    </ConditionnalWrapper>
  );
};

export default ProductFilters;
