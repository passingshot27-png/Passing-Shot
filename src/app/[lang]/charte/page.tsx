/**
 * Page interne « Charte graphique » (/fr/charte).
 * Référence visuelle pour le prestataire : couleurs, typographies, boutons.
 * Elle n'apparaît dans aucun menu et n'est pas indexée par les moteurs de recherche.
 */
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.charte.title, robots: { index: false, follow: false } };
}

// Doit rester synchronisé avec le bloc @theme de src/app/globals.css.
const palette = [
  { group: "Fonds", colors: ["ivory", "cream", "sand", "line"] },
  { group: "Texte", colors: ["ink", "ink-soft"] },
  { group: "Terre battue", colors: ["clay-light", "clay", "clay-dark"] },
  { group: "Vert Wimbledon", colors: ["grass-light", "grass", "grass-dark"] },
  { group: "Bleu profond", colors: ["navy-light", "navy"] },
];

export default async function ChartePage() {
  const dict = await getDictionary();

  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Passing Shot" title={dict.charte.title} intro={dict.charte.intro} />

      <section className="mt-16">
        <h2 className="text-3xl">Couleurs</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map(({ group, colors }) => (
            <div key={group}>
              <p className="mb-3 text-[0.7rem] tracking-label text-ink-soft uppercase">{group}</p>
              <ul className="flex flex-col gap-2">
                {colors.map((color) => (
                  <li key={color} className="flex items-center gap-3 text-sm">
                    <span
                      className="size-10 border border-line"
                      style={{ backgroundColor: `var(--color-${color})` }}
                    />
                    <code>{color}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl">Typographies</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-[0.7rem] tracking-label text-ink-soft uppercase">
              Titres — Cormorant Garamond (font-serif)
            </p>
            <p className="font-serif text-6xl">Jeu, set et match</p>
            <p className="mt-2 font-serif text-3xl italic">L&apos;élégance du jeu</p>
          </div>
          <div>
            <p className="mb-3 text-[0.7rem] tracking-label text-ink-soft uppercase">
              Texte — Jost (font-sans)
            </p>
            <p className="leading-relaxed">
              Raquettes, balles, sacs, textile et accessoires. Une sélection de saison des plus
              belles marques, au meilleur rapport qualité-prix.
            </p>
            <p className="mt-4 text-[0.7rem] tracking-label text-clay-dark uppercase">
              Étiquette — capitales espacées
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl">Boutons</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="#" variant="primary">
            primary
          </ButtonLink>
          <ButtonLink href="#" variant="accent">
            accent
          </ButtonLink>
          <ButtonLink href="#" variant="outline">
            outline
          </ButtonLink>
          <span className="bg-navy p-4">
            <ButtonLink href="#" variant="light">
              light
            </ButtonLink>
          </span>
        </div>
      </section>
    </Container>
  );
}
