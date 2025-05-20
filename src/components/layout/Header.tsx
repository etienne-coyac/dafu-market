import { Search, Storefront } from "@mui/icons-material";
import { Stack, IconButton, Typography, Avatar, Input, Box } from "@mui/joy";
import Menu from "./menu/Menu";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";

const Header = () => {
  const searchbarRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  console.log(searchbarRef.current);

  useEffect(() => {
    if (searchbarRef?.current) {
      const handleFocus = () => {
        setOpen(true);
        document.body.style.overflow = "hidden";
      };
      const handleBlur = () => {
        setOpen(false);
        document.body.style.overflow = "auto";
      };
      searchbarRef.current?.addEventListener("focusin", handleFocus);
      searchbarRef.current?.addEventListener("focusout", handleBlur);
      return () => {
        searchbarRef.current?.removeEventListener("focusin", handleFocus);
        searchbarRef.current?.removeEventListener("focusout", handleBlur);
      };
    }
  }, []);

  console.log(open);
  return (
    <Fragment>
      <Stack
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
        <Avatar />
      </Stack>
      <SearchResults open={open} headerRef={headerRef} />
    </Fragment>
  );
};

export default Header;
