import type { ProductType } from "../types/protucts";
import api from "./services/api";

export const getProducts = () =>
  api.get<ProductType[]>("/api/propositions/1/2").then((res) => res.data);
