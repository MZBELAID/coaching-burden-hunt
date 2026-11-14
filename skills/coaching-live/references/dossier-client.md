# Le dossier à installer

À la fin de la séance, tout ce qui a été validé part dans **un seul dossier**, zippé, que le client dépose dans son propre Claude. Son Claude (skill `installation`) s'en sert pour créer ses liens Stripe, publier son site sur son Cloudflare et créer sa campagne Meta en pause.

## La structure

```
[marque]-business/
├── LISEZ-MOI.md            ← les 3 étapes d'installation + le prompt à coller
├── carte-de-seance.html    ← la Carte de séance terminée (le business plan)
├── installation.json       ← toutes les valeurs dont l'installation a besoin
├── site/
│   └── public/             ← les pages remplies : index.html, merci.html, les 6 pages légales,
│                              consent.js, pixels.js (+ photo s'il y en a une)
└── pubs/
    ├── image-1-affiche.png
    ├── image-2-carte-offre.png
    ├── image-3-visuel-marque.png
    └── textes.md           ← le texte de l'image, le texte de la pub, les 3 titres
```

## Les champs qui restent à remplir chez le client

Dans `site/public/`, **seulement ces 5 champs** restent tels quels, parce qu'ils dépendent de ses comptes :

- `{{STRIPE_LINK_ACOMPTE}}`, `{{STRIPE_LINK_TOUT}}`, `{{STRIPE_LINK_RESTE}}` : ses liens de paiement ;
- `{{META_PIXEL_ID}}` : son pixel ;
- `{{URL_SITE}}` : l'adresse finale du site.

Tout le reste est rempli : textes, design, prix, infos légales, coordonnées de l'hébergeur (Cloudflare, vérifiées sur leur site officiel). Vérifie-le avant de zipper : cherche `{{` dans `site/public/` ; seuls ces 5 champs doivent apparaître.

En mode demande de contact sans paiement sur la page, les liens Stripe n'apparaissent pas : seuls `{{META_PIXEL_ID}}` et `{{URL_SITE}}` restent.

## installation.json

```json
{
  "marque": "[MARQUE]",
  "langue": "fr",
  "pays": ["FR", "BE", "CH", "LU", "CA"],
  "devise": "EUR",
  "site": {
    "nom_worker": "[nom-court-en-minuscules]",
    "funnel": "paiement | contact",
    "fenetre_email": true,
    "stockage_leads": true
  },
  "mini_offre": {
    "nom": "[NOM DE LA MINI-OFFRE]",
    "prix": 97.00,
    "acompte": 20.00,
    "solde": 77.00,
    "tout_payer": 77.60,
    "reste_maintenant": 57.60,
    "message_sous_bouton_acompte": "Le solde de 77 € se paie après la livraison."
  },
  "offre_principale": { "nom": "[NOM]", "prix_mensuel": 750.00 },
  "pubs": {
    "objectif": "ventes | prospects",
    "budget_jour": 50,
    "plafond_72h": 150,
    "ciblage": "pays de la séance | ville + rayon",
    "ville": null,
    "rayon_km": null,
    "texte_pub": "[LE TEXTE DE LA PUB, EN ENTIER]",
    "titres": ["[TITRE 1]", "[TITRE 2]", "[TITRE 3]"],
    "images": ["pubs/image-1-affiche.png", "pubs/image-2-carte-offre.png", "pubs/image-3-visuel-marque.png"],
    "nom_campagne": "[marque]-test-72h"
  }
}
```

Les montants sont des exemples : écris les vrais montants validés. `tout_payer` = prix × 0,8 ; `reste_maintenant` = tout_payer − acompte ; arrondis au centime.

Aucune donnée sensible dedans : pas de mot de passe, pas de clé, pas de numéro de carte, pas d'IBAN.

## LISEZ-MOI.md

```markdown
# Ton business : l'installation (20 min)

1. Ouvre claude.ai, nouvelle conversation (Paramètres → Capacités : l'exécution de code activée).
2. Dépose ce zip dans la conversation et colle ce message :

   Lis https://raw.githubusercontent.com/MZBELAID/coaching-burden-hunt/main/INSTALLER.md et installe mon business.

3. Quand ton Claude te le demande, connecte Stripe, Cloudflare et Meta (Paramètres → Connecteurs → Autoriser).

Rien n'est publié, payé ou activé sans ton oui. Ta campagne est créée en pause : c'est toi qui l'actives.
```

## Zipper et donner

- Onglet Code : zippe le dossier (`[marque]-business.zip`) dans le dossier du client, puis donne son chemin au coach.
- claude.ai : crée le zip dans la conversation et donne-le en fichier à télécharger.

Les images de pub : exporte-les en PNG depuis Canva et range-les dans `pubs/`. Si tu ne peux pas les télécharger toi-même, donne au coach les liens d'export Canva : il les enregistre dans `pubs/` avant de zipper.
