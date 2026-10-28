/** Storytelling de la marque : texte, trois piliers et lien vers la page « L'histoire ». */
import Image from "next/image";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

// Image PROVISOIRE : à remplacer par une photo de l'univers Passing Shot (format portrait).
const STORY_IMAGE = "/images/placeholder/histoire.svg";

export async function StorySection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[5/6] overflow-hidden">
          <Image
            src={STORY_IMAGE}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <Eyebrow>{dict.story.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{dict.story.title}</h2>
          <div className="mt-6 flex flex-col gap-4 leading-relaxed text-ink-soft">
            {dict.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ol className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {dict.story.pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <span className="font-serif text-2xl text-clay">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl">{pillar.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{pillar.text}</p>
              </li>
            ))}
          </ol>

          <ButtonLink
            href={localizedHref(locale, routes.story)}
            variant="outline"
            className="mt-10"
          >
            {dict.story.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
