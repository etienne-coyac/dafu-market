import type { CommandeType } from "../types/commandes";
import api from "./services/api";

export const getCommandes = () =>
    api.get<CommandeType>("preparateurs/commandes").then((res) => res.data);

export const getCommandesNow = () =>
    api.get<CommandeType>("preparateurs/commandes?dueDate=true").then((res) => res.data);
