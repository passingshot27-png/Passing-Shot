/**
 * Bandeau des marques partenaires.
 * Les noms sont écrits en texte pour l'instant ; on pourra les remplacer par
 * les logos officiels (en version monochrome, pour rester sobre) si les marques l'autorisent.
 */
import { getDictionary } from "@/i18n/dictionaries";
import { getBrands } from "@/lib/data/catalog";
import { Container } from "@/components/ui/Container";

export async function BrandStrip() {
  const [dict, brands] = await Promise.all([getDictionary(), getBrands()]);

  return (
    <section className="border-b border-line">
      <Container className="flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <p className="text-[0.7rem] tracking-label text-ink-soft uppercase">{dict.brands.title}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
          {brands.map((brand) => (
            <li key={brand} className="font-serif text-2xl tracking-[0.12em] text-ink/75 uppercase">
              {brand}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
