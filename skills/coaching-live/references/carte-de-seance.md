# Le plan de séance

C'est l'écran de jeu de la séance, au style Burden Hunt : 7 niveaux, le niveau en cours en grand, la prochaine action toujours visible, et une carte courte pour chaque niveau gagné. À la fin du niveau 7, c'est le business plan d'une page.

## Le modèle

Le modèle est `carte-de-seance.html`. Copie-le **tel quel** : le style, les polices et le script ne changent jamais. Tu ne remplis et ne mets à jour **que le bloc de données** `<script type="application/json" id="carte">`.

- Dans l'onglet Code : le fichier `plan-de-seance.html` dans le dossier du client, ouvert dans l'aperçu.
- Dans claude.ai : un artifact HTML.

## Les règles

- Tout est en français. Aucun mot anglais.
- `marque` : le nom de la marque dès qu'il existe. Vide avant.
- `idee` : l'idée **réécrite proprement**, en quelques mots (« Ouvrir un curry japonais à Strasbourg »). Jamais la phrase brute du client, rien qu'il n'a pas dit.
- `prochaine_action` : **une seule phrase courte**, ce qu'on fait maintenant (« Choisis le résultat que ton client veut obtenir. »). Elle change à chaque mise à jour.
- `etat` : `won` (gagné), `now` (en cours, un seul), `lock` (verrouillé).
- Pour un niveau gagné :
  - `resume` : l'essentiel en **une phrase courte**. C'est ce qu'on lit d'un coup d'œil.
  - `resume2` : une deuxième ligne courte, seulement si elle aide.
  - `lignes` : le détail et les sources, cachés derrière « Voir le détail ». Les phrases validées y sont écrites mot pour mot. Chaque chiffre a son lien, ou « HYPOTHÈSE : [raison] ».
- Mise à jour à la fin de chaque niveau, et quand la prochaine action change de sujet. Pas à chaque question.

## Le résumé et le détail de chaque niveau

**1. La cible**
- résumé : « [MONTANT] / mois · [ZONE] »
- détail : target, langue, zone, puis « clients nécessaires » (ajouté au niveau 3)

**2. Le Katana**
- résumé : la phrase Katana
- résumé 2 : « Client : [BEARER en court] »
- détail : Ki, Techniques, à apprendre ou à faire faire, client (phrase exacte), son problème (phrase exacte), ce qu'il paie déjà, inspirations (une ligne par concurrent, avec pays et lien), signature

**3. L'offre**
- résumé : la phrase d'offre
- résumé 2 : « [PRIX] / mois · [N] clients pour ta target »
- détail : résultat, obstacles et solutions, ce qu'il reçoit (l'empilement), garantie, urgence, pourquoi ce prix, ceux qui le vendent déjà

**4. La mini-offre**
- résumé : la phrase de la mini-offre
- résumé 2 : « [PRIX] · acompte [ACOMPTE] »
- détail : ce qu'il reçoit, délai, garantie, tout payer maintenant, le passage vers l'offre principale

**5. Le site**
- résumé : « Ton site est prêt · design « [NOM] » »
- détail : funnel, contact, adresse (écrite à l'installation)

**6. Les pubs**
- résumé : « 3 images et tes textes sont prêts »
- résumé 2 : « [BUDGET] / jour · [ZONE] »
- détail : texte de l'image, titres, plafond 72 h, campagne (créée en pause à l'installation)

**7. Le plan**
- résumé : « Aujourd'hui : active ta campagne. Dans 72 h : la règle de décision. »
- détail : la règle de décision après 72 h, les chiffres à suivre
- et `pas_compte` : [ex. impôts et cotisations, frais Stripe, abonnements, ton temps]

À la fin : tous les niveaux en `won`, et `prochaine_action` = ce que le client fait lui-même maintenant.

## Si la conversation coupe

Le fichier `plan-de-seance.html` du dossier du client contient tout. Dans une nouvelle conversation, le coach lance le coaching et dit « on reprend [marque] » : la séance repart au premier niveau qui n'est pas `won`.
