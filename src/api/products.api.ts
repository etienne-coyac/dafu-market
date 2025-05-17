import api from "./services/api";

export const getProducts = () => api.get("/products");
