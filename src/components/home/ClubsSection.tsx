/** Encart « Clubs et coachs », dans un double cadre inspiré des affiches de tournoi. */
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export async function ClubsSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="border border-clay p-2">
          <div className="flex flex-col items-center border border-clay/50 px-6 py-14 text-center sm:px-16 sm:py-20">
            <Eyebrow>{dict.clubs.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-4xl leading-tight sm:text-5xl">
              {dict.clubs.title}
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">{dict.clubs.text}</p>
            <ButtonLink
              href={localizedHref(locale, routes.clubs)}
              variant="primary"
              className="mt-10"
            >
              {dict.clubs.cta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
