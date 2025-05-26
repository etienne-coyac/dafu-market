import {
  Button,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createList } from "../../../api/lists.api";
import type { ListType } from "../../../types/lists";

type NewListProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
const NewListModal = (props: NewListProps) => {
  const { open, setOpen } = props;
  const queryClient = useQueryClient();
  const [nom, setNom] = useState<string>("");

  const onSuccess = () => {
    queryClient.setQueryData(["lists"], (old: ListType[] | undefined) =>
      old ? [...old, { nom }] : undefined
    );
    setOpen(false);
  };

  const handleSubmit = () => {
    if (nom.length > 0) {
      createListMutation.mutate(nom);
    }
  };

  const createListMutation = useMutation({
    mutationFn: (nom: string) => createList(nom),
    onSuccess,
  });

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
          Créer une liste de courses
        </Typography>
        <Stack gap={1}>
          <Input
            placeholder="Nom de la liste"
            onChange={(e) => setNom(e.target.value)}
          />
          <Button
            color="success"
            size="sm"
            onClick={handleSubmit}
            loading={createListMutation.isPending}
          >
            Valider
          </Button>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default NewListModal;
