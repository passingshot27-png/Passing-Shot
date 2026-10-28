/**
 * Attrape toutes les adresses qui ne correspondent à aucune page
 * et affiche la page « introuvable » du site (src/app/[lang]/not-found.tsx),
 * avec l'en-tête et le pied de page, dans la bonne langue.
 */
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}
