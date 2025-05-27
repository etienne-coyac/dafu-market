import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Stack,
  Typography,
} from "@mui/joy";
import CenterContent from "../../../components/layout/CenterContent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductToList, deleteList, getLists } from "../../../api/lists.api";
import { useMemo, useState } from "react";
import { enableCache } from "../../../AppProviders";
import {
  Add,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import PostItList from "../../../components/layout/PostItList";
import NewListModal from "../../../components/ui/modals/NewListModal";
import type { ListType } from "../../../types/lists";
import Quantity from "../../../components/ui/Quantity";
import { Link as RouterLink, useNavigate } from "react-router";
import { conversionListPanier } from "../../../api/panier.api";
import useClientData from "../../../context/client.context";

const ListsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { idMagasin } = useClientData();
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openNewList, setOpenNewList] = useState<boolean>(false);

  const handleOpen = (idListe: number) => {
    setSelectedList(idListe);
    setOpen(true);
  };
  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
    ...enableCache(),
  });

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.setQueryData(["lists"], (old: ListType[] | undefined) =>
        old?.filter((list) => list.idListe !== selectedList)
      );
      setSelectedList(null);
      setOpen(false);
    },
  });

  const convertMutation = useMutation({
    mutationFn: async (idList: number) => {
      if (!idMagasin) return;
      return conversionListPanier(idList, idMagasin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/panier");
    },
  });

  const changeQuantityMutation = useMutation({
    mutationFn: async (payload: { idProduit: number; quantity: number }) => {
      if (!selectedList) return;
      return addProductToList(
        selectedList,
        payload.idProduit,
        payload.quantity
      );
    },

    onSuccess: (res) => {
      if (!res) return;
      queryClient.setQueryData(["lists"], (old: ListType[] | undefined) =>
        old?.map((list) => (list.idListe === selectedList ? res : list))
      );
    },
  });

  const currentList = useMemo(() => {
    const list = lists?.find((list) => list.idListe === selectedList);
    list?.items?.sort((a, b) => a.idProduit - b.idProduit);
    return list;
  }, [lists, selectedList]);

  return (
    <CenterContent>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography level="h1">Listes</Typography>
        {selectedList !== null && open && (
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
        )}
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
          <Box sx={{ width: { xs: "100%", md: "30%" }, flexShrink: 0 }}>
            <Button
              color={"success"}
              variant="soft"
              size="sm"
              startDecorator={<Add />}
              fullWidth
              onClick={() => setOpenNewList(true)}
            >
              Nouvelle liste
            </Button>
            <List
              sx={{
                p: 0,
              }}
            >
              {lists?.map((list) => (
                <ListItem key={list.idListe}>
                  <ListItemButton
                    selected={list.idListe === selectedList}
                    onClick={() => handleOpen(list.idListe)}
                  >
                    <ListItemContent>{list.nom}</ListItemContent>
                    <KeyboardArrowRight />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {selectedList && currentList && (
            <Stack
              gap={1}
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: "69%" },
              }}
            >
              <Typography
                sx={{ display: { xs: "block", md: "none" } }}
                level="h4"
              >
                {currentList.nom}
              </Typography>

              <PostItList
                postits={currentList.postIts ?? []}
                idList={selectedList}
              />

              <Box
                sx={{
                  border: "1px solid lightgrey",
                  p: 1,
                  borderRadius: "0.5rem",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Stack spacing={1}>
                  {currentList.items !== null &&
                  currentList.items.length > 0 ? (
                    currentList.items.map((product) => (
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
                          <img
                            src={product.imageUrl}
                            alt={product.nomProduit}
                          />
                        </Box>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          width={"100%"}
                        >
                          <Link
                            component={RouterLink}
                            to={`/p/${product.idProduit}`}
                            level="body-sm"
                          >
                            {product.nomProduit}
                          </Link>
                          <Quantity
                            value={product.quantite}
                            onChange={(value: number) =>
                              changeQuantityMutation.mutate({
                                idProduit: product.idProduit,
                                quantity: value,
                              })
                            }
                          />
                        </Stack>
                      </Stack>
                    ))
                  ) : (
                    <Typography>Votre liste est vide.</Typography>
                  )}
                </Stack>
              </Box>
              <Stack alignSelf={"flex-end"} gap={1} direction={"row"}>
                {idMagasin && (
                  <Button
                    color="success"
                    size="sm"
                    onClick={() => convertMutation.mutate(selectedList)}
                    loading={convertMutation.isPending}
                  >
                    Tout ajouter au panier
                  </Button>
                )}
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => deleteListMutation.mutate(selectedList)}
                  loading={deleteListMutation.isPending}
                >
                  Supprimer la liste
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
      <NewListModal open={openNewList} setOpen={setOpenNewList} />
    </CenterContent>
  );
};

export default ListsPage;
