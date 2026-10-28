/** Bandeau des engagements : retrait, livraison, paiement, conseil. */
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

export async function Commitments() {
  const dict = await getDictionary();

  return (
    <section className="border-y border-line">
      <Container>
        {/* L'espace d'1 px entre les cases laisse voir le fond : il dessine les traits de séparation. */}
        <ul className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {dict.commitments.map((item) => (
            <li key={item.title} className="bg-cream px-2 py-10 text-center sm:px-6">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-soft">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
