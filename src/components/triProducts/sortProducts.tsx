import type { ProductType } from "../../types/protucts";
import { getDisplayPrice } from "../../utils/products.utils";

const sortProducts = (
    products: ProductType[],
    criterion: string,
    idMagasin?: string
): ProductType[] => {
    switch (criterion) {
        case "prix-asc":
            return [...products].sort(
                (a, b) => Number(getDisplayPrice(a)) - Number(getDisplayPrice(b))
            );
        case "prix-desc":
            return [...products].sort(
                (a, b) => Number(getDisplayPrice(b)) - Number(getDisplayPrice(a))
            );
        case "disponibilite":
            return [...products].sort((a, b) => {
                if (!idMagasin) return 0;
                const dispoA = a.stockDispo && a.stockDispo > 0 ? 1 : 0;
                const dispoB = b.stockDispo && b.stockDispo > 0 ? 1 : 0;
                return dispoB - dispoA;
            });
        default:
            return [...products];
    }
};

export default sortProducts;