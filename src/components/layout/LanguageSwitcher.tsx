"use client";

/**
 * Sélecteur de langue.
 * Garde la même page et change seulement le préfixe de langue de l'adresse
 * (/fr/boutique → /en/boutique), puis mémorise le choix dans un cookie lu par
 * src/proxy.ts lors des visites suivantes.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/i18n/config";
import { ChevronDownIcon } from "@/components/ui/Icons";

/** Remplace le préfixe de langue d'une adresse. */
function swapLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

function rememberLocale(locale: Locale) {
  // Cookie valable un an, pour tout le site.
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** Version liste, utilisée dans le menu mobile (ton sombre) et le pied de page (ton clair). */
export function LanguageList({
  current,
  tone = "dark",
}: {
  current: Locale;
  tone?: "dark" | "light";
}) {
  const pathname = usePathname();
  const colors =
    tone === "dark"
      ? { active: "text-clay-dark", idle: "text-ink-soft hover:text-ink" }
      : { active: "text-clay-light", idle: "text-ivory/70 hover:text-ivory" };
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            onClick={() => rememberLocale(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={locale === current ? colors.active : colors.idle}
          >
            {localeNames[locale]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Version menu déroulant, utilisée dans l'en-tête sur ordinateur. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu au clic à l'extérieur ou avec la touche Échap.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${label} : ${localeNames[current]}`}
        className="flex items-center gap-1 text-xs tracking-label uppercase hover:text-clay-dark"
      >
        {current}
        <ChevronDownIcon />
      </button>
      {open && (
        <ul className="absolute right-0 z-50 mt-3 min-w-36 border border-line bg-ivory py-2 shadow-sm">
          {locales.map((locale) => (
            <li key={locale}>
              <Link
                href={swapLocale(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                onClick={() => {
                  rememberLocale(locale);
                  setOpen(false);
                }}
                aria-current={locale === current ? "true" : undefined}
                className={`block px-4 py-2 text-sm hover:bg-sand ${locale === current ? "text-clay-dark" : ""}`}
              >
                {localeNames[locale]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
