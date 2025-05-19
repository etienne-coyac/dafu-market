export type ProductType = {
  id: number;
  nom: string;
  stock: number;
  marque: string;
  categories: string[];
  rayons: string[];

  description?: string;
  unite?: string;
  poids?: number;
  nutriscore?: string;
  origine?: string;
  prixRecommande?: number;
  imageUrl?: string;
  labels?: string[];
  prixPropose?: number;
  prixAvecPromo?: number;
  tauxPromo?: number;
  dateDebutPromo?: Date;
  dateFinPromo?: Date;
};
