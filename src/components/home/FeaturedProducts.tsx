/** Sélection de produits « coups de cœur » et lien vers toute la boutique. */
import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getFeaturedProducts } from "@/lib/data/catalog";
import { localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function FeaturedProducts() {
  const [dict, locale, products] = await Promise.all([
    getDictionary(),
    getLocale(),
    getFeaturedProducts(),
  ]);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={dict.products.eyebrow} title={dict.products.title} />
          <Link
            href={localizedHref(locale, routes.shop)}
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-label uppercase hover:text-clay-dark"
          >
            {dict.products.viewAll}
            <ArrowRightIcon />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              labels={dict.products}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
