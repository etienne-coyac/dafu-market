import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/joy";
import ProductCard from "../ui/ProductCard";
import { KeyboardArrowUp } from "@mui/icons-material";
import type { ProductType } from "../../types/protucts";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAllCategoriesPreview } from "../../api/rayons.api";
import { useQuery } from "@tanstack/react-query";
import { nameToUrl } from "../../utils/tmp/sectionToIcon";

type SearchResultsProps = {
  open: boolean;
  onClose: () => void;
  headerRef: React.RefObject<HTMLDivElement | null>;
  products: ProductType[];
  loading: boolean;
};

const SearchResults = (props: SearchResultsProps) => {
  const { open, onClose, headerRef, products, loading } = props;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) onClose();
  }, [location.pathname]);

  const { data: catPreview } = useQuery({
    queryKey: ["catPreview"],
    queryFn: getAllCategoriesPreview,
  });

  return (
    <Box
      sx={{
        transitionDuration: ".6s",
        height: `calc(100dvh - ${headerRef?.current?.offsetHeight}px)`,
        transform: open ? "translateY(0)" : "translateY(-110%)",
        width: "100%",
        background: "#eef3ff",
        overflow: "hidden",
        position: "absolute",
        top: `${headerRef?.current?.offsetHeight}px`,
        left: 0,
        zIndex: 10,
      }}
    >
      <Box
        sx={{ height: `calc(100dvh - ${headerRef?.current?.offsetHeight}px)` }}
      >
        <IconButton sx={{ width: "100%", height: "2rem" }} onClick={onClose}>
          <KeyboardArrowUp />
        </IconButton>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          width={"100%"}
          height={"calc(100% - 2rem)"}
        >
          <List
            sx={{
              alignItems: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <ListItem>
              <Typography level="h4">Recherches populaires :</Typography>
            </ListItem>
            {catPreview?.map((c) => (
              <ListItem key={c.idCategorie}>
                <ListItemButton
                  onClick={() =>
                    navigate(
                      `/r/${nameToUrl(c.rayonDTO.nomRayon)}/${nameToUrl(
                        c.nomCategorie
                      )}`
                    )
                  }
                >
                  {c.nomCategorie}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider orientation="vertical" sx={{ margin: "5rem 0" }} />
          <Grid
            container
            rowGap={1}
            sx={{
              width: { xs: "100%", md: "50%" },
              maxHeight: "100%",
              overflowY: "auto",
              p: 2,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <CircularProgress size="lg" />
            ) : (
              <>
                {products.map((p, index) => (
                  <Grid key={index} xs={12}>
                    <ProductCard orientation="horizontal" product={p} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchResults;
