/**
 * Page d'accueil.
 * Chaque section est un composant indépendant (src/components/home) :
 * pour réordonner, retirer ou ajouter une section, il suffit de modifier cette liste.
 */
import { BrandStrip } from "@/components/home/BrandStrip";
import { ClubsSection } from "@/components/home/ClubsSection";
import { Commitments } from "@/components/home/Commitments";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ShowroomSection } from "@/components/home/ShowroomSection";
import { SportsSection } from "@/components/home/SportsSection";
import { StorySection } from "@/components/home/StorySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <FeaturedCollections />
      <SportsSection />
      <StorySection />
      <FeaturedProducts />
      <Commitments />
      <ShowroomSection />
      <ClubsSection />
    </>
  );
}
