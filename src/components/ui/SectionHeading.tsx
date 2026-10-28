import type { ReactNode } from "react";

/** Petite étiquette en capitales espacées placée au-dessus des titres, façon affiche de tournoi. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[0.7rem] font-medium tracking-label text-clay-dark uppercase ${className}`}>
      {children}
    </p>
  );
}

/** En-tête de section : étiquette, titre à empattements et texte d'introduction facultatif. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-4xl leading-tight sm:text-5xl">{title}</h2>
      {intro && <p className="text-base leading-relaxed text-ink-soft">{intro}</p>}
    </div>
  );
}
