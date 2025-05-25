import type { ProductType } from "../../types/protucts";
import { getDisplayPrice } from "../../utils/products.utils";

const sortProducts = (
    products: ProductType[],
    criterion: string
): ProductType[] => {
    switch (criterion) {
        case "pertinence":
            return [...products];
        case "prix-asc":
            return [...products].sort(
                (a, b) => Number(getDisplayPrice(a)) - Number(getDisplayPrice(b))
            );
        case "prix-desc":
            return [...products].sort(
                (a, b) => Number(getDisplayPrice(b)) - Number(getDisplayPrice(a))
            );
        case "prixPoids-asc":
            return [...products].sort((a, b) => {
                const aValue = a.poids ? Number(getDisplayPrice(a)) / a.poids : Infinity;
                const bValue = b.poids ? Number(getDisplayPrice(b)) / b.poids : Infinity;
                return aValue - bValue;
            });
        case "prixPoids-desc":
            return [...products].sort((a, b) => {
                const aValue = a.poids ? Number(getDisplayPrice(a)) / a.poids : 0;
                const bValue = b.poids ? Number(getDisplayPrice(b)) / b.poids : 0;
                return bValue - aValue;
            });
        case "disponibilite":
        case "popularite":
        default:
            return [...products];
    }
};

export default sortProducts;