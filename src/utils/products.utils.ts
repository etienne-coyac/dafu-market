import type { ProductType } from "../types/protucts";

export const getDisplayPrice = (
  product: Pick<
    ProductType,
    "prixAvecPromo" | "prixMagasin" | "tauxPromo" | "prixRecommande"
  >,
  type?: "old",
  defaultPrice: boolean = false
): number => {
  if (
    type === "old" &&
    product.prixMagasin !== undefined &&
    defaultPrice === false
  ) {
    return +product.prixMagasin.toFixed(2);
  }
  if (
    product.tauxPromo !== undefined &&
    product.prixAvecPromo !== undefined &&
    defaultPrice === false
  )
    return +product.prixAvecPromo.toFixed(2);
  if (product.prixMagasin !== undefined) return +product.prixMagasin.toFixed(2);
  return +product.prixRecommande.toFixed(2);
};

export const getNutriscoreColor = (nutriscore: string) => {
  switch (nutriscore) {
    case "A":
      return "#2e7d32";
    case "B":
      return "#bedc39";
    case "C":
      return "#ffeb3b";
    case "D":
      return "#ff9800";
    default:
      return "#f44336";
  }
};
