/** Petits utilitaires de mise en forme, adaptés à la langue du visiteur. */
import type { Locale } from "@/i18n/config";
import type { LocalizedText } from "@/types/catalog";

/** Prix en centimes → texte localisé. Ex. 18900 → « 189,00 € » (fr) ou « €189.00 » (en). */
export function formatPrice(cents: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(cents / 100);
}

/** Choisit la traduction d'un texte dans la langue demandée. */
export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

/** Nom du jour de la semaine (1 = lundi … 7 = dimanche) dans la langue demandée. */
export function weekdayName(day: number, locale: Locale): string {
  // Le 1er janvier 2024 était un lundi : on s'en sert comme repère.
  const date = new Date(Date.UTC(2024, 0, day));
  const name = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(date);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** Construit un lien interne en ajoutant le préfixe de langue. Ex. ("fr", "/boutique") → "/fr/boutique". */
export function localizedHref(locale: Locale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
