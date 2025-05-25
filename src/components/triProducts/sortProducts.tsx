import type { ProductType } from "../../types/protucts";

const sortProducts = (
    products: ProductType[],
    criterion: string
): ProductType[] => {
    switch (criterion) {
        case "pertinence":
            // Provide a compare function; here, we keep the original order (no sorting)
            return [...products].sort(() => 0);
        case "prix-asc":
            return [...products].sort(
                (a: ProductType, b: ProductType) => {
                    const diff = (a.prixRecommande ?? 0) - (b.prixRecommande ?? 0);
                    console.log(diff);
                    return diff;
                }
            );
        case "prix-desc":
            return [...products].sort(
                (a: ProductType, b: ProductType) => (b.prixRecommande ?? 0) - (a.prixRecommande ?? 0)
            );
        case "prixPoids-asc":
            return [...products].sort(
                (a: ProductType, b: ProductType) => {
                    const aValue: number = (a.prixRecommande !== undefined && a.poids !== undefined && a.poids !== 0)
                        ? a.prixRecommande / a.poids
                        : 0;
                    const bValue: number = (b.prixRecommande !== undefined && b.poids !== undefined && b.poids !== 0)
                        ? b.prixRecommande / b.poids
                        : 0;
                    return aValue - bValue;
                }
            );
        case "prixPoids-desc":
            return [...products].sort(
                (a: ProductType, b: ProductType) => {
                    const aValue: number = (a.prixRecommande !== undefined && a.poids !== undefined && a.poids !== 0)
                        ? a.prixRecommande / a.poids
                        : 0;
                    const bValue: number = (b.prixRecommande !== undefined && b.poids !== undefined && b.poids !== 0)
                        ? b.prixRecommande / b.poids
                        : 0;
                    return bValue - aValue;
                }
            );
        case "disponibilite":
            return [...products].sort(() => 0);
        case "popularite":
            return [...products].sort(() => 0);
        default:
            return products;
    }
};

export default sortProducts;