import type { ProductType } from "../types/protucts";

export const getDisplayPrice = (product: ProductType, type?: "old") => {
  if (type === "old" && product.prixMagasin !== undefined) {
    return product.prixMagasin.toFixed(2);
  }
  if (product.tauxPromo !== undefined && product.prixAvecPromo !== undefined)
    return product.prixAvecPromo.toFixed(2);
  if (product.prixMagasin !== undefined)
    return product.prixMagasin.toFixed(2);
  return product.prixRecommande.toFixed(2);
};
