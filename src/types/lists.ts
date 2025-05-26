import * as z from "zod";
import type { postitSchema } from "../schemas/postit.schema";

export type ListType = {
  idListe: number;
  nom: string;
  idClient: number;
  items: ListItemType[];
  postIts: PostItReadType[];
};

export type ListItemType = {
  idProduit: number;
  nomProduit: string;
  imageUrl: string;
  quantite: number;
};

export type PostItUpdateType = {
  saisie: string;
};

export type PostItCreateType = z.infer<typeof postitSchema>;

export type PostItReadType = PostItCreateType & {
  idPost: number;
  reponseLLM: string | null;
};

export type LLMResponseType = {
  postit: PostItReadType;
  liste: Omit<ListType, "postIts">;
};
