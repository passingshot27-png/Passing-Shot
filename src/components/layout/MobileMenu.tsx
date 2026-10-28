"use client";

/**
 * Menu de navigation plein écran pour mobile et tablette (masqué sur grand écran).
 * Le panneau est rendu directement dans <body> (portail) : l'en-tête a un effet de flou
 * (backdrop-blur) qui empêcherait sinon le panneau de couvrir tout l'écran.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { LanguageList } from "./LanguageSwitcher";
import type { NavItem } from "./Header";

export function MobileMenu({
  items,
  locale,
  labels,
}: {
  items: NavItem[];
  locale: Locale;
  labels: { open: string; close: string; language: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Referme le menu à chaque changement de page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Empêche la page de défiler derrière le menu ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.open}
        aria-expanded={open}
        className="-ml-1 p-1"
      >
        <MenuIcon />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex flex-col bg-cream px-5 py-5 sm:px-8">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={labels.close}
                className="p-1"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="mt-6 flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-3 font-serif text-3xl"
                    >
                      {item.label}
                      {item.badge && (
                        <span className="font-sans text-[0.65rem] tracking-label text-clay-dark uppercase">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-line pt-5 text-sm">
              <p className="mb-3 text-[0.7rem] tracking-label text-ink-soft uppercase">
                {labels.language}
              </p>
              <LanguageList current={locale} />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
