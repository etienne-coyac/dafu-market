export type SectionType = {
  idRayon: number;
  nomRayon: string;
  categories: CategoryType[];
};

export type CategoryType = {
  idCategorie: number;
  nomCategorie: string;
  rayonDTO: Omit<SectionType, "categories">;
};
