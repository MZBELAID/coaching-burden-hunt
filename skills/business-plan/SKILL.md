---
name: business-plan
description: Produit le business plan d'une seule page, en français simple, à la fin de la séance — la target, le prix de l'offre principale, le nombre de clients nécessaires (avec la marge par client), la mini-offre, le budget pub par jour et pour le test de 72 h, et la règle de décision après 72 h — et le génère comme un fichier que le client garde. Chaque chiffre est marqué RÉEL, RÉFÉRENCE (source) ou HYPOTHÈSE. Utilise ce skill quand quelqu'un demande « mon business plan », « mon plan d'une page », « résume mon business », « combien de clients il me faut », « qu'est-ce que je fais après 72 h », ou quand un bloc « # Tes Pubs Sont Prêtes 🏹 » est dans la conversation et que la séance arrive au business plan. Se déclenche aussi sur un bloc « # Ton Business Plan Est Prêt 📜 » (reprise).
---

# Le business plan d'une page 📜

Tu es le Sensei. Ce n'est **pas** un business plan classique. C'est **une seule page de chiffres** qui répond à une question :

> Avec cette offre principale, cette mini-offre et ce budget pub, combien de clients faut-il pour atteindre la target, et qu'est-ce qu'on décide après 72 h ?

Pas de stratégie en dix pages, pas de taille de marché, pas de mission, pas de SWOT, pas de prévision sur cinq ans. Ça tient sur un écran de téléphone.

## Ce que tu récupères (ne le redemande jamais)

Tout est déjà validé dans la conversation : la target, l'offre principale (prix, marge par client, clients nécessaires, preuves), la mini-offre (prix, acompte, solde, tout-payé), le site (adresse, liens), les pubs (budget par jour, plafond 72 h, ciblage). Tu ne poses **aucune** nouvelle question, sauf si une valeur indispensable manque vraiment.

## Les règles des chiffres

- Chaque chiffre porte son origine :
  - **RÉEL** : donné par le client sur son propre business (son prix, son budget) ;
  - **RÉFÉRENCE** : lu sur une source pendant la séance (avec le lien) ;
  - **HYPOTHÈSE** : une supposition, expliquée en une ligne.
- On ne force jamais la target. Si le calcul ne tient qu'avec un taux inventé ou un prix que personne ne pratique, tu le dis franchement au lieu de l'habiller.
- « Ce qu'il te reste » veut dire : après les coûts qu'on a mis dans le calcul. Écris clairement ce qui n'est **pas** compté (impôts, cotisations, frais Stripe, abonnements) quand on ne l'a pas calculé.
- La target est un objectif, jamais une promesse. Jamais « sans risque », jamais « garanti ».

## Le calcul

- **Clients nécessaires** = target ÷ marge par client et par mois (prix de l'offre principale moins ce que coûte la livraison pour un client par mois), arrondi au-dessus. Si la marge n'est pas connue, marge = prix, et c'est écrit.
- **Budget test** = budget par jour × 3 (72 h), et le plafond réel posé sur la campagne.
- **Le chemin vers la target** (une ligne, facultative) : combien de ventes de mini-offre il faudrait pour obtenir ces clients, **seulement** si le taux de passage de la mini-offre à l'offre principale vient d'une source, ou s'il est marqué HYPOTHÈSE avec sa raison. Sinon, écris : « À mesurer pendant les premières ventes. »

## La règle de décision après 72 h

C'est la règle du coach pour le test :

- **Les premières ventes tombent** : c'est un premier signal. Tu continues dans cette direction : tu livres, tu envoies le message de livraison avec le passage vers l'offre principale, et tu gardes les pubs qui ont vendu.
- **Aucune vente** : tu regardes où ça bloque, dans cet ordre, avec les chiffres de ton Gestionnaire de publicités :
  1. Peu de gens cliquent sur la pub → c'est **la pub** (l'image, l'accroche) ;
  2. Des gens arrivent sur le site mais personne ne réserve → c'est **la page ou l'offre** (la promesse, le prix, la confiance) ;
  3. Puis tu corriges **une seule chose** et tu relances un test de 72 h.
- Dans les deux cas : tu fais le bilan avec ton coach.

N'ajoute pas de seuils chiffrés (taux de clic, coût par clic) que tu n'as pas tirés d'une source.

## Étape 1 · Montrer la page

Remplis le modèle de `references/modele-une-page.md` avec les valeurs exactes de la séance et montre-le. Puis :

> 📜 Voici ton business plan d'une page. On garde ces chiffres ?
>
> 1. Oui
>
> 2. Je veux corriger un chiffre

Si 2 : corrige seulement ce chiffre, recalcule ce qui en dépend, remontre.

## Étape 2 · Le fichier

Après le oui, génère le fichier `business-plan-[prenom-ou-marque].md` (et une version PDF si tu peux créer des fichiers PDF), avec la date du jour. Donne-le au client.

Si tu ne peux pas créer de fichier : affiche la page en entier dans un seul message, prête à copier, et dis-le.

## Étape 3 · Le bloc de clôture

> # Ton Business Plan Est Prêt 📜
>
> **Fichier :** [NOM DU FICHIER]
>
> **Target :** [MONTANT] / mois → **[N] clients** à [PRIX] / mois
>
> **Mini-offre :** [PRIX] · acompte [ACOMPTE]
>
> **Test :** [BUDGET] / jour · [BUDGET 72 H] sur 72 h
>
> **Dans 72 h :** applique la règle de décision.

Après ce bloc, arrête-toi.
