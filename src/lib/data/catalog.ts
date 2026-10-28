/**
 * Accès aux données du catalogue.
 *
 * ⚠️ DONNÉES PROVISOIRES. Ces fonctions renvoient des exemples écrits en dur
 * pour construire et valider le design. À l'étape « base de données », seul
 * le contenu de ces fonctions sera remplacé par des requêtes Supabase :
 * leurs noms et ce qu'elles renvoient (types de src/types) ne changeront pas,
 * donc les pages qui les utilisent n'auront pas à être modifiées.
 */
import type { Collection, Product } from "@/types/catalog";

/** Marques partenaires affichées sur l'accueil. */
const BRANDS = ["Babolat", "Head", "Wilson", "Yonex"];

const COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    slug: "heritage-gazon",
    title: {
      fr: "Héritage gazon",
      en: "Grass heritage",
      it: "Eredità erba",
      es: "Herencia hierba",
      de: "Rasen-Erbe",
    },
    description: {
      fr: "Le blanc du club, les lignes d'autrefois.",
      en: "Club whites and timeless lines.",
      it: "Il bianco del club, le linee di una volta.",
      es: "El blanco del club, las líneas de siempre.",
      de: "Clubweiß und zeitlose Linien.",
    },
    image: "/images/placeholder/collection-gazon.svg",
  },
  {
    id: "col-2",
    slug: "terre-battue",
    title: {
      fr: "Terre battue",
      en: "Clay court",
      it: "Terra battuta",
      es: "Tierra batida",
      de: "Sandplatz",
    },
    description: {
      fr: "L'ocre de Paris, pour les longs échanges.",
      en: "Parisian ochre, built for long rallies.",
      it: "L'ocra di Parigi, per i lunghi scambi.",
      es: "El ocre de París, para los largos intercambios.",
      de: "Pariser Ocker für lange Ballwechsel.",
    },
    image: "/images/placeholder/collection-terre.svg",
  },
  {
    id: "col-3",
    slug: "padel-nocturne",
    title: {
      fr: "Padel nocturne",
      en: "Padel by night",
      it: "Padel notturno",
      es: "Pádel nocturno",
      de: "Padel bei Nacht",
    },
    description: {
      fr: "Bleu profond et matières techniques.",
      en: "Deep blue and technical fabrics.",
      it: "Blu profondo e materiali tecnici.",
      es: "Azul profundo y tejidos técnicos.",
      de: "Tiefblau und technische Materialien.",
    },
    image: "/images/placeholder/collection-padel.svg",
  },
];

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "babolat-pure-drive",
    name: {
      fr: "Raquette Pure Drive",
      en: "Pure Drive racket",
      it: "Racchetta Pure Drive",
      es: "Raqueta Pure Drive",
      de: "Schläger Pure Drive",
    },
    brand: "Babolat",
    sport: "tennis",
    category: "raquettes",
    price: 19900,
    compareAtPrice: 23900,
    image: "/images/placeholder/product-raquette.svg",
  },
  {
    id: "prod-2",
    slug: "head-padel-alpha",
    name: {
      fr: "Pala de padel Alpha",
      en: "Alpha padel racket",
      it: "Pala da padel Alpha",
      es: "Pala de pádel Alpha",
      de: "Padelschläger Alpha",
    },
    brand: "Head",
    sport: "padel",
    category: "raquettes",
    price: 15900,
    image: "/images/placeholder/product-padel.svg",
    isNew: true,
  },
  {
    id: "prod-3",
    slug: "wilson-polo-club",
    name: {
      fr: "Polo Club en piqué",
      en: "Piqué club polo",
      it: "Polo Club in piqué",
      es: "Polo Club de piqué",
      de: "Club-Polo aus Piqué",
    },
    brand: "Wilson",
    sport: "tennis",
    category: "textile",
    price: 6500,
    image: "/images/placeholder/product-polo.svg",
    isNew: true,
  },
  {
    id: "prod-4",
    slug: "yonex-sac-12-raquettes",
    name: {
      fr: "Sac thermo 12 raquettes",
      en: "12-racket thermo bag",
      it: "Borsa termica 12 racchette",
      es: "Bolsa térmica 12 raquetas",
      de: "Thermotasche für 12 Schläger",
    },
    brand: "Yonex",
    sport: "tennis",
    category: "sacs",
    price: 11900,
    image: "/images/placeholder/product-sac.svg",
  },
];

/** Marques partenaires. */
export async function getBrands(): Promise<string[]> {
  return BRANDS;
}

/** Collections de saison mises en avant sur l'accueil. */
export async function getFeaturedCollections(): Promise<Collection[]> {
  return COLLECTIONS;
}

/** Produits mis en avant sur l'accueil. */
export async function getFeaturedProducts(): Promise<Product[]> {
  return PRODUCTS;
}
