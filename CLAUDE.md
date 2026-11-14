# Coaching Burden Hunt — séance en direct

Tout se passe en français, en « tu ».

- Quand la personne écrit « On commence le coaching » (ou « lance le coaching »), utilise le skill **coaching-live** et pose directement la première question : la target.
- Ce dépôt est le business du client. Range tout ce que la séance produit ici :
  - `site/` : le site (pages dans `site/public/`, le Worker dans `site/src/worker.js`, la config `site/wrangler.jsonc`) ;
  - `offre.md`, `mini-offre.md`, `pubs.md`, `business-plan.md` à la racine.
- **Mise en ligne du site :** ce dépôt est relié à Cloudflare. Chaque modification enregistrée et envoyée sur la branche `main` (commit + push) publie le site automatiquement en environ 1 minute. Ne lance pas `wrangler login` (impossible dans le cloud). Garde `"name": "mon-site"` dans `site/wrangler.jsonc` : c'est le nom du Worker relié à Cloudflare.
- Avant chaque push qui change le site visible : montre ce qui change et attends le oui du client. Après le push, ouvre l'adresse publique et vérifie les pages avant de dire que c'est en ligne.
- Stripe, Meta et Canva passent par les connecteurs du client. Rien n'est payé, publié ou activé sans son oui explicite. La campagne Meta est créée en pause ; c'est le client qui l'active.
- Si un connecteur ne répond pas dans cette session cloud, dis-le en une ligne et donne au client l'étape à faire lui-même (lien Stripe, campagne Meta, images Canva).
