import type { CategoryType } from '../types/categories';
import api from "./services/api";

export const getAllCategoriesPreview = () =>
  api.get<CategoryType[]>("/rayons/categories/preview").then((res) => res.data);