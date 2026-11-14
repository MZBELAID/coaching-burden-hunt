# La Carte de séance

C'est une page au style Burden Hunt (comme la page Speedrun du coach) : une quête en 8 étapes, avec une barre de progression. Elle est créée au premier message, mise à jour à la fin de chaque grande étape, et terminée à l'étape 7 : elle devient alors le business plan d'une page.

## Le modèle

Le modèle est `carte-de-seance.html` (lien dans `COMMENCER.md`). Copie-le **tel quel** : le style, les polices et le script ne changent jamais. Tu ne remplis et ne mets à jour **que le bloc de données** `<script type="application/json" id="carte">`.

- Dans claude.ai : un artifact HTML.
- Dans l'onglet Code : le fichier `carte-de-seance.html` dans le dossier du client (et un artifact si l'outil Artifact est disponible).

## Les règles

- `marque` : le nom de la marque dès qu'il existe (avant : « Carte de séance »).
- `idee` : l'idée **réécrite proprement**, en quelques mots clairs (« Ouvrir un curry japonais à Strasbourg »). Jamais la phrase brute du client. Rien qu'il n'a pas dit. Chemin « de zéro » : vide jusqu'au Katana, puis le Katana en quelques mots.
- `chemin` : « idée claire » ou « de zéro ».
- `etat` de chaque étape : `done` (fait), `now` (en cours, une seule à la fois), `todo` (à faire, sans lignes).
- Les réponses validées sont écrites **mot pour mot**, jamais raccourcies (Bearer, Burden, phrase Katana, phrases d'offre). `"fort": true` sur les plus importantes.
- Chaque chiffre a son lien de source, ou il est marqué « HYPOTHÈSE : [raison] ».
- Rien d'autre : pas de commentaire, pas de conseil ajouté.
- Mise à jour à la fin de chaque grande étape seulement.

## Les lignes de chaque étape

**1. Objectif**
- Target : [MONTANT] [DEVISE] / mois [provisoire ?]
- Langue : [LANGUE]
- Zone : [PAYS] ou [VILLE + RAYON]
- Clients nécessaires : [N] à [PRIX] / mois ← ajoutée à l'étape 3 seulement

**2. Katana**
- 🔥 Ki : [KI]
- ⚔️ Techniques : [TECHNIQUES]
- À apprendre ou à faire faire : [S'IL Y EN A]
- 🎯 Client : [BEARER, phrase exacte]
- 💢 Son problème : [BURDEN, phrase exacte]
- Ce qu'il vend : [PRODUIT OU SERVICE DE L'AVATAR] ≈ [PRIX] · marge ≈ [MARGE] ([SOURCE] | HYPOTHÈSE)
- Inspirations : [CONCURRENT · PAYS · LIEN] (une ligne par concurrent)
- ⚔️ Katana : « [PHRASE KATANA] » (fort)
- Signature : [NOM] · tirée de ton Ki [KI]

**3. Offre principale**
- Offre : « [PHRASE D'OFFRE] » (fort)
- Prix : [PRIX] / mois (fort)
- Résultat · Délai · Effort · Risque : une ligne chacun
- Pourquoi ce prix : [LE CALCUL]
- Ceux qui le vendent déjà : [VENDEUR · PRIX · LIEN] (une ligne par vendeur)

**4. Mini-offre**
- Offre : « [PHRASE] » (fort)
- Prix : [PRIX] · acompte [ACOMPTE] · tout payer maintenant [PRIX −20 %]
- Vers l'offre principale : [LE PONT, en une phrase]

**5. Site**
- Adresse : [ADRESSE] (écrite à l'installation)
- Funnel : [LES ÉTAPES]
- Design : « [NOM] »
- Contact : [WhatsApp | e-mail]

**6. Pubs**
- Les 3 images carrées et le texte : prêts
- Campagne : en pause, créée à l'installation · [BUDGET] / jour · plafond [BUDGET 72 H] sur 72 h · [ZONE]
- Titres : [TITRE 1] · [TITRE 2] · [TITRE 3]

**7. Business plan**
- Aujourd'hui : activer la campagne (c'est toi qui le fais)
- Pendant 72 h : répondre vite à chaque demande
- Après 72 h : des ventes → tu continues (tu livres, tu proposes l'offre principale, tu gardes la pub) · aucune vente → peu de clics = la pub, des visites sans réservation = la page ou l'offre → tu corriges une seule chose et tu relances 72 h · bilan avec ton coach
- Chiffres à suivre : coût par demande · mini-offres vendues · clients à [PRIX] / mois (objectif : [N])
- Et `pas_compte` : [ex. impôts et cotisations, frais Stripe, abonnements, ton temps]

**8. Installation** (remplie par le Claude du client)
- Site en ligne · paiement branché · pixel · campagne créée en pause · à faire

## Si la conversation coupe

Le coach colle le bloc de données de la carte dans une nouvelle conversation, avec le prompt de départ, et dit « on reprend ». La séance repart à la première étape qui n'est pas `done`.
