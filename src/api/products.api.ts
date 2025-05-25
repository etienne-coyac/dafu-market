import type { ProductType } from "../types/protucts";
import api from "./services/api";

export const getProductsBySection = async (
  idRayon: number,
  idMagasin?: number
) => {
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  const path = idMagasin
    ? `/magasins/${idMagasin}/produits/rayon/${idRayon}`
    : `/produits/rayon/${idRayon}`;
  return api.get<ProductType[]>(path).then((res) => res.data);
};

export const getProductByCategory = async (
  idCategorie: number,
  idMagasin?: number
) => {
  const path = idMagasin
    ? `/magasins/${idMagasin}/produits/categorie/${idCategorie}`
    : `/produits/categorie/${idCategorie}`;
  return api.get<ProductType[]>(path).then((res) => res.data);
};

export const getProductById = async (id: number, idMagasin?: number) => {
  const path = idMagasin
    ? `/magasins/${idMagasin}/produits/${id}`
    : `/produits/${id}`;

  return api.get<ProductType>(path).then((res) => res.data);
};

export const getProductsSearch = async (search: string, limit: number = 6) => {
  return api
    .get<ProductType[]>(`/produits/search?search=${search}&limit=${limit}`)
    .then((res) => res.data);
};
