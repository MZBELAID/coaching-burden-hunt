# Publier le site sur Cloudflare

Trois chemins, dans cet ordre :

1. **Principal : le connecteur Cloudflare (MCP)**, depuis la conversation Claude : un seul Worker avec toutes les pages dedans + `/api/geo` (chemin 2 ci-dessous).
2. **Seulement si la séance tourne dans un terminal (onglet Code) : `npx wrangler deploy`** (chemin 1 ci-dessous).
3. **Dernier recours : glisser-déposer** sur Cloudflare Pages, fait par le client.

**Rien n'est publié sans le oui explicite du client, après l'aperçu.**

---

## Chemin 1 · Wrangler (principal)

### 1. Préparer le dossier

Dans le dossier de travail du client, crée `site/` :

```
site/
├── wrangler.jsonc        ← templates/wrangler/wrangler.jsonc (remplir "name")
├── src/worker.js         ← templates/wrangler/src/worker.js (tel quel)
└── public/               ← les fichiers remplis de templates/site/ :
    index.html, merci.html, mentions-legales.html, cgv.html, livraison-retours.html,
    confidentialite.html, cookies.html, gerer-mes-cookies.html, consent.js, pixels.js
```

Vérifie qu'aucun fichier de `public/` ne contient encore `{{` (cherche-le dans le dossier).

### 2. Vérifier les outils (lecture seulement)

- `node -v` : si Node.js manque, dis au client de l'installer (nodejs.org, version LTS), puis de rouvrir l'onglet Code. Ne l'installe pas toi-même sans son accord.
- `npx wrangler whoami` : s'il n'est pas connecté, demande-lui de lancer **`npx wrangler login`** (ou de te laisser le lancer) : une page Cloudflare s'ouvre dans son navigateur, **c'est lui qui se connecte et clique sur « Autoriser »**. Tu ne vois jamais son mot de passe. S'il a plusieurs comptes, `whoami` les liste : demande lequel, et ajoute `"account_id"` dans `wrangler.jsonc`.

### 3. L'aperçu en local

`npx wrangler dev` dans `site/` → l'aperçu tourne sur `http://localhost:8787`. Le client l'ouvre dans son navigateur (et sur son téléphone en réduisant la fenêtre). C'est l'aperçu de l'étape 7 du skill. `/api/geo` répond aussi en local.

### 4. (Mode LEAD seulement) le stockage des demandes

Après un oui : `npx wrangler kv namespace create LEADS`. Copie l'`id` affiché dans le bloc `kv_namespaces` de `wrangler.jsonc` (décommente-le).

### 5. Publier (après « Oui, publie »)

`npx wrangler deploy` dans `site/`. Wrangler affiche l'adresse : `https://[nom].[sous-domaine].workers.dev`.

- Premier Worker du compte : Wrangler peut demander de choisir un sous-domaine workers.dev. Montre la question au client, c'est lui qui choisit.
- Domaine du client géré dans son Cloudflare (facultatif, avec un oui) : décommente `routes` avec `"custom_domain": true`, puis redéploie.

### 6. Vérifier (lecture seulement)

1. Ouvre l'adresse publique (par exemple avec `curl -I`) : la page d'accueil répond 200.
2. Ouvre `/api/geo` : un JSON avec `mode`.
3. Ouvre `/mentions-legales`, `/cgv`, `/livraison-retours`, `/confidentialite`, `/cookies`, `/gerer-mes-cookies`, `/merci`.
4. Dis au client : « Ouvre [adresse] sur ton téléphone. » En France, le bandeau cookies apparaît après environ 4 secondes (c'est voulu).

Ne déclare jamais le site « en ligne » sans avoir lu la réponse de l'adresse publique.

### 7. Les liens Stripe

Si les liens de paiement ont été créés sans page de retour (adresse pas encore connue), mets maintenant à jour leur page de retour vers `https://[adresse]/merci?offre=…&session_id={CHECKOUT_SESSION_ID}` (voir `paiement-stripe.md`), avec un oui.

### Si Wrangler échoue

Lis le message d'erreur, corrige une fois ce qui est évident (nom déjà pris, `account_id` manquant, fichier manquant). Si ça bloque encore : ne réessaie pas en boucle, passe au chemin 2 et dis-le en une ligne.

---

## Chemin 2 · Le connecteur Cloudflare (secours)

Le site devient **un seul script** avec les pages embarquées (pas d'assets à téléverser).

1. Construis le script : `python templates/build_worker.py site/public templates/worker.js worker-unique.js` (il refuse s'il reste un `{{...}}`).
2. Lecture : trouve l'`account_id` et le sous-domaine (`GET /accounts/{account_id}/workers/subdomain`).
3. Mode LEAD, après un oui : `POST /accounts/{account_id}/storage/kv/namespaces` avec `{"title": "[nom]-leads"}`.
4. Après « Oui, publie » : `PUT /accounts/{account_id}/workers/scripts/{nom}` en `multipart/form-data` :
   - `metadata` : `{"main_module": "worker.js", "compatibility_date": "2025-01-01", "bindings": []}` (mode LEAD : `[{"type": "kv_namespace", "name": "LEADS", "namespace_id": "[id]"}]`) ;
   - `worker.js` : le contenu de `worker-unique.js`, type `application/javascript+module`.
5. `POST /accounts/{account_id}/workers/scripts/{nom}/subdomain` avec `{"enabled": true}`.
6. Domaine du client (facultatif, oui) : `PUT /accounts/{account_id}/workers/domains` avec `{"hostname": "[domaine]", "service": "[nom]", "zone_id": "[id]", "environment": "production"}`.
7. Vérifie comme au chemin 1, étape 6.

Si l'outil du connecteur ne permet pas l'envoi multipart ou renvoie une erreur : chemin 3.

---

## Chemin 3 · Glisser-déposer sur Cloudflare Pages (dernier recours)

1. Le dossier `site/public/` est prêt dans le dossier de travail. Ouvre-le pour le client (ou indique son chemin exact).
2. Le client fait lui-même : tableau de bord Cloudflare → **Workers & Pages** → **Créer** → onglet **Pages** → **Téléverser des fichiers** → nom du projet → il glisse le dossier `public` → **Déployer**.
3. Adresse : `https://[projet].pages.dev`. Pages sert `cgv.html` à l'adresse `/cgv`.
4. Ce qui change :
   - pas de `/api/geo` : le bandeau cookies demande l'accord à tout le monde (mode prudent prévu par `consent.js`) ;
   - pas de `/api/lead` : en mode LEAD, le formulaire ouvre un email pré-rempli vers le client.
5. Mets à jour la page de retour des liens Stripe vers cette adresse (avec un oui) avant de lancer les pubs.

---

## Lire les demandes (mode LEAD)

- En ligne de commande : `npx wrangler kv key list --binding LEADS --remote`, puis `npx wrangler kv key get "[clé]" --binding LEADS --remote`.
- Ou dans le tableau de bord : **Stockage et bases de données → KV → LEADS**.
