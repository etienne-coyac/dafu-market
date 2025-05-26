import api from "../services/api";
import type { CategoryType } from "../../types/categories";

export const patchCheckedTrue = (id: number) =>
  api
    .patch<CategoryType>(`admin/preview?idCategorie=${id}&value=true`)
    .then((res) => res.data);

export const patchCheckedFalse = (id: number) =>
  api
    .patch<CategoryType>(`admin/preview?idCategorie=${id}&value=false`)
    .then((res) => res.data);