import type { CommandeType } from "../types/commandes";
import api from "./services/api";

// #region Préparateur
export const getCommandes = () =>
  api.get<CommandeType>("preparateurs/commandes").then((res) => res.data);

export const getCommandesNow = () =>
  api
    .get<CommandeType>("preparateurs/commandes?dueDate=true")
    .then((res) => res.data);

export const patchCommandeStart = (id: string) =>
  api
    .patch<CommandeType>(`preparateurs/commandes/${id}?statut=start`)
    .then((res) => res.data);

export const patchCommandeEnd = (id: string) =>
  api
    .patch<CommandeType>(`preparateurs/commandes/${id}?statut=end`)
    .then((res) => res.data);

// #endregion

// #region Client

export const getCommandesClient = () =>
  api.get<CommandeType[]>("clients/commandes").then((res) => res.data);

// #endregion
