import {
  LocationPin,
  Search,
  ShoppingBasket,
  WrongLocation,
} from "@mui/icons-material";
import {
  Stack,
  IconButton,
  Typography,
  Input,
  Box,
  Badge,
  Tooltip,
} from "@mui/joy";
import Menu from "./menu/Menu";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import Profile from "./menu/Profile";
import { useNavigate } from "react-router";
import ChoseMagasinModal from "../ui/modals/ChoseMagasinModal";
import useClientData from "../../context/client.context";
import useCart from "../../hooks/data/useCart";
import SearchResults from "./SearchResults";
import { getProductsSearch } from "../../api/products.api";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const searchbarRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { magasin } = useClientData();
  const { data: cart } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const [openSelectMagasin, setOpenSelectMagasin] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data: products, isLoading } = useQuery({
    enabled: !!search,
    queryKey: ["products", search],
    queryFn: () => getProductsSearch(search),
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((nextValue: string) => {
        setSearch(nextValue);
      }, 1000),
    [] // only create it once
  );

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
          zIndex: 12,
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
            width: { xs: "100%", md: "40%" },
            order: { xs: "2", md: "inherit" },
          }}
        >
          <Input
            ref={searchbarRef}
            endDecorator={<Search />}
            placeholder="Rechercher un produit"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </Box>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Tooltip
            title={magasin?.nom ?? "Choisissez un magasin"}
            placement="bottom-end"
            variant="outlined"
          >
            <IconButton
              variant="outlined"
              color={magasin ? "success" : "danger"}
              sx={{ borderRadius: "50%" }}
              onClick={() => setOpenSelectMagasin(true)}
            >
              {magasin ? <LocationPin /> : <WrongLocation />}
            </IconButton>
          </Tooltip>
          <IconButton
            variant="outlined"
            color="neutral"
            sx={{
              borderRadius: "50%",
            }}
            onClick={() => {
              navigate("/panier");
              setOpen(false);
            }}
          >
            <Badge
              badgeContent={cart?.lignes.length ?? "0"}
              color="primary"
              size="sm"
            >
              <ShoppingBasket />
            </Badge>
          </IconButton>
          <Profile />
        </Stack>
      </Stack>
      <SearchResults
        open={open}
        onClose={handleCloseSearchResults}
        headerRef={headerRef}
        products={products ?? []}
        loading={isLoading}
      />
      <ChoseMagasinModal
        open={openSelectMagasin}
        setOpen={setOpenSelectMagasin}
      />
    </Fragment>
  );
};

export default Header;
