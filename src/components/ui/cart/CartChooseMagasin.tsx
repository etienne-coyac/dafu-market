import {
  Badge,
  Button,
  CircularProgress,
  Option,
  Select,
  Stack,
  Typography,
  type SelectOption,
} from "@mui/joy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkCart, validateCart } from "../../../api/panier.api";
import { useState } from "react";
import useClientData from "../../../context/client.context";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { snackbar } from "../../../providers/snackbar/snackbar";

const CartChooseMagasin = () => {
  const { idMagasin } = useClientData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [userSelectedMagasin, setUserSelectedMagasin] = useState<
    number | undefined
  >(idMagasin);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const { data: checkCartData, isLoading } = useQuery({
    queryKey: ["checkCart"],
    queryFn: checkCart,
  });

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate || !selectedTime || !userSelectedMagasin) return;
      const creneau = selectedDate.clone().set("hours", selectedTime.hour());
      return validateCart(creneau, userSelectedMagasin);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // refetch orders
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-client"] });
      if (!res) return;
      snackbar.success({ text: "Commande enregistrée" });
      navigate(`/commandes/${res.idCommande}`);
    },
  });

  return (
    <>
      <Typography level="h2">Magasin de retrait</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Select
            slotProps={{
              listbox: {
                sx: {
                  maxWidth: "100%",
                  ".MuiOption-root": { width: "inherit" },
                },
              },
            }}
            sx={{ textWrap: "wrap" }}
            value={userSelectedMagasin ?? null}
            renderValue={(value: SelectOption<number> | null) => {
              const magasin = checkCartData?.stocksMagasins.find(
                (magasin) => magasin.magasin.idMagasin === value?.value
              );
              return (
                <Stack
                  gap={2}
                  direction={"row"}
                  alignItems={"center"}
                  ml={1}
                  width={"100%"}
                >
                  <Badge
                    color={
                      magasin?.panierComplet
                        ? "success"
                        : magasin?.nbLignesPanierConformes === 0
                        ? "danger"
                        : "warning"
                    }
                  />
                  <Typography
                    sx={{ width: "100%" }}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                  >
                    {value?.label}
                  </Typography>
                </Stack>
              );
            }}
            onChange={(_e, newValue) =>
              setUserSelectedMagasin(newValue ?? undefined)
            }
          >
            {checkCartData?.stocksMagasins.map((magasinData) => (
              <Option
                value={magasinData.magasin.idMagasin}
                key={magasinData.magasin.idMagasin}
              >
                <Stack
                  gap={2}
                  direction={"row"}
                  alignItems={"center"}
                  ml={1}
                  width={"100%"}
                >
                  <Badge
                    color={
                      magasinData.panierComplet
                        ? "success"
                        : magasinData.nbLignesPanierConformes === 0
                        ? "danger"
                        : "warning"
                    }
                  />
                  <Typography>
                    {`${magasinData.magasin.nom} - ${magasinData.nbLignesPanierConformes}/${magasinData.nbLignesProduits} produits disponibles`}
                  </Typography>
                </Stack>
              </Option>
            ))}
          </Select>
          <Stack direction={"row"} gap={1}>
            <span>
              <DatePicker
                disablePast
                value={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  setSelectedTime(null);
                }}
                closeOnSelect
              />
            </span>
            <span>
              <TimePicker
                shouldDisableTime={(time) =>
                  (selectedDate &&
                    (selectedDate.endOf("day").isSame(dayjs().endOf("day"))
                      ? time < dayjs()
                      : time.hour() < 9)) ||
                  time.hour() > 18
                }
                disabled={!selectedDate}
                value={selectedTime}
                onChange={setSelectedTime}
              />
            </span>
          </Stack>
          <div>
            <Button
              disabled={!userSelectedMagasin || !selectedDate || !selectedTime}
              endDecorator={<KeyboardArrowRight />}
              onClick={() => createOrderMutation.mutate()}
              loading={createOrderMutation.isPending}
            >
              Valider
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CartChooseMagasin;
