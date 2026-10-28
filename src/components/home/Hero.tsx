/** Grande image d'ambiance en ouverture de l'accueil, avec accroche et deux appels à l'action. */
import Image from "next/image";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

// Image PROVISOIRE : à remplacer par une photo du shooting Passing Shot (format paysage, ≥ 2400 px de large).
const HERO_IMAGE = "/images/placeholder/hero.svg";

export async function Hero() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-clay lg:min-h-[86svh]">
      <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
      {/* Voile dégradé pour garantir la lisibilité du texte sur la photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />

      <Container className="relative pt-32 pb-14 sm:pb-20">
        <div className="max-w-2xl text-ivory">
          <p className="text-[0.7rem] tracking-label text-clay-light uppercase">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85 sm:text-lg">
            {dict.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={localizedHref(locale, routes.shop)} variant="accent">
              {dict.hero.ctaShop}
            </ButtonLink>
            <ButtonLink href={localizedHref(locale, routes.store)} variant="light">
              {dict.hero.ctaStore}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
