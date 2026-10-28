# Passing Shot — site e-commerce

Site de la boutique **Passing Shot** : matériel et textile de sports de raquette (tennis, padel,
bientôt badminton), vendus en ligne et dans la boutique-showroom de Suresnes.

Direction artistique : **luxe, neutre, rétro**. Fonds crème, accents terre battue, vert Wimbledon
et bleu profond, titres à empattements.

> **État actuel (étape 1)** : socle technique, charte graphique, site en 5 langues et page
> d'accueil avec **images et textes provisoires**. Supabase (base de données) et Stripe
> (paiement) ne sont **pas encore branchés**.

---

## Sommaire

1. [Démarrage rapide](#démarrage-rapide)
2. [Technologies](#technologies)
3. [Arborescence](#arborescence)
4. [Langues (fr, en, it, es, de)](#langues)
5. [Charte graphique](#charte-graphique)
6. [Données](#données)
7. [Tâches courantes](#tâches-courantes)
8. [Qualité du code](#qualité-du-code)
9. [Déploiement sur Vercel](#déploiement-sur-vercel)
10. [Feuille de route](#feuille-de-route)

---

## Démarrage rapide

Prérequis : **Node.js 20.9 ou plus récent** (`node -v` pour vérifier).

```bash
npm install                 # installe les dépendances
cp .env.example .env.local  # crée le fichier de configuration local
npm run dev                 # lance le site sur http://localhost:3000
```

L'adresse `http://localhost:3000` redirige automatiquement vers la bonne langue (`/fr`, `/en`…).

| Commande         | Rôle                                                     |
| ---------------- | -------------------------------------------------------- |
| `npm run dev`    | Site en développement, rechargé à chaque modification    |
| `npm run build`  | Construit la version de production (à lancer avant push) |
| `npm run start`  | Lance la version de production construite                |
| `npm run check`  | Vérifie tout : lint + types TypeScript + formatage       |
| `npm run format` | Reformate automatiquement tout le code (Prettier)        |

---

## Technologies

| Élément     | Outil                                                     |
| ----------- | --------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router), React 19   |
| Langage     | TypeScript (mode strict)                                  |
| Styles      | [Tailwind CSS 4](https://tailwindcss.com)                 |
| Polices     | Cormorant Garamond (titres), Jost (texte) via `next/font` |
| Qualité     | ESLint, Prettier (+ tri automatique des classes Tailwind) |
| Hébergement | Vercel                                                    |
| À venir     | Supabase (données, comptes, photos), Stripe (paiement)    |

> ⚠️ **Next.js 16** introduit des changements importants (ex. `middleware` renommé `proxy`,
> option `cacheComponents`). La documentation correspondant exactement à la version installée se
> trouve dans `node_modules/next/dist/docs/` : la consulter avant de modifier le routage ou le cache.

**Cache Components** est activé (`next.config.ts`) : les pages sont pré-générées au build pour
être très rapides. Conséquence pratique : une valeur qui change à chaque requête (date du jour,
nombre aléatoire…) doit être placée dans une fonction marquée `"use cache"`, sinon le build
échoue avec un message explicite (voir `getCurrentYear()` dans `Footer.tsx` pour un exemple).

---

## Arborescence

```
.
├── CLAUDE.md                  ← consignes pour Claude Code (règles du projet)
├── .env.example               ← modèle des variables d'environnement
├── public/images/placeholder/ ← illustrations PROVISOIRES (à remplacer par les photos)
└── src/
    ├── proxy.ts               ← redirige vers la bonne langue (/ → /fr)
    ├── app/
    │   ├── globals.css        ← CHARTE : couleurs et polices
    │   └── [lang]/            ← toutes les pages, préfixées par la langue
    │       ├── layout.tsx     ← structure commune (polices, en-tête, pied de page, SEO)
    │       ├── page.tsx       ← page d'accueil
    │       ├── charte/        ← page interne de la charte graphique (/fr/charte)
    │       ├── not-found.tsx  ← page « pas encore prête / introuvable »
    │       └── [...rest]/     ← renvoie toute adresse inconnue vers not-found
    ├── components/
    │   ├── ui/                ← briques réutilisables (bouton, conteneur, carte produit, icônes…)
    │   ├── layout/            ← en-tête, pied de page, menu mobile, sélecteur de langue, logo
    │   └── home/              ← sections de la page d'accueil
    ├── i18n/
    │   ├── config.ts          ← liste des langues
    │   ├── dictionaries.ts    ← chargement des traductions
    │   └── dictionaries/      ← textes du site : fr.json, en.json, it.json, es.json, de.json
    ├── lib/
    │   ├── data/              ← accès aux données (provisoires aujourd'hui, Supabase demain)
    │   ├── format.ts          ← prix, jours de la semaine, liens localisés
    │   └── routes.ts          ← liste centrale des adresses du site
    └── types/                 ← types TypeScript (produit, collection, boutique…)
```

---

## Langues

Le site est disponible en **français** (par défaut), **anglais**, **italien**, **espagnol** et
**allemand**. Chaque adresse commence par la langue : `/fr`, `/en`, `/it`, `/es`, `/de`.

- **Choix automatique** (`src/proxy.ts`) : à la première visite, la langue du navigateur est
  utilisée ; ensuite, le choix fait dans le sélecteur de langue est mémorisé (cookie `NEXT_LOCALE`).
- **Textes** : tous les textes de l'interface sont dans `src/i18n/dictionaries/<langue>.json`.
  `fr.json` est la référence : si une clé manque dans une autre langue, `npm run build` échoue
  et indique laquelle.
- **Contenus du catalogue** (noms de produits, collections) : chaque texte contient ses 5
  traductions (type `LocalizedText`, voir `src/types/catalog.ts`).
- **SEO** : chaque page déclare ses versions dans les autres langues (balises `hreflang`).

Utilisation dans un composant serveur :

```tsx
const dict = await getDictionary(); // langue de la page détectée automatiquement
return <h1>{dict.hero.title}</h1>;
```

---

## Charte graphique

Tout est défini dans **`src/app/globals.css`** (bloc `@theme`). Modifier une valeur la met à jour
sur tout le site. Aperçu visuel : **`/fr/charte`**.

| Rôle            | Classe Tailwind               | Valeur                |
| --------------- | ----------------------------- | --------------------- |
| Fond principal  | `bg-cream`                    | `#f4eee2`             |
| Blanc cassé     | `bg-ivory`                    | `#fbf8f2`             |
| Fond secondaire | `bg-sand`                     | `#e7dcc8`             |
| Texte           | `text-ink` / `text-ink-soft`  | `#1f2420` / `#545a52` |
| Terre battue    | `clay` (+ `-light`, `-dark`)  | `#b4573a`             |
| Vert Wimbledon  | `grass` (+ `-light`, `-dark`) | `#2e4a37`             |
| Bleu profond    | `navy` (+ `-light`)           | `#1f2b45`             |
| Titres          | `font-serif`                  | Cormorant Garamond    |
| Texte courant   | `font-sans`                   | Jost                  |

Principes : beaucoup d'espace, couleurs passées, jamais de couleur vive ; les titres en police à
empattements ; les petites étiquettes en capitales espacées (`tracking-label`).

**Logo** : provisoire (texte), dans `src/components/layout/Logo.tsx`. Le commentaire du fichier
explique comment le remplacer par le logo officiel (`public/logo.svg`).

---

## Données

Les composants **n'accèdent jamais directement à la base de données** : ils appellent les
fonctions de `src/lib/data/` (ex. `getFeaturedProducts()`).

Aujourd'hui, ces fonctions renvoient des **données provisoires écrites en dur**. À l'étape
Supabase, seul l'intérieur de ces fonctions changera ; les pages resteront identiques.

**Prix** : toujours stockés en **centimes** (entiers), comme l'exige Stripe : `19900` = 199,00 €.
Affichage avec `formatPrice(prix, locale)`, qui respecte le format de chaque langue.

---

## Tâches courantes

**Remplacer une image provisoire** — déposer la photo dans `public/images/` (format `.jpg` ou
`.webp`, idéalement ≥ 2000 px de large pour les grandes images), puis mettre à jour le chemin :

- image d'accueil : `HERO_IMAGE` dans `src/components/home/Hero.tsx` ;
- image « histoire » : `STORY_IMAGE` dans `src/components/home/StorySection.tsx` ;
- boutique, produits, collections : dans `src/lib/data/`.

Next.js optimise automatiquement les photos (redimensionnement, format WebP/AVIF).

**Modifier un texte** — le changer dans les 5 fichiers de `src/i18n/dictionaries/`.

**Modifier les horaires ou l'adresse de la boutique** — `src/lib/data/store.ts`
(ils deviendront modifiables depuis l'admin).

**Réorganiser la page d'accueil** — changer l'ordre des sections dans `src/app/[lang]/page.tsx`.

**Ajouter une page** — créer `src/app/[lang]/<adresse>/page.tsx`, ajouter son adresse dans
`src/lib/routes.ts` et ses textes dans les dictionnaires.

**Ajouter une langue** — suivre les 3 étapes en tête de `src/i18n/config.ts`.

---

## Qualité du code

Avant chaque mise en ligne :

```bash
npm run check   # lint + types + formatage
npm run build   # doit se terminer sans erreur
```

Conventions :

- composants en `PascalCase.tsx`, un composant principal par fichier ;
- composants **serveur** par défaut ; `"use client"` uniquement si nécessaire (interactivité) ;
- commentaires en français, qui expliquent le « pourquoi » ;
- jamais de secret (clé Stripe, Supabase…) dans le code : uniquement dans `.env.local` / Vercel.

---

## Déploiement sur Vercel

1. Importer le dépôt GitHub sur [vercel.com/new](https://vercel.com/new) (Next.js est détecté
   automatiquement, aucun réglage de build nécessaire).
2. Renseigner les variables d'environnement de `.env.example` (Settings → Environment Variables).
3. Chaque push sur la branche principale met le site en production ; chaque autre branche
   obtient une adresse de prévisualisation.

---

## Feuille de route

| Étape | Contenu                                                                                                | Statut  |
| ----- | ------------------------------------------------------------------------------------------------------ | ------- |
| 1     | Socle, charte, 5 langues, page d'accueil (contenus provisoires)                                        | ✅ Fait |
| 2     | Pages vitrines : la boutique, l'histoire, clubs et coachs, pages légales                               | À faire |
| 3     | Catalogue (sport → catégorie, filtres marque / prix / taille) et fiches produit                        | À faire |
| 4     | Supabase : produits, variantes, stock, comptes clients (licence FFT)                                   | À faire |
| 5     | Panier, livraison (Colissimo, Chronopost, retrait Suresnes), Stripe, e-mails                           | À faire |
| 6     | Compte client : commandes, adresses, suivi                                                             | À faire |
| 7     | Espace admin : produits, photos, stock, collections, commandes, codes clubs, contenus, tableau de bord | À faire |
| 8     | SEO (sitemap, données structurées), performances, tests, mise en ligne                                 | À faire |

Questions encore ouvertes (cahier des charges) : nombre de produits au lancement, réservation
du cordage en ligne, reprise de raquettes d'occasion, fonctionnement exact des réductions clubs
et coachs, tarifs de livraison et seuil de gratuité.
