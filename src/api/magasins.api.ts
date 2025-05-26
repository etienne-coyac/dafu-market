import type { MagasinType } from "../types/magasin";
import type { PanierType } from "../types/panier";
import api from "./services/api";

export const getMagasins = async () => {
  return api.get<MagasinType[]>("/magasins").then((res) => res.data);
};

export const changeCartMagasin = async (idMagasin: number) => {
  return api
    .get<PanierType>(`/clients/convertirPanier?idMagasin=${idMagasin}`)
    .then((res) => res.data);
};
