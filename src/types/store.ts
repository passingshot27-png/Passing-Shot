/** Types des informations sur la boutique physique de Suresnes. */

export type OpeningHours = {
  /** Jour de la semaine : 1 = lundi … 7 = dimanche (norme ISO). */
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Créneaux d'ouverture au format « HH:MM ». Tableau vide = fermé. */
  slots: { opens: string; closes: string }[];
};

export type StoreInfo = {
  name: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  hours: OpeningHours[];
  image: string;
};
