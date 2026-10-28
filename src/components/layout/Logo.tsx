import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizedHref } from "@/lib/format";
import { BallIcon } from "@/components/ui/Icons";

/**
 * Logo PROVISOIRE (texte).
 * Quand le logo officiel sera fourni : le déposer dans `public/logo.svg`
 * et remplacer le contenu du lien par :
 *   <Image src="/logo.svg" alt="Passing Shot" width={180} height={40} priority />
 */
export function Logo({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <Link
      href={localizedHref(locale, "/")}
      aria-label="Passing Shot"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <BallIcon className="size-5 text-clay" />
      <span className="font-serif text-2xl font-semibold tracking-[0.08em] uppercase">
        Passing Shot
      </span>
    </Link>
  );
}
