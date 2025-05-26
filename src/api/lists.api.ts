import type {
  ListType,
  PostItCreateType,
  PostItReadType,
  PostItUpdateType,
} from "../types/lists";
import api from "./services/api";

export const getLists = async () => {
  return api.get<ListType[]>("/clients/listes").then((res) => res.data);
};

export const updatePostIt = async (id: number, paylaod: PostItUpdateType) => {
  return api
    .patch<PostItReadType>(`/clients/postits/${id}`, paylaod)
    .then((res) => res.data);
};
