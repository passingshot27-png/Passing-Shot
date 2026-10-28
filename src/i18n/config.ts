/**
 * Configuration des langues du site.
 *
 * Pour ajouter une langue :
 *   1. ajouter son code dans `locales` et son nom dans `localeNames` ;
 *   2. créer le fichier `src/i18n/dictionaries/<code>.json` (copie de fr.json, traduite) ;
 *   3. le déclarer dans `src/i18n/dictionaries.ts`.
 * TypeScript signale toute clé de traduction manquante au moment du build.
 *
 * Ce fichier ne dépend d'aucune API serveur : il peut être importé partout
 * (proxy, composants serveur et composants client).
 */

export const locales = ["fr", "en", "it", "es", "de"] as const;

export type Locale = (typeof locales)[number];

/** Langue utilisée quand aucune préférence n'est détectée. */
export const defaultLocale: Locale = "fr";

/** Nom de chaque langue, écrit dans cette langue (affiché dans le sélecteur). */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  it: "Italiano",
  es: "Español",
  de: "Deutsch",
};

/**
 * Cookie qui mémorise la langue choisie par le visiteur.
 * Lu par `src/proxy.ts`, écrit par le sélecteur de langue.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
