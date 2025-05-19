import type { ProductType } from "../types/protucts";
import api from "./services/api";

export const getProducts = () =>
  api.get<ProductType[]>("/produits/").then((res) => res.data);
