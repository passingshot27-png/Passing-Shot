/**
 * Accès au catalogue par sport : trois tuiles colorées dont le cadre évoque
 * les lignes d'un court. Le badminton est affiché « bientôt disponible ».
 */
import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function SportsSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  const sports = [
    {
      name: dict.nav.tennis,
      text: dict.sports.tennis,
      href: routes.tennis,
      color: "bg-clay",
      available: true,
    },
    {
      name: dict.nav.padel,
      text: dict.sports.padel,
      href: routes.padel,
      color: "bg-navy",
      available: true,
    },
    {
      name: dict.nav.badminton,
      text: dict.sports.badminton,
      href: routes.badminton,
      color: "bg-grass",
      available: false,
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.sports.eyebrow} title={dict.sports.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {sports.map((sport) => (
            <Link
              key={sport.href}
              href={localizedHref(locale, sport.href)}
              className={`group relative flex aspect-[4/5] flex-col justify-between p-5 text-ivory sm:aspect-[5/4] md:aspect-[3/4] ${sport.color}`}
            >
              {/* Lignes de court décoratives */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-5 border border-ivory/40"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-5 top-1/2 border-t border-ivory/40"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-[30%] left-1/2 border-l border-ivory/25"
              />

              <div className="relative p-5">
                {!sport.available && (
                  <span className="bg-ivory px-3 py-1 text-[0.65rem] tracking-label text-grass uppercase">
                    {dict.sports.comingSoon}
                  </span>
                )}
              </div>
              <div className="relative bg-gradient-to-t from-black/10 to-transparent p-5">
                <h3 className="text-5xl">{sport.name}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/85">{sport.text}</p>
                {sport.available && (
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.7rem] tracking-label uppercase">
                    {dict.sports.explore}
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
