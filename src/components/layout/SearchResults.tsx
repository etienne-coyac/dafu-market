import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/joy";
import ProductCard from "../ui/ProductCard";
import { KeyboardArrowUp } from "@mui/icons-material";

type SearchResultsProps = {
  open: boolean;
  onClose: () => void;
  headerRef: React.RefObject<HTMLDivElement | null>;
};

const SearchResults = (props: SearchResultsProps) => {
  const { open, onClose, headerRef } = props;
  return (
    <Box
      sx={{
        transitionDuration: ".6s",
        height: `calc(100dvh - ${headerRef?.current?.offsetHeight}px)`,
        transform: open ? "translateY(0)" : "translateY(-110%)",
        width: "100%",
        background: "lightgrey",
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
            <ListItem>Catégorie recommandée</ListItem>
            <ListItem>Catégorie recommandée</ListItem>
            <ListItem>Catégorie recommandée</ListItem>
            <ListItem>Catégorie recommandée</ListItem>
            <ListItem>Catégorie recommandée</ListItem>
          </List>
          <Divider orientation="vertical" sx={{ margin: "5rem 0" }} />
          <Grid
            container
            sx={{
              width: { xs: "100%", md: "50%" },
              maxHeight: "100%",
              overflowY: "auto",
              p: 1,
              alignItems: "flex-start",
            }}
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <Grid key={index} xs={12} sm={12} md={6}>
                <ProductCard
                  orientation="horizontal"
                  product={undefined}
                  canAddCart={() => null}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchResults;
