/**
 * Chargement des traductions (« dictionnaires ») côté serveur.
 *
 * Le français (fr.json) est la référence : son contenu définit le type `Dictionary`.
 * Si une autre langue oublie une clé, TypeScript refuse de compiler.
 *
 * Usage dans un composant serveur :
 *   const dict = await getDictionary();
 *   <h1>{dict.hero.title}</h1>
 */
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale, type Locale } from "./config";
import type fr from "./dictionaries/fr.json";

export type Dictionary = typeof fr;

// Chaque langue est chargée à la demande : seule celle de la page est lue.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  it: () => import("./dictionaries/it.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
};

/**
 * Langue de la page en cours, lue depuis l'adresse (/fr, /en…).
 * Renvoie une page 404 si la langue n'existe pas.
 */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return locale;
}

/** Traductions de la langue de la page en cours. */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
