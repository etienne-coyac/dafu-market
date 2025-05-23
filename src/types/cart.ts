export type CartType = {
  idPanier: number;
  dateCreation: string;
  idClient: number;
  lignes: CartLineType[];
  coutTotal: number;
  coutTotalSansPromo: number;
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
