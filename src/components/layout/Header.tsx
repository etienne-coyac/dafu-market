import { Search, ShoppingBasket } from "@mui/icons-material";
import { Stack, IconButton, Typography, Input, Box, Badge } from "@mui/joy";
import Menu from "./menu/Menu";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import Profile from "./menu/Profile";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const searchbarRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const ref = searchbarRef.current;
    if (ref) {
      const handleFocus = () => {
        setOpen(true);
        document.body.style.overflow = "hidden";
      };
      ref?.addEventListener("focusin", handleFocus);
      return () => {
        ref?.removeEventListener("focusin", handleFocus);
      };
    }
  }, []);

  const handleCloseSearchResults = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <Fragment>
      <Stack
        component={"header"}
        ref={headerRef}
        direction={"row"}
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          background: "white",
          zIndex: 2,
          borderBottom: "1px solid lightGrey",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
          rowGap: 1,
          flexWrap: "wrap",
        }}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Menu />
          <Typography
            level={"h1"}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
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
            ref={searchbarRef}
            endDecorator={<Search />}
            fullWidth
            placeholder="Rechercher un produit"
          />
        </Box>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <IconButton
            size="md"
            variant="outlined"
            color="neutral"
            sx={{
              borderRadius: "50%",
            }}
            onClick={() => navigate("/panier")}
          >
            <Badge badgeContent={"0"} color="primary" size="sm">
              <ShoppingBasket />
            </Badge>
          </IconButton>
          <Profile />
        </Stack>
      </Stack>
      {/* <SearchResults
        open={open}
        onClose={handleCloseSearchResults}
        headerRef={headerRef}
      /> */}
    </Fragment>
  );
};

export default Header;
