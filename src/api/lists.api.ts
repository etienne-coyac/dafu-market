import type { ListType } from "../types/lists";
import api from "./services/api";

export const getLists = async () => {
  return api.get<ListType[]>("/clients/listes").then((res) => res.data);
};
