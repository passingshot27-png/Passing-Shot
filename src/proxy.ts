/**
 * Proxy Next.js (anciennement « middleware ») : s'exécute avant chaque requête.
 *
 * Rôle : toutes les pages vivent sous un préfixe de langue (/fr, /en…).
 * Si l'adresse demandée n'en a pas (ex. « / » ou « /boutique »), on redirige
 * vers la bonne langue, choisie dans cet ordre :
 *   1. le cookie posé par le sélecteur de langue ;
 *   2. les langues préférées du navigateur (en-tête Accept-Language) ;
 *   3. la langue par défaut (français).
 */
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

/** Choisit la langue à partir de l'en-tête Accept-Language (ex. « it-IT,it;q=0.9,en;q=0.8 »). */
function localeFromAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), weight: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.weight - a.weight);

  for (const { tag } of preferred) {
    // « it-IT » → « it »
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return undefined;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    (cookieLocale && isLocale(cookieLocale) ? cookieLocale : undefined) ??
    localeFromAcceptLanguage(request.headers.get("accept-language")) ??
    defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // On ignore les fichiers internes de Next.js, l'API et les fichiers statiques (avec extension).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
