import type { Dayjs } from "dayjs";
import type { CartType } from "../types/cart";
import type { CheckMagasinsType } from "../types/magasin";
import api from "./services/api";
import type { CommandeType } from "../types/commandes";

export const getPanier = async () => {
  return api.get<CartType>("/clients/panier").then((res) => res.data);
};

export const updateQuantityPanier = async (
  idProduit: number,
  quantite: number,
  idMagasin: number
) => {
  return api
    .post<CartType>(
      `/clients/panier?idProduit=${idProduit}&quantite=${quantite}&idMagasin=${idMagasin}`
    )
    .then((res) => res.data);
};

export const checkCart = async () => {
  return api
    .get<CheckMagasinsType>("/clients/verifierPanier")
    .then((res) => res.data);
};

export const validateCart = async (
  creneauHoraire: Dayjs,
  idMagasin: number
) => {
  return api
    .post<CommandeType>("/clients/confirmerCommande", {
      creneauHoraire: creneauHoraire.toISOString().split(".")[0] + "Z",
      idMagasin,
    })
    .then((res) => res.data);
};
