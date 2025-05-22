import type { MagasinType } from "../types/magasin";
import api from "./services/api";

export const getMagasins = async () => {
    return api.get<MagasinType[]>("/magasins").then((res) => res.data);
}