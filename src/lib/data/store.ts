/**
 * Informations sur la boutique physique de Suresnes.
 *
 * ⚠️ DONNÉES PROVISOIRES (adresse, téléphone, horaires à confirmer).
 * Elles deviendront modifiables depuis l'espace admin (rubrique « Contenus »).
 */
import type { StoreInfo } from "@/types/store";

const STORE: StoreInfo = {
  name: "Passing Shot Suresnes",
  street: "Adresse à confirmer",
  postalCode: "92150",
  city: "Suresnes",
  phone: "+33 1 00 00 00 00",
  email: "bonjour@passingshot.fr",
  hours: [
    { day: 1, slots: [] },
    { day: 2, slots: [{ opens: "10:00", closes: "19:00" }] },
    { day: 3, slots: [{ opens: "10:00", closes: "19:00" }] },
    { day: 4, slots: [{ opens: "10:00", closes: "19:00" }] },
    { day: 5, slots: [{ opens: "10:00", closes: "19:00" }] },
    { day: 6, slots: [{ opens: "10:00", closes: "19:00" }] },
    { day: 7, slots: [{ opens: "10:00", closes: "13:00" }] },
  ],
  image: "/images/placeholder/boutique.svg",
};

export async function getStoreInfo(): Promise<StoreInfo> {
  return STORE;
}
