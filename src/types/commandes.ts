import type { ProductType } from "./protucts";

export type CommandeType = {
    idCommande: number;
    jourRetrait: Date;
    heureDebRetrait: number;
    statut: string;
    produits: ProductType[];
    montantTotal: number;
    adrLivrClient: string;
    nomClient: number;
};