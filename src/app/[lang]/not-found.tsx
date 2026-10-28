/**
 * Page affichée pour une adresse inconnue.
 * Pendant la construction du site, elle sert aussi pour les pages pas encore développées.
 */
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localizedHref } from "@/lib/format";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { BallIcon } from "@/components/ui/Icons";

export default async function NotFound() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-40">
      <BallIcon className="size-10 text-clay" />
      <h1 className="mt-8 text-4xl sm:text-5xl">{dict.notFound.title}</h1>
      <p className="mt-5 max-w-md leading-relaxed text-ink-soft">{dict.notFound.text}</p>
      <ButtonLink href={localizedHref(locale, "/")} variant="outline" className="mt-10">
        {dict.notFound.back}
      </ButtonLink>
    </Container>
  );
}
