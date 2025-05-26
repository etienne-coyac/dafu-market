import {
  AspectRatio,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Stack,
  Typography,
} from "@mui/joy";
import CenterContent from "../../../components/layout/CenterContent";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../../api/lists.api";
import { useState } from "react";
import { enableCache } from "../../../AppProviders";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const ListsPage = () => {
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (idListe: number) => {
    setSelectedList(idListe);
    setOpen(true);
  };
  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
    ...enableCache(),
  });
  const currentList = lists?.find((list) => list.idListe === selectedList);
  return (
    <CenterContent>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography level="h1">Listes</Typography>
        <Button
          color={"primary"}
          variant="soft"
          size="sm"
          startDecorator={<KeyboardArrowLeft />}
          onClick={() => setOpen(false)}
          sx={{ display: { xs: open ? "flex" : "none", md: "none" } }}
        >
          Retour
        </Button>
      </Stack>
      <Stack
        sx={{
          overflow: "hidden",
          ...(open && {
            "& > div": {
              transform: { xs: "translateX(-100%)", md: "none" },
            },
          }),
        }}
      >
        <Stack
          direction={"row"}
          spacing={{ xs: 0, md: 1 }}
          sx={{
            transition: "transform 0.4s",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <List
            sx={{
              width: { xs: "100%", md: "30%" },
              flexShrink: 0,
              flexGrow: 0,
              p: 0,
            }}
          >
            {lists?.map((list) => (
              <ListItem key={list.idListe}>
                <ListItemButton onClick={() => handleOpen(list.idListe)}>
                  <ListItemContent>{list.nom}</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {currentList && (
            <Stack gap={1} width={"100%"} sx={{ flexShrink: 0 }}>
              <Typography
                sx={{ display: { xs: "block", md: "none" } }}
                level="h4"
              >
                {currentList.nom}
              </Typography>
              <Stack direction={"row"} gap={1}>
                <Button color="warning" variant="soft">
                  Nouveau post-it
                </Button>
              </Stack>
              <Box
                sx={{
                  border: "1px solid lightgrey",
                  p: 1,
                  borderRadius: "0.5rem",
                  width: { xs: "100%", md: "100%" },
                  flexGrow: 1,
                  boxSizing: "border-box",
                }}
              >
                <Stack spacing={1}>
                  {currentList?.items.map((product) => (
                    <Stack
                      key={product.idProduit}
                      spacing={1}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Box
                        sx={{
                          "& img": {
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          },
                        }}
                      >
                        <img src={product.imageUrl} alt={product.nomProduit} />
                      </Box>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Typography level="body-sm">
                          {product.nomProduit}
                        </Typography>
                        <Typography
                          sx={{ minWidth: "50px" }}
                          textAlign={"right"}
                        >{`x ${product.quantite}`}</Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </CenterContent>
  );
};

export default ListsPage;
