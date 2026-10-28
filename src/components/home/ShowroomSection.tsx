/** Présentation de la boutique-showroom de Suresnes : adresse, horaires et lien vers la page dédiée. */
import Image from "next/image";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getStoreInfo } from "@/lib/data/store";
import { localizedHref, weekdayName } from "@/lib/format";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export async function ShowroomSection() {
  const [dict, locale, store] = await Promise.all([getDictionary(), getLocale(), getStoreInfo()]);

  return (
    <section className="bg-navy text-ivory">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-[0.7rem] tracking-label text-clay-light uppercase">
            {dict.showroom.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{dict.showroom.title}</h2>
          <p className="mt-6 max-w-md leading-relaxed text-ivory/80">{dict.showroom.text}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-sans text-[0.7rem] tracking-label text-navy-light uppercase">
                {dict.showroom.addressLabel}
              </h3>
              <address className="mt-3 leading-relaxed not-italic">
                {store.street}
                <br />
                {store.postalCode} {store.city}
                <br />
                <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {store.phone}
                </a>
              </address>
            </div>
            <div>
              <h3 className="font-sans text-[0.7rem] tracking-label text-navy-light uppercase">
                {dict.showroom.hoursLabel}
              </h3>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                {store.hours.map((entry) => (
                  <div key={entry.day} className="contents">
                    <dt className="text-ivory/70">{weekdayName(entry.day, locale)}</dt>
                    <dd>
                      {entry.slots.length === 0
                        ? dict.showroom.closed
                        : entry.slots.map((slot) => `${slot.opens} – ${slot.closes}`).join(", ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ButtonLink href={localizedHref(locale, routes.store)} variant="light" className="mt-10">
            {dict.showroom.cta}
          </ButtonLink>
        </div>

        <div className="relative min-h-80 overflow-hidden lg:min-h-full">
          <Image
            src={store.image}
            alt={store.name}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
