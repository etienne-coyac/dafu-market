export type ListType = {
  idListe: number;
  nom: string;
  idClient: number;
  items: ListItemType[];
  postIts: PostItType[];
};

export type ListItemType = {
  idProduit: number;
  nomProduit: string;
  imageUrl: string;
  quantite: number;
};

export type PostItType = {
  idPost: number;
  titre: string;
  contenu: string;
};
