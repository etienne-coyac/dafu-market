import {
  Button,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductToList, getLists } from "../../../api/lists.api";
import { enableCache } from "../../../AppProviders";
import Quantity from "../Quantity";
import { useState } from "react";
import type { ListType } from "../../../types/lists";

type AddProductToListModalProps = {
  idProduit: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddProductToListModal = (props: AddProductToListModalProps) => {
  const { idProduit, open, setOpen } = props;
  const queryClient = useQueryClient();
  const [idList, setIdList] = useState<number | null>(null);

  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
    ...enableCache(),
  });

  const [quantity, setQuantity] = useState<number>(1);

  const handleChangeIdList = (newValue: number | null) => {
    const oldQuantity =
      lists
        ?.find((list) => list.idListe === newValue)
        ?.items?.find((item) => item.idProduit === idProduit)?.quantite ?? 1;
    setIdList(newValue);
    setQuantity(oldQuantity);
  };

  const addProductListMutation = useMutation({
    mutationFn: async () => {
      if (!idList) return;
      return addProductToList(idList, idProduit, quantity);
    },
    onSuccess: (res) => {
      if (!res) return;
      queryClient.setQueryData(["lists"], (old: ListType[] | undefined) =>
        old
          ? old.filter((list) => list.idListe !== res.idListe).concat(res)
          : undefined
      );
      setOpen(false);
    },
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
      >
        <ModalClose />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 1 }}
        >
          Ajouter le produit à une liste
        </Typography>
        <Stack gap={1}>
          <Select
            placeholder="Liste"
            sx={{ minWidth: 160 }}
            value={idList}
            onChange={(_e, newValue) => handleChangeIdList(newValue)}
          >
            {lists?.map((list) => (
              <Option key={list.idListe} value={list.idListe}>
                {list.nom}
              </Option>
            ))}
          </Select>
          <Quantity value={quantity} onChange={setQuantity} delay={0} />
          <Stack direction={"row"} gap={1}>
            <Button
              color="neutral"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button
              color="success"
              disabled={!idList}
              loading={addProductListMutation.isPending}
              onClick={() => addProductListMutation.mutate()}
            >
              Valider
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default AddProductToListModal;
