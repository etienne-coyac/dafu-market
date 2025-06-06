# DAFU Market

Repo backend : https://github.com/KlerviLMTR/dafumarket

---

L'objectif de ce projet est de proposer un site web de drive. 

Il s'agit d'une application avec 3 aspects : 
- Une application client (propositions de produits)
- Une application de gestion (destinée au manager du magasin)
- Une application pour les préparateurs de commandes

Compte tenu du temps imparti pour ce projet (~7/8 jours), nous avons fait le choix de prioriser l'application client, afin d'apporter le maximum de valeur ajoutée. Les applications manager et préparateur sont fonctionnelles, mais pas prêtes pour un déploiement en production (manque de features, design à revoir, ...). 

### Stack
- React (+TypeScript)
- Material UI
- @tanstack/react-query (cache personnalisé + data store)
- Packages utilitaires (react-hook-form, react-router, zod, ...)

L'application a été construite pour être extensible. Chaque composant, hook, fonction ou définition est placé dans une arborescence de fichiers claire et stricte. 

### Features supplémentaires 
- Intégration d'un LLM pour proposer des produits en fonction d'une recette (avec ajout automatique au panier)

---

# Images extraites de l'application
![pageAccueil](https://github.com/user-attachments/assets/714e7714-d2eb-45b8-a95e-46b9f9bc98ed)
![menu](https://github.com/user-attachments/assets/aa4b66ad-a766-49d2-bc35-b073eac778ce)
![listeProduits](https://github.com/user-attachments/assets/b3454d8e-c2dc-4653-87d1-1a99d9e64db4)
![panier](https://github.com/user-attachments/assets/7595e193-0fd0-4d73-bd87-2a4ce2e9bdc5)



