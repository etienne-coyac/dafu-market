import type { ProductType } from "./protucts";

export type CommandeType = {
    idCommande: number;
    date: Date;
    statut: string;
    produits: ProductType[];
    montantTotal: number;
    adresseLivraison: string;
    clientId: number;
};