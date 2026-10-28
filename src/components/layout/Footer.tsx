/** Pied de page : présentation, liens de navigation, informations légales et langues. */
import Link from "next/link";
import { cacheLife } from "next/cache";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getStoreInfo } from "@/lib/data/store";
import { localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { LanguageList } from "./LanguageSwitcher";
import { Logo } from "./Logo";

/** Année en cours pour le copyright, mise en cache (Next.js interdit `new Date()` non mis en cache au rendu). */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const [dict, locale, store, year] = await Promise.all([
    getDictionary(),
    getLocale(),
    getStoreInfo(),
    getCurrentYear(),
  ]);
  const href = (path: string) => localizedHref(locale, path);

  const columns = [
    {
      title: dict.footer.shopTitle,
      links: [
        { label: dict.nav.tennis, href: href(routes.tennis) },
        { label: dict.nav.padel, href: href(routes.padel) },
        { label: dict.nav.badminton, href: href(routes.badminton) },
      ],
    },
    {
      title: dict.footer.houseTitle,
      links: [
        { label: dict.nav.store, href: href(routes.store) },
        { label: dict.nav.story, href: href(routes.story) },
        { label: dict.nav.clubs, href: href(routes.clubs) },
        { label: dict.nav.account, href: href(routes.account) },
      ],
    },
    {
      title: dict.footer.legalTitle,
      links: [
        { label: dict.footer.legalNotice, href: href(routes.legalNotice) },
        { label: dict.footer.terms, href: href(routes.terms) },
        { label: dict.footer.privacy, href: href(routes.privacy) },
        { label: dict.footer.cookies, href: href(routes.cookies) },
      ],
    },
  ];

  return (
    <footer className="mt-auto bg-grass-dark text-ivory/85">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo locale={locale} className="text-ivory" />
            <p className="max-w-xs text-sm leading-relaxed">{dict.footer.tagline}</p>
            <address className="text-sm leading-relaxed not-italic">
              {store.street}
              <br />
              {store.postalCode} {store.city}
              <br />
              <a href={`mailto:${store.email}`} className="underline-offset-4 hover:underline">
                {store.email}
              </a>
            </address>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="mb-5 text-[0.7rem] tracking-label text-clay-light uppercase">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="underline-offset-4 hover:text-ivory hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-ivory/15 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Passing Shot. {dict.footer.rights}
          </p>
          <LanguageList current={locale} tone="light" />
        </div>
      </Container>
    </footer>
  );
}
