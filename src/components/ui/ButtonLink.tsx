import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Bouton-lien du site.
 *  - primary : vert Wimbledon plein (action principale)
 *  - accent  : terre battue pleine (à réserver aux temps forts)
 *  - outline : contour fin, fond transparent
 *  - light   : contour clair, pour les fonds sombres ou les photos
 */
type Variant = "primary" | "accent" | "outline" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-grass text-ivory hover:bg-grass-dark",
  accent: "bg-clay text-ivory hover:bg-clay-dark",
  outline: "border border-ink/70 text-ink hover:bg-ink hover:text-ivory",
  light: "border border-ivory/80 text-ivory hover:bg-ivory hover:text-ink",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-7 py-3.5 text-xs font-medium tracking-label uppercase transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
