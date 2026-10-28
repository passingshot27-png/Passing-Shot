/**
 * En-tête du site : bandeau d'information, navigation, logo, langue, compte et panier.
 * Composant serveur ; seuls le menu mobile et le sélecteur de langue sont interactifs.
 */
import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { AccountIcon, BagIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export type NavItem = { label: string; href: string; badge?: string };

const navLinkClass =
  "whitespace-nowrap text-[0.7rem] tracking-[0.16em] uppercase transition-colors hover:text-clay-dark";

export async function Header() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const href = (path: string) => localizedHref(locale, path);

  // Navigation par sport (à gauche du logo sur ordinateur).
  const sportItems: NavItem[] = [
    { label: dict.nav.tennis, href: href(routes.tennis) },
    { label: dict.nav.padel, href: href(routes.padel) },
    { label: dict.nav.badminton, href: href(routes.badminton), badge: dict.nav.soon },
  ];
  // Pages de la maison (à droite du logo sur ordinateur).
  const houseItems: NavItem[] = [
    { label: dict.nav.store, href: href(routes.store) },
    { label: dict.nav.story, href: href(routes.story) },
    { label: dict.nav.clubs, href: href(routes.clubs) },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <p className="bg-grass px-4 py-2 text-center text-[0.68rem] tracking-[0.16em] text-ivory uppercase">
        {dict.announcement}
      </p>

      <Container>
        <div className="grid h-18 grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Gauche : menu mobile ou navigation par sport */}
          <div className="flex items-center">
            <MobileMenu
              items={[
                { label: dict.nav.shop, href: href(routes.shop) },
                ...sportItems,
                ...houseItems,
              ]}
              locale={locale}
              labels={{
                open: dict.nav.openMenu,
                close: dict.nav.closeMenu,
                language: dict.nav.language,
              }}
            />
            <nav className="hidden xl:block" aria-label={dict.nav.shop}>
              <ul className="flex items-center gap-6">
                {sportItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={navLinkClass}>
                      {item.label}
                      {item.badge && (
                        <sup className="ml-1 text-[0.55rem] text-clay-dark">{item.badge}</sup>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Centre : logo */}
          <Logo locale={locale} className="justify-self-center" />

          {/* Droite : pages, langue, compte, panier */}
          <div className="flex items-center justify-end gap-5">
            <nav className="hidden xl:block" aria-label="Passing Shot">
              <ul className="flex items-center gap-6">
                {houseItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={navLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hidden xl:block">
              <LanguageSwitcher current={locale} label={dict.nav.language} />
            </div>
            <Link
              href={href(routes.account)}
              aria-label={dict.nav.account}
              className="hidden hover:text-clay-dark sm:block"
            >
              <AccountIcon />
            </Link>
            {/* Le nombre d'articles s'affichera ici une fois le panier branché. */}
            <Link
              href={href(routes.cart)}
              aria-label={dict.nav.cart}
              className="hover:text-clay-dark"
            >
              <BagIcon />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
