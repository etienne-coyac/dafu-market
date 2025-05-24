import type { CategoryType } from "./sections";

export type ProductType = {
  idProduit: number;
  nom: string;
  marque: string;
  categories: CategoryType[];
  rayons: string[];
  prixRecommande: number;

  description?: string;
  unite?: string;
  poids?: number;
  nutriscore?: string;
  origine?: string;
  imageUrl?: string;
  labels?: string[];
  dateDebutPromo?: Date;
  dateFinPromo?: Date;

  // proposition produit
} & (
  | {
      idMagasin: number;
      prixMagasin: number;
      tauxPromo?: number;
      prixAvecPromo?: number;
      stockDispo: number;
    }
  | {
      idMagasin?: never;
      prixMagasin?: never;
      tauxPromo?: never;
      prixAvecPromo?: never;
      stockDispo?: never;
    }
);
