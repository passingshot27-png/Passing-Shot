/**
 * Liste centrale des adresses du site (sans le préfixe de langue).
 * Utiliser ces constantes plutôt que d'écrire les chemins à la main :
 * si une adresse change, il suffit de la modifier ici.
 *
 * Les pages marquées « à venir » ne sont pas encore construites : elles
 * affichent pour l'instant la page « Cette page n'est pas encore prête ».
 */
export const routes = {
  home: "/",
  shop: "/boutique", // à venir — catalogue
  tennis: "/boutique/tennis", // à venir
  padel: "/boutique/padel", // à venir
  badminton: "/boutique/badminton", // à venir
  collection: (slug: string) => `/collections/${slug}`, // à venir
  product: (slug: string) => `/produit/${slug}`, // à venir — fiche produit
  store: "/la-boutique", // à venir — boutique de Suresnes
  story: "/histoire", // à venir
  clubs: "/clubs-et-coachs", // à venir
  account: "/compte", // à venir
  cart: "/panier", // à venir
  legalNotice: "/mentions-legales", // à venir
  terms: "/cgv", // à venir
  privacy: "/confidentialite", // à venir
  cookies: "/cookies", // à venir
} as const;
