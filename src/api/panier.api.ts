import type { CartType } from "../types/cart";
import api from "./services/api";

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
      `/clients/panier/${idProduit}?quantite=${quantite}&idMagasin=${idMagasin}`
    )
    .then((res) => res.data);
};
