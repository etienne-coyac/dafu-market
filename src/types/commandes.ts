import type { PanierType } from './panier';

export type CommandeType = {
    idCommande: number;
    statut: string;
    dateHeureRetrait: Date;
    panier: PanierType;
};