# La Carte de séance

C'est un **artifact** (un document Markdown) qui s'affiche à droite de la conversation. Il est créé vide au premier message, mis à jour à la fin de chaque grande étape, et terminé à l'étape 7 : il devient alors le business plan d'une page.

## Les règles

- Titre de l'artifact : `Carte de séance · [MARQUE ou PRÉNOM]` (tant que la marque n'existe pas : `Carte de séance`).
- Chaque section commence par son état : ✅ fait · 🔵 en cours · ⬜ à faire.
- Une section ⬜ reste vide : seulement son titre.
- Les réponses validées sont écrites **mot pour mot**, jamais raccourcies (Bearer, Burden, phrase Katana, phrases d'offre).
- Chaque chiffre a son lien de source, ou il est marqué **HYPOTHÈSE** avec sa raison en quelques mots.
- Rien d'autre que ce modèle : pas de commentaire, pas de conseil ajouté.
- Mise à jour à la fin de chaque grande étape seulement.

## Le modèle

```markdown
# [MARQUE ou PRÉNOM] · business plan d'une page

Chemin : [de zéro | idée claire] · [DATE]

## [✅|🔵|⬜] 1. Objectif
- [MONTANT] [DEVISE] / mois [provisoire ?], en [LANGUE].
- Pays : [PAYS · PAYS · …]
- Il faut **[N] clients** à [PRIX] / mois.   ← la ligne s'écrit à l'étape 3

## [✅|🔵|⬜] 2. Katana
- 🔥 Ki : [KI] · ⚔️ Techniques : [TECHNIQUES GARDÉES]
- 🎯 **Client** : [BEARER, phrase exacte]
- 💢 **Son problème** : [BURDEN, phrase exacte]
- Ce qu'il vend : [PRODUIT OU SERVICE DE L'AVATAR] ≈ [PRIX] · marge ≈ [MARGE] ([SOURCE] | HYPOTHÈSE)
- Inspirations : [CONCURRENT · PAYS · LIEN] × 3
- ⚔️ **Katana** : « [PHRASE KATANA] »
- Signature : [NOM DE LA SIGNATURE] · tirée de ton Ki [KI]

## [✅|🔵|⬜] 3. Offre principale : [PRIX] / mois
- Résultat : [RÉSULTAT RÊVÉ]
- Délai : [EN COMBIEN DE TEMPS]
- Effort : [SANS QUEL EFFORT]
- Risque : [LA GARANTIE]
- Pourquoi ce prix : [LE CALCUL DE CE QUE ÇA RAPPORTE AU CLIENT]
- Ceux qui le vendent déjà : [VENDEUR · PRIX · LIEN] × 3

## [✅|🔵|⬜] 4. Mini-offre : [PRIX] (acompte [ACOMPTE])
- « [PHRASE DE LA MINI-OFFRE] »
- Tout payer maintenant : [PRIX −20 %]
- Elle mène à l'offre principale : [LE PONT, EN UNE PHRASE]

## [✅|🔵|⬜] 5. Site
- 🔗 [ADRESSE] (écrite à l'installation)
- Funnel : [LES ÉTAPES DU FUNNEL]
- Design : « [NOM DU DESIGN] »
- Contact : [WhatsApp | e-mail]

## [✅|🔵|⬜] 6. Pubs
- Les 3 images carrées et le texte prêts.
- Campagne Meta **en pause** (créée à l'installation) : [BUDGET] / jour, plafond [BUDGET 72 H] sur 72 h, sur [PAYS].
- Les 3 titres : [TITRE 1] · [TITRE 2] · [TITRE 3]

## [✅|🔵|⬜] 7. Les prochaines étapes
1. Aujourd'hui : activer la campagne (c'est toi qui le fais).
2. Pendant 72 h : répondre à chaque demande vite.
3. Après 72 h : appliquer la règle de décision.
4. Au 1er client mini-offre : lui proposer l'offre principale à la livraison.

**La règle de décision après 72 h**
- Des ventes tombent → tu continues : tu livres, tu proposes l'offre principale, tu gardes la pub.
- Aucune vente → peu de clics = c'est la pub · des visites sans réservation = c'est la page ou l'offre → tu corriges **une seule chose** et tu relances 72 h.
- Dans les deux cas : bilan avec ton coach.

**📊 Les chiffres à suivre**
- Coût par demande ou par réservation.
- Nombre de mini-offres vendues.
- Nombre de clients à [PRIX] / mois (objectif : [N]).

**Pas compté ici :** [ex. impôts et cotisations, frais Stripe, abonnements, ton temps]
```

## Si la conversation coupe

Le client copie le contenu de la carte dans une nouvelle conversation, avec le prompt de départ, et dit « on reprend ». La séance repart à la première section qui n'est pas ✅.
