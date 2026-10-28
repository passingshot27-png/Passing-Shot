/** Collections de saison mises en avant (choisies depuis l'admin, à terme). */
import Image from "next/image";
import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getFeaturedCollections } from "@/lib/data/catalog";
import { localize, localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function FeaturedCollections() {
  const [dict, locale, collections] = await Promise.all([
    getDictionary(),
    getLocale(),
    getFeaturedCollections(),
  ]);

  return (
    <section className="bg-sand/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.collections.eyebrow}
          title={dict.collections.title}
          intro={dict.collections.intro}
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={localizedHref(locale, routes.collection(collection.slug))}
              // Décalage vertical de la carte centrale, pour un rythme plus éditorial.
              className={`group block ${index === 1 ? "md:mt-16" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={localize(collection.title, locale)}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 text-3xl">{localize(collection.title, locale)}</h3>
              <p className="mt-2 text-sm text-ink-soft">
                {localize(collection.description, locale)}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] tracking-label text-clay-dark uppercase">
                {dict.collections.discover}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
