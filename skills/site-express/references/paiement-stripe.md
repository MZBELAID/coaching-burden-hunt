# Le paiement : liens Stripe (connecteur Stripe)

Pas de serveur de paiement à coder : on utilise des **liens de paiement Stripe** (Payment Links). Stripe héberge la page de paiement, la carte n'arrive jamais sur le site du client.

**Rien n'est créé sans le oui explicite du client.** Avant de créer, montre la liste exacte (nom, montant, devise, adresse de retour) et demande : « Je crée ces liens dans ton Stripe ? 1. Oui 2. Pas encore ».

## Avant de créer

1. Vérifie avec le connecteur que le compte Stripe du client est bien connecté et **activé** (il peut encaisser). Lecture seulement.
2. Si le compte n'est pas activé (vérification d'identité, SIRET, IBAN pas finis) : ne crée rien. Dis-le au client en une ligne, et passe le site en mode « contact » (le bouton envoie vers son email) en attendant. Il finira l'activation lui-même dans son tableau de bord Stripe.
3. La page de retour a besoin de l'adresse du site. Si elle n'est pas encore connue (avec Wrangler, elle s'affiche au premier déploiement), crée les liens **sans redirection** (page de confirmation Stripe par défaut), puis, juste après la publication, mets à jour leur page de retour (« Après le paiement » → redirection) avec l'adresse réelle. Même règle : un oui avant la mise à jour.

## Ce qu'on crée (mode ECOM, règle d'acompte du coach)

Un **produit** : le nom de la mini-offre, sa description en une phrase.

Trois **prix** uniques (pas d'abonnement), en euros, sur ce produit :

| Prix | Montant | Libellé affiché |
|---|---|---|
| Acompte | 3 € (prix < 100 €) ou 10 € (100 à 500 €) | « Acompte : [mini-offre] (déduit du total) » |
| Tout payer | prix × 0,8, arrondi au centime | « [mini-offre] : payé en une fois (−20 %) » |
| Solde | prix − acompte | « Solde : [mini-offre] » |

Trois **liens de paiement**, un par prix, quantité 1, avec :

- **Après le paiement : redirection** vers
  - acompte : `https://[ADRESSE]/merci?offre=acompte&session_id={CHECKOUT_SESSION_ID}`
  - tout payer : `https://[ADRESSE]/merci?offre=tout&session_id={CHECKOUT_SESSION_ID}`
  - solde : `https://[ADRESSE]/merci?offre=solde&session_id={CHECKOUT_SESSION_ID}`
  
  (`{CHECKOUT_SESSION_ID}` est écrit tel quel : c'est Stripe qui le remplace.)
- **Collecte du téléphone** activée sur le lien d'acompte et le lien tout payer (le client recontacte ses acheteurs).
- **Message sous le bouton de paiement** (texte personnalisé) sur le lien d'acompte : « Le solde de [SOLDE] se paie après la livraison. »

Le lien **solde** n'est pas mis sur le site : le client l'envoie avec sa livraison (c'est le message de livraison validé dans la mini-offre).

## Mode LEAD

Crée les mêmes liens (le client les enverra après l'échange avec le prospect), mais aucun n'apparaît sur la page.

## L'offre principale (facultatif, seulement si le client le demande)

Un produit « [offre principale] » avec un prix **récurrent mensuel**, et un lien de paiement d'abonnement. Il ne va pas sur le site : le client l'envoie au moment du passage vers l'offre principale. Même règle : oui explicite avant de créer.

## Après la création

- Lis les liens créés (adresse `https://buy.stripe.com/...`) et colle-les dans le site (`{{STRIPE_LINK_ACOMPTE}}`, `{{STRIPE_LINK_TOUT}}`).
- Affiche-les au client dans le récap, avec leur montant.
- Ne fais jamais de paiement test avec une vraie carte à sa place. S'il veut tester, c'est lui qui paie, puis il se rembourse depuis son tableau de bord Stripe.

## Si le connecteur ne permet pas de créer les liens

Donne au client le chemin exact à faire lui-même : tableau de bord Stripe → **Liens de paiement** → **+ Nouveau** → produit, prix, puis onglet **Après le paiement** → « Ne pas afficher de page de confirmation » / rediriger vers l'adresse ci-dessus. Il colle ensuite les liens dans la conversation.
