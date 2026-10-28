/**
 * Mise en page racine, partagée par toutes les pages du site.
 *
 * Toutes les pages sont placées sous le dossier [lang] : l'adresse commence
 * toujours par la langue (/fr, /en, /it, /es, /de). Voir src/i18n/config.ts.
 */
import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import "../globals.css";

// Police des titres : à empattements, élégante et classique.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Police du texte : géométrique, inspirée des années 1920, très lisible.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

/** Pré-génère une version de chaque page pour chaque langue (site plus rapide). */
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Titre, description et versions linguistiques déclarées à Google (balises hreflang). */
export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: dict.meta.title, template: "%s · Passing Shot" },
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${cormorant.variable} ${jost.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
