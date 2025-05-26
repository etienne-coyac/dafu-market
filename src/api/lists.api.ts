import type {
  ListType,
  LLMResponseType,
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

export const requestLLM = async (idPost: number) => {
  return api
    .get<LLMResponseType>(`/clients/postits/${idPost}/llm`)
    .then((res) => res.data);
};
