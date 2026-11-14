# Installer le coaching (Claude dans le cloud + GitHub)

**Avant la séance (15 min, une seule fois) :**

1. Crée un compte **GitHub** (github.com, gratuit) et un compte **Cloudflare** (cloudflare.com, gratuit).
2. Ouvre le modèle du coaching sur GitHub → **Use this template → Create a new repository** → nom : `mon-business`, **Private**.
3. Dans **Cloudflare → Workers & Pages → Create → Import a repository** : connecte GitHub, choisis `mon-business`.
   - Project name : **mon-site**
   - Root directory : **site**
   - Deploy command : `npx wrangler deploy`
   → Deploy. L'adresse du site s'affiche (`mon-site.xxx.workers.dev`).
4. Sur **claude.ai** (compte **Pro**) → **Paramètres → Connecteurs** : connecte **Stripe**, **Meta (publicités)** et **Canva**.

**Le jour de la séance :**

5. Va sur **claude.ai/code**, connecte GitHub si on te le demande, choisis le dépôt **mon-business**.
6. Écris : **« On commence le coaching »**. Claude pose la première question : la target.

Chaque fois que Claude enregistre le site, il se met en ligne tout seul en environ 1 minute.
