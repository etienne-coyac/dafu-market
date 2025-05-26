export type MagasinType = {
  idMagasin: number;
  nom: string;
  numero: string;
  adresse: string;
  ville: string;
  cp: string;
  coordonneesGps: string;
  countProduitsProposes: number;
};

export type CheckMagasinsType = {
  message: string;
  stocksMagasins: StockMagasinType[];
};

export type StockMagasinType = {
  magasin: MagasinType;
  panierComplet: boolean;
  nbProduitsCommandables: number;
  nbProduitsVoulus: number;
  nbLignesPanierConformes: number;
  nbLignesProduits: number;
};
