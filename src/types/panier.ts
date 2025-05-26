import type { ProductType } from "./protucts";

export type PanierType = {
  idPanier: number;
  dateCreation: Date;
  idClient: number;
  totalCost: number;
  totalSansPromo: number;
  totalPromo: number;
  lignes: (ProductType & { quantite: number })[];
};
