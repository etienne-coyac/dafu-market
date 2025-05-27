import type { StatsType } from "../types/stats";
import api from "./services/api";

export const getStats = () => {
  return api.get<StatsType[]>("/admin/avgcommandes").then((res) => res.data);
};
