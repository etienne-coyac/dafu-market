import type { ClientType } from "../types/clients";
import api from "./services/api";

export const getClientById = async (id: number) => {
    return api
        .get<ClientType>(`/clients/${id}`)
        .then((res) => res.data);
}