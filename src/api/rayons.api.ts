import type { RayonType } from "../types/rayons";
import type { CategoryType } from "../types/sections";
import api from "./services/api";

export const getTousLesRayons = () =>
  api.get<RayonType[]>("/rayons").then((res) => res.data);

export const getAllCategoriesPreview = async () =>
  api.get<CategoryType[]>("/rayons/categories/preview").then((res) => res.data);
