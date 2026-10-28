@AGENTS.md

# Passing Shot — consignes pour Claude Code

Site e-commerce de la boutique Passing Shot (tennis, padel, badminton), Suresnes.
Lire le README.md pour l'architecture complète.

## Règles du projet

- **Langues** : tout texte visible passe par les dictionnaires `src/i18n/dictionaries/*.json`
  (fr, en, it, es, de). Toujours ajouter une clé dans les 5 fichiers ; `fr.json` est la référence.
- **Données** : les pages n'accèdent aux données que via `src/lib/data/*`. Ne jamais appeler
  Supabase directement depuis un composant.
- **Prix** : toujours en centimes (entiers), formatés avec `formatPrice()`.
- **Liens internes** : utiliser `routes` (`src/lib/routes.ts`) + `localizedHref()`.
- **Style** : couleurs et polices uniquement via les jetons de `src/app/globals.css`
  (`bg-cream`, `text-clay`, `font-serif`…). Pas de couleurs en dur, rien de flashy.
- **Commentaires** : en français, pour expliquer le « pourquoi ».
- Avant chaque commit : `npm run check` puis `npm run build`.
