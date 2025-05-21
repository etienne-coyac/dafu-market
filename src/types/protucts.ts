import type { CategoryType } from "./sections";

export type ProductType = {
  idProduit: number;
  nom: string;
  stock: number;
  marque: string;
  categories: CategoryType[];
  rayons: string[];
  prixPropose: number;

  description?: string;
  unite?: string;
  poids?: number;
  nutriscore?: string;
  origine?: string;
  prixRecommande?: number;
  imageUrl?: string;
  labels?: string[];
  prixAvecPromo?: number;
  tauxPromo?: number;
  dateDebutPromo?: Date;
  dateFinPromo?: Date;
};
