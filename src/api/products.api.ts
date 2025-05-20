import type { ProductType } from "../types/protucts";
import api from "./services/api";

export const getProducts = async () => {
  // wait 1 second
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return api.get<ProductType[]>("/produits/").then((res) => res.data);
};
