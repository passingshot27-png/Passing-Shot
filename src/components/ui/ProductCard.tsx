import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { formatPrice, localize, localizedHref } from "@/lib/format";
import { routes } from "@/lib/routes";
import type { Product } from "@/types/catalog";

/** Carte produit : image, marque, nom et prix (avec prix barré éventuel). */
export function ProductCard({
  product,
  locale,
  labels,
}: {
  product: Product;
  locale: Locale;
  labels: { new: string; priceBefore: string };
}) {
  return (
    <Link href={localizedHref(locale, routes.product(product.slug))} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={product.image}
          alt={localize(product.name, locale)}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-ivory px-3 py-1 text-[0.65rem] tracking-label text-grass uppercase">
            {labels.new}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <p className="text-[0.7rem] tracking-label text-ink-soft uppercase">{product.brand}</p>
        <h3 className="font-serif text-xl">{localize(product.name, locale)}</h3>
        <p className="flex items-baseline gap-2 text-sm">
          <span>{formatPrice(product.price, locale)}</span>
          {product.compareAtPrice && (
            <span className="text-ink-soft line-through">
              <span className="sr-only">{labels.priceBefore} : </span>
              {formatPrice(product.compareAtPrice, locale)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
