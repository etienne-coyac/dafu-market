import type {
  ListType,
  LLMResponseType,
  PostItCreateType,
  PostItReadType,
  PostItUpdateType,
} from "../types/lists";
import api from "./services/api";

export const getLists = async () => {
  return api.get<ListType[]>("/clients/listes").then((res) => res.data);
};

export const createPostIt = async (
  idListe: number,
  payload: Omit<PostItCreateType, "contenu"> & { saisie: string }
) => {
  return api
    .post<PostItReadType>(`/clients/postits/${idListe}`, payload)
    .then((res) => res.data);
};

export const updatePostIt = async (id: number, paylaod: PostItUpdateType) => {
  return api
    .patch<PostItReadType>(`/clients/postits/${id}`, paylaod)
    .then((res) => res.data);
};

export const requestLLM = async (idPost: number) => {
  return api
    .get<LLMResponseType>(`/clients/postits/${idPost}/llm`)
    .then((res) => res.data);
};

export const deletePostIt = async (id: number) => {
  return api.delete(`/clients/postits/${id}`);
};

export const createList = async (titreListe: string) => {
  return api
    .post<ListType>("/clients/listes", { titreListe })
    .then((res) => res.data);
};
