import type { PanierType } from "./panier";

export const commandeStatusList = [
  "PAYE",
  "A_PREPARER",
  "EN_PREPARATION",
  "PRET",
  "RECEPTIONNE",
];
export type CommandeStatusType = (typeof commandeStatusList)[number];

export type CommandeType = {
  idCommande: number;
  statut: CommandeStatusType;
  dateHeureRetrait: Date;
  panier: PanierType;
};
