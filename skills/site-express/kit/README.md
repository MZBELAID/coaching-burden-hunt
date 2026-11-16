# Kit Site Express : assembler une page en 20 lignes

Les 8 sections, toujours dans cet ordre : 1. barre contact · 2. hero · 3. témoignages (seulement s'il y a de vrais avis) · 4. comment ça marche + ce que vous recevez + délai · 5. pour qui / pas pour qui · 6. qui je suis (ou qui nous sommes) · 7. FAQ · 8. bloc final + pied de page légal.

1. Copier dans le dossier du site (`public/`) : `kit.css`, `page.html` renommé en `index.html`, `merci.html`, les 6 pages légales, plus `consent.js` et `pixels.js`.
2. Écrire le thème (`themes.md`) : coller la ligne des polices et le bloc `:root { … }` à l'endroit marqué « THÈME », dans **les 8 pages**. Fond clair, texte foncé, toujours.
3. Choisir une valeur pour chaque axe du design (`themes.md`), en classes sur `<body>` : hero, cartes, barre, bouton, mot fort, joint, motif, étapes, pour qui. Jamais le même trio hero + cartes + barre que pour un autre client.
4. Remplir tous les champs entre doubles accolades avec les textes validés en séance. Rien d'inventé : ni avis, ni chiffre, ni promesse en plus.
5. Garder un seul mode de bouton dans le hero : ECOM (acompte Stripe) ou LEAD (question OUI/NON). Supprimer l'autre bloc.
6. Barre contact : garder WhatsApp, l'e-mail, ou les deux (blocs `SI`).
7. Hero : H1 de 8 mots au plus, la phrase exacte de l'offre, le bouton avec le prix, une ligne de garantie. Rien ne recouvre jamais le titre (ni illustration, ni pastille).
8. Dessiner 1 illustration de hero (au format du hero choisi, voir `illustrations.md`) et 3 petites illustrations d'étapes (SVG 320×200), dans le style du design.
9. Règles d'image : jamais de visage ni d'yeux, de signe religieux, de drapeau ; pas de fausse capture d'écran.
10. Blocs `SI` : condition vraie → retirer seulement les deux commentaires ; fausse → supprimer tout le bloc.
11. Aucun vrai avis → supprimer toute la section 3 (témoignages). Jamais de faux avis.
12. « Ce que vous recevez » : un élément par ligne (un titre + une précision), puis le délai.
13. « Qui je suis » (ou « Qui nous sommes ») : toujours, 3 à 6 lignes vraies, une vraie photo ou un monogramme dessiné (jamais de visage dessiné), et le contact. FAQ : la question « Et si ça ne me convient pas ? » reste, la dernière donne le contact.
14. Fenêtre e-mail : la garder seulement si le funnel la prévoit et si le site a `/api/lead`. Sinon, supprimer son bloc `SI`.
15. Un champ placé dans le script (entre apostrophes) ne doit pas contenir d'apostrophe droite : écrire `\'`.
16. Ne pas toucher aux branchements : `consent.js`, `window.SITE_CONFIG`, les liens Stripe, les classes `js-buy`, `js-cta-repeat`, `js-sticky`, les `id` du formulaire.
17. Capture PC : `chrome --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=pc.png file:///…/index.html`. Le hero tient en entier, bouton visible. Page entière : la même commande avec `--window-size=1440,6000`, puis recadre à la fin du contenu.
18. Capture mobile : Chrome sans interface refuse moins de 500 px de large. Ouvrir la page dans un cadre de 390 px (modèle : `apercu-mobile.html`, à copier à côté de `index.html`) avec `--window-size=390,844`.
19. Regarder les captures : hero entier, texte bien contrasté, aucun débordement à droite sur mobile, rien d'invisible.
20. Vérifier qu'il ne reste des doubles accolades que pour les comptes du client (liens Stripe, pixel Meta, adresse du site), puis publier.

Aperçu dans un seul fichier (artifact) : coller le contenu de `kit.css` dans une balise `<style>` à la place du `<link rel="stylesheet" href="kit.css">`.

Exemple complet d'une page finie : `exemple/index.html` (design « Affiche » ; à lire pour le niveau de finition attendu, jamais à recopier). Le même contenu dans 3 designs très différents : `tests/coeurriz-v3/`.
