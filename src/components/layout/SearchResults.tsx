import { Box, List, ListItem, Stack } from "@mui/joy";
import ProductCard from "../ui/ProductCard";

type SearchResultsProps = {
  open: boolean;
  headerRef: React.RefObject<HTMLDivElement | null>;
};

const SearchResults = (props: SearchResultsProps) => {
  const { open, headerRef } = props;
  return (
    <Box
      sx={{
        transitionDuration: ".6s",
        height: `calc(100dvh - ${headerRef?.current?.offsetHeight}px)`,
        transform: !open ? "translateY(0)" : "translateY(-110%)",
        width: "100%",
        background: "lightgrey",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <List>
        <ListItem>Catégorie recommandée</ListItem>
        <ListItem>Catégorie recommandée</ListItem>
        <ListItem>Catégorie recommandée</ListItem>
        <ListItem>Catégorie recommandée</ListItem>
        <ListItem>Catégorie recommandée</ListItem>
      </List>
      <List>
        <ListItem>
          <ProductCard product={undefined} />
          <ProductCard product={undefined} />
          <ProductCard product={undefined} />
          <ProductCard product={undefined} />
        </ListItem>
      </List>
    </Box>
  );
};

export default SearchResults;
