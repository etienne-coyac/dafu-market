export type CartType = {
  idPanier: number;
  dateCreation: string;
  idClient: number;
  lignes: CartLineType[];
  totalCost: number;
  totalSansPromo: number;
  totalPromos: number;
};

export type CartLineType = {
  idProduit: number;
  idMagasin: number;
  nomProduit: string;
  imageUrl: string;
  prixMagasin: number;
  quantite: number;
  tauxPromo: number;
  prixAvecPromo: number;
};
