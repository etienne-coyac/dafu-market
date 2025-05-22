import type { ProductType } from "../types/protucts";
import api from "./services/api";

export const getProductsBySection = async (idRayon: number) => {
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  return api
    .get<ProductType[]>(`/produits/rayon/${idRayon}`)
    .then((res) => res.data);
};

export const getProductByCategory = async (idCategorie: number) => {
  return api
    .get<ProductType[]>(`/produits/categorie/${idCategorie}`)
    .then((res) => res.data);
};

export const getProductById = async (id: number) => {
  return api
    .get<ProductType>(`/produits/${id}`)
    .then((res) => res.data);
};