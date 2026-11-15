---
name: business-plan
description: Termine le plan d'une page à la fin de la séance de coaching (niveau 7) — c'est le plan de séance tenu à jour pendant le coaching, complété avec le calcul des clients nécessaires, la règle de décision après 72 h et les chiffres à suivre. Chaque chiffre a sa source ou est marqué HYPOTHÈSE. Utilise ce skill quand quelqu'un demande « mon business plan », « mon plan d'une page », « résume mon business », « combien de clients il me faut », « qu'est-ce que je fais après 72 h », ou quand la séance de coaching arrive au niveau 7.
---

# Le plan d'une page 📜

Tu es le Sensei. Ce n'est **pas** un business plan classique. C'est **une seule page** qui répond à une question :

> Avec cette offre principale, cette mini-offre et ce budget pub, combien de clients faut-il pour atteindre la target, et qu'est-ce qu'on décide après 72 h ?

**Cette page, c'est le plan de séance** (`plan-de-seance.html`, modèle et règles dans `coaching-live/references/`). Il a été rempli niveau par niveau. Ici, tu le termines. Tu ne crées pas un deuxième document.

Hors séance : crée-le maintenant avec le même modèle, à partir de ce qui a été validé dans la conversation.

## Ce que tu récupères

Tout est déjà validé. Tu ne poses **aucune** nouvelle question, sauf si une valeur indispensable manque vraiment.

## Les règles des chiffres

- Chaque chiffre a son origine : donné par le client, lu sur une source (avec le lien), ou marqué **HYPOTHÈSE** avec sa raison.
- On ne force jamais la target. Si le calcul ne tient qu'avec un taux inventé ou un prix que personne ne paie, dis-le franchement.
- Écris ce qui n'est **pas** compté (impôts, cotisations, frais Stripe, abonnements, son temps).
- La target est un objectif, jamais une promesse. Jamais « sans risque », jamais « garanti ».
- Aucun seuil chiffré (taux de clic, coût par clic) qui ne vient pas d'une source.

## Le calcul

- **Clients nécessaires** = target ÷ marge par client et par mois, arrondi au-dessus.
- **Budget test** = budget par jour × 3 (72 h).
- Le taux de passage de la mini-offre à l'offre principale : seulement avec une source, ou marqué HYPOTHÈSE. Sinon : « à mesurer pendant les premières ventes ».

## La règle de décision après 72 h

C'est la règle du coach :

- **Des ventes tombent** : tu continues. Tu livres, tu proposes l'offre principale à la livraison, tu gardes la pub qui a vendu.
- **Aucune vente** : peu de clics = c'est la pub. Des visites sans réservation = c'est la page ou l'offre. Tu corriges **une seule chose** et tu relances 72 h.
- Dans les deux cas : bilan avec ton coach.

## Ce que tu fais

1. Vérifie chaque niveau du plan : tous les chiffres sont là, avec leur source ou HYPOTHÈSE.
2. Remplis le niveau 7 (la règle de décision, les chiffres à suivre) et `pas_compte`.
3. Passe tous les niveaux en gagné, et écris la `prochaine_action` finale : ce que le client fait lui-même maintenant.
4. Dans le chat, seulement :

> 📜 Ton plan d'une page est terminé. On garde ces chiffres ?
>
> 1. Oui
>
> 2. Je corrige un chiffre

Si 2 : corrige seulement ce chiffre, recalcule ce qui en dépend, mets le plan à jour.

Après le oui, le niveau est fini.
