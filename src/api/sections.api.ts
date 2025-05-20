import type { SectionType } from "../types/sections";
import api from "./services/api";

export const getSections = () =>
  api.get<SectionType[]>("/rayons/").then((res) => res.data);
