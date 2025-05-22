import type { UserType } from "../types/user";
import api from "./services/api";

export const getCurrentClient = () => {
  return api.get<UserType>("/clients/me").then((res) => res.data);
};
