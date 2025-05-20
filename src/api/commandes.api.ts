import type { CommandeType } from "../types/commandes";
import api from "./services/api";

export const getSections = () =>
    api.get<CommandeType[]>("/commandes/").then((res) => res.data);
