# Consigne projet : CoChoice pour les mutuelles étudiantes

## Objectif
Landing page pour les **mutuelles étudiantes**, payeur et relais envisagés après la revue technique J5.
Persona : responsable prévention et promotion de la santé (entrée), puis partenariats écoles et direction.
Un seul objectif : la **prise de rendez-vous de 30 min** en vue d'un pilote (CTA « Prendre rendez-vous »). 1 page = 1 objectif = 1 CTA.
Site **séparé** du site étudiant (`cochoice.github.io`) et de la page établissements : aucune modification de ces sites.

## Stack
Reprise à l'identique de `cochoice/etablissements` : Vite 7, Tailwind CSS v4, HTML statique, JS vanilla, GitHub Pages (`base: './'`).

## Points à ne pas perdre
- Ne jamais promettre une baisse des remboursements : la contraception des moins de 26 ans et l'IVG relèvent de l'Assurance maladie.
- Mettre en avant la protection des données : aucune donnée de santé, rien d'individuel transmis à la mutuelle, aucun usage assurantiel.
- Statut honnête : projet étudiant, prototype, recherche d'un partenaire pilote.

## Sobriété (objectif EcoIndex A)
- Visuels fournis par l'équipe, convertis en WebP (qualité 62) en deux largeurs avec `srcset` (`public/images/`).
- 3 fichiers de police au lieu de 5 (chaque fichier couvre deux graisses), logo texte dans le pied de page.
- Garder le DOM léger : vérifier le score EcoIndex après chaque ajout de section.

## Charte, ton et règles
Identiques à `cochoice/etablissements` (Nunito, palette V2, vouvoiement, aucun chiffre non sourcé, pas de tiret cadratin, page < 1,5 Mo, RGPD).

## Reste à compléter
- `src/scripts/config.js` : URL et identifiants du Google Form « Demandes de rendez-vous CoChoice (mutuelles) ».
- Contact RGPD : antoinebellanger.public@gmail.com (même adresse que la page établissements).
