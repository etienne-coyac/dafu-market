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
} from "@mui/joy";
import { Fragment, useState } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ConditionnalWrapper from "../../../components/ui/ConditionnalWrapper";
import { Close, Tune } from "@mui/icons-material";

const brands = [
  { name: "Nestle", value: "nestle" },
  { name: "Pepsi", value: "pepsi" },
  { name: "Coca-Cola", value: "coca-cola" },
  { name: "Sprite", value: "sprite" },
  { name: "Fanta", value: "fanta" },
  { name: "Oasis", value: "oasis" },
  { name: "Red Bull", value: "red-bull" },
  { name: "Lipton", value: "lipton" },
];

const nutriScore = ["A", "B", "C", "D", "E"];

const FilterList = styled(List)({
  maxHeight: "250px",
  overflowX: "hidden",
});

const ProductFilters = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedNutriScore, setSelectedNutriScore] = useState<string[]>([]);
  const [mobileFilterDrowerOpen, setMobileFilterDrowerOpen] =
    useState<boolean>(false);
  const media = useMediaQuery("down", "md");

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles a change in the selected nutri scores.
/*******  c27be3f9-35de-4315-9688-26d06211fd8b  *******/
  const handleNutriScoreChange = (score: string) => {
    if (selectedNutriScore.includes(score)) {
      setSelectedNutriScore(selectedNutriScore.filter((s) => s !== score));
    } else {
      setSelectedNutriScore([...selectedNutriScore, score]);
    }
  };

  console.log(media);
  return (
    <ConditionnalWrapper
      wrapper={(children) => (
        <Fragment>
          <Button
            startDecorator={<Tune />}
            onClick={() => setMobileFilterDrowerOpen(true)}
            fullWidth
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
            <AccordionSummary>Marque</AccordionSummary>
            <AccordionDetails sx={{ boxSizing: "border-box" }}>
              <FilterList
                sx={{
                  maxHeight: "250px",
                  overflowX: "hidden",
                }}
              >
                {brands.map((brand) => (
                  <ListItem key={brand.value}>
                    <Checkbox
                      value={brand.value}
                      checked={selectedBrands.includes(brand.value)}
                      onChange={() => handleBrandChange(brand.value)}
                      label={brand.name}
                    />
                  </ListItem>
                ))}
              </FilterList>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary>Nutriscore</AccordionSummary>
            <AccordionDetails>
              <FilterList>
                {nutriScore.map((score) => (
                  <ListItem key={score}>
                    <Checkbox
                      value={score}
                      checked={selectedNutriScore.includes(score)}
                      onChange={() => handleNutriScoreChange(score)}
                      label={score}
                    />
                  </ListItem>
                ))}
              </FilterList>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Stack>
    </ConditionnalWrapper>
  );
};

export default ProductFilters;
