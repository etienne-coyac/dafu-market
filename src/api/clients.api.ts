import type { ClientType } from "../types/clients";
import type { UserType } from "../types/user";
import api from "./services/api";

export const getClientById = async (id: number) => {
  return api.get<ClientType>(`/clients/${id}`).then((res) => res.data);
};
export const getCurrentClient = () => {
  return api.get<UserType>("/clients/me").then((res) => res.data);
};
