import { Search, Storefront } from "@mui/icons-material";
import { Stack, IconButton, Typography, Avatar, Input, Box } from "@mui/joy";
import Menu from "./menu/Menu";

const Header = () => {
  return (
    <Stack
      direction={"row"}
      borderBottom={"1px solid lightGrey"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={1.5}
      rowGap={1}
      flexWrap={"wrap"}
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        background: "white",
        zIndex: 2,
      }}
    >
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            borderRadius: "50%",
          }}
        >
          <Storefront />
        </IconButton>
        <Menu />
        <Typography level={"h1"} sx={{ display: { xs: "none", sm: "block" } }}>
          DAFU Market
        </Typography>
      </Stack>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          order: { xs: "2", md: "inherit" },
        }}
      >
        <Input
          endDecorator={<Search />}
          fullWidth
          placeholder="Rechercher un produit"
        />
      </Box>
      <Avatar />
    </Stack>
  );
};

export default Header;
