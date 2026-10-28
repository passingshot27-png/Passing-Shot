/**
 * Types du catalogue.
 *
 * Ils décrivent la forme des données affichées par le site. Aujourd'hui ces
 * données sont fictives (src/lib/data) ; elles viendront ensuite de Supabase,
 * avec les mêmes types.
 */
import type { Locale } from "@/i18n/config";

/** Texte traduit dans chaque langue du site. */
export type LocalizedText = Record<Locale, string>;

export type Sport = "tennis" | "padel" | "badminton";

export type Category = "raquettes" | "balles" | "sacs" | "textile" | "accessoires" | "cosmetique";

export type Product = {
  id: string;
  /** Identifiant lisible utilisé dans l'adresse de la fiche produit. */
  slug: string;
  name: LocalizedText;
  brand: string;
  sport: Sport;
  category: Category;
  /** Prix en centimes d'euro (format attendu par Stripe). Ex. 18900 = 189,00 €. */
  price: number;
  /** Prix barré, en centimes. Absent si le produit n'est pas remisé. */
  compareAtPrice?: number;
  /** Chemin de l'image principale, depuis le dossier `public`. */
  image: string;
  isNew?: boolean;
};

export type Collection = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
};
