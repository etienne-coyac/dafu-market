import {
  Alert,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { changeCartMagasin, getMagasins } from "../../../api/magasins.api";
import { enableCache } from "../../../AppProviders";
import useClientData from "../../../context/client.context";
import useCart from "../../../hooks/data/useCart";

type ChoseMagasinProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ChoseMagasinModal = (props: ChoseMagasinProps) => {
  const { open, setOpen } = props;
  const queryClient = useQueryClient();
  const { idMagasin, setIdMagasin } = useClientData();
  const { data: cart } = useCart();
  const { data: magasins } = useQuery({
    queryKey: ["magasins"],
    queryFn: getMagasins,
    ...enableCache(),
  });

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 1 }}
        >
          Choisir un magasin
        </Typography>
        <Stack gap={2}>
          <Typography id="modal-desc" textColor="text.tertiary">
            Choisir un magasin de retrait permet de consulter les stocks et prix
            en temps réel, et de passer commande facilement selon la
            disponibilité locale.
          </Typography>
          <Alert color="danger">
            Attention : les prix pratiqués par les différents magasin peuvent
            être différents
          </Alert>
          <Select
            size="sm"
            value={idMagasin}
            onChange={async (_e, newValue) => {
              setIdMagasin(newValue ?? undefined);
              if (cart && newValue) {
                await changeCartMagasin(newValue).then((updatedCart) => {
                  queryClient.setQueriesData(
                    { queryKey: ["cart-client"] },
                    () => updatedCart
                  );
                  queryClient.setQueriesData(
                    { queryKey: ["cart"] },
                    () => updatedCart
                  );
                  queryClient.invalidateQueries({
                    queryKey: ["checkCart"],
                  });
                });
              }
              setOpen(false);
            }}
          >
            {magasins?.map((magasin) => (
              <Option key={magasin.idMagasin} value={magasin.idMagasin}>
                {`${magasin.nom} - (${magasin.ville}) - (${magasin.idMagasin})`}
              </Option>
            ))}
          </Select>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default ChoseMagasinModal;
