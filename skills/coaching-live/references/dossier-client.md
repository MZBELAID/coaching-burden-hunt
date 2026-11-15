# Le dossier du client

À la fin de la séance, tout ce qui a été validé est rangé dans le dossier du client. C'est ce dossier qui servira à l'installation chez lui (mise en ligne, paiement, campagne), faite ensuite avec le coach.

## La structure

```
clients/[marque]/
├── plan-de-seance.html     ← le plan de séance terminé (le plan d'une page)
├── recherche.md            ← la recherche de la séance, avec ses sources
├── site/
│   ├── maquettes.html      ← les maquettes de design vues en séance
│   └── public/             ← index.html, merci.html, les 6 pages légales, kit.css,
│                              consent.js, pixels.js (+ photos du client s'il y en a)
├── captures/               ← les captures du site : PC et mobile
└── pubs/
    ├── image-1-affiche.png
    ├── image-2-carte-offre.png
    ├── image-3-visuel-marque.png
    └── textes.md           ← le texte de l'image, le texte de la pub, les 3 titres,
                               le ciblage, le budget par jour et le plafond 72 h
```

## Ce que tu vérifies avant de dire « le dossier est prêt »

1. Le plan de séance a ses 7 niveaux gagnés, et sa prochaine action finale.
2. Dans `site/public/`, cherche `{{` : il ne doit rester que les champs qui dépendent des comptes du client (`{{STRIPE_LINK_ACOMPTE}}`, `{{STRIPE_LINK_TOUT}}`, `{{STRIPE_LINK_RESTE}}`, `{{META_PIXEL_ID}}`, `{{URL_SITE}}`) et les infos légales qu'il n'a pas données. Écris la liste de ce qui reste dans `a-remplir.md`.
3. Les 3 images de pub sont dans `pubs/` en PNG. Si tu n'as pas pu les télécharger depuis Canva, donne les liens au coach : il les enregistre lui-même. Si Canva n'était pas disponible, `pubs/textes.md` décrit précisément les 3 images à faire, et `a-remplir.md` le note.
4. Aucune donnée sensible nulle part : pas de mot de passe, pas de clé, pas de numéro de carte, pas d'IBAN.

Renomme le dossier avec le nom de la marque s'il avait un nom provisoire.
