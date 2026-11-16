# Écrire le design d'un client

Un design, c'est **trois choses** à poser dans chaque page du site (`index.html`, `merci.html` et les 6 pages légales), aux endroits marqués « THÈME » et « DESIGN » :

1. la ligne `<link>` des polices Google Fonts ;
2. le bloc de variables `:root { … }` dans `<style id="theme">` (couleurs, polices, formes) ;
3. **une valeur par axe**, en classes sur `<body>` (mise en page du hero, style des cartes, barre du haut, bouton…).

On ne touche jamais à `kit.css`. Tout ce qui change d'un client à l'autre passe par ces variables et ces classes.

## Les trois règles qui ne bougent pas

1. **Fond clair, texte foncé, toujours.** Le hero et toutes les grandes surfaces de lecture (ce que vous recevez, qui je suis, la FAQ) sont claires, avec un texte foncé. Une bande foncée ou colorée reste possible comme accent (les étapes, « pour qui », le pied de page), jamais plus de deux dans la page, jamais deux à la suite. Il n'y a pas de thème sombre.
2. **Deux clients n'ont jamais le même trio hero + cartes + barre.** Avant de choisir, regarde les sites déjà faits : si un autre client a déjà `hero-droite` + `cartes-dures` + `barre-foncee`, change au moins deux des trois. Et ne reprends jamais le design de `exemple/index.html`.
3. **Rien ne recouvre jamais le titre.** Ni l'illustration, ni une pastille, ni un motif épais. L'illustration peut déborder de son cadre vers le bas ou sur le côté, jamais sur le H1.

## Les axes et leurs valeurs

Une classe par ligne sur `<body>` (la première valeur est celle par défaut). Garder aussi `has-sticky`.

| Axe | Classes sur `<body>` | Ce que ça change |
|---|---|---|
| **Hero** | `hero-droite` | Texte à gauche, illustration encadrée à droite |
| | `hero-gauche` | Illustration encadrée à gauche, texte à droite |
| | `hero-centre` | Tout centré, illustration en frise sur toute la largeur, collée au bas du hero |
| | `hero-affiche` | Titre géant sur toute la largeur ; dessous, le texte et le bouton à gauche, l'illustration sans cadre à droite |
| | `hero-bande` | Texte sur fond clair à gauche, illustration dans un grand panneau de couleur qui touche les bords (`--hero-panel`) |
| **Cartes** | `cartes-dures` | Bord épais + ombre dure décalée |
| | `cartes-douces` | Pas de bord, ombre douce |
| | `cartes-trait` | Trait fin, à plat, sans ombre |
| | `cartes-aplat` | Aplat de couleur ton sur ton, ni bord ni ombre |
| **Barre du haut** | `barre-foncee` | Fond `--band-dark`, texte clair |
| | `barre-claire` | Fond `--bg`, texte foncé |
| | `barre-accent` | Fond `--band-accent` |
| | + `barre-lisere-fin` ou `barre-sans-lisere` | Liseré de 2 px, ou pas de liseré (sans rien : liseré épais de 6 px) |
| **Bouton** | `bouton-rectangle` | Suit `--radius` |
| | `bouton-pilule` | Bouts ronds |
| | `bouton-coupe` | Deux coins coupés, angles droits |
| | + `bouton-plat` ou `bouton-doux` | Sans ombre, ou ombre douce (sans rien : tranche dure « à enfoncer ») |
| **Mot fort des titres** | `fort-couleur` | Le mot fort prend la couleur du bouton |
| | `fort-souligne` | Le mot fort est souligné d'un trait épais |
| | `fort-surligne` | Le mot fort est surligné (fond `--gold`) |
| **Joint entre les bandes** | `joint-vagues` · `joint-crans` · `joint-pointes` · `joint-biais` · `joint-droit` | Festons, créneaux carrés, dents de scie, grand biais, ou rien |
| **Motif de fond** | `motif-aucun` · `motif-vagues` · `motif-pois` · `motif-rayures` · `motif-grille` | Motif très léger sur les bandes qui portent `kz-motif` (le hero, le bloc final) |
| **Comment ça marche** | `etapes-ligne` | 3 cartes côte à côte |
| | `etapes-frise` | Frise verticale : numéros sur un fil, illustration à droite |
| | `etapes-zigzag` | Une étape par rangée, grande illustration une fois à gauche, une fois à droite |
| **Pour qui** | `pq-colonnes` | Deux cartes côte à côte |
| | `pq-liste` | Pas de cartes : deux listes à grosses pastilles, séparées par des traits |

Les axes qui se règlent dans le bloc de variables :

| Variable | Valeurs | Ce que ça change |
|---|---|---|
| `--h-case` | `none` ou `uppercase` | Titres en minuscules ou en capitales |
| `--h-weight` | `400` à `900` | Graisse des titres |
| `--h-scale` | `0.8` à `1.15` | Taille des titres (`0.8` pour une police très large, `1.1` pour une police étroite) |
| `--h-lh`, `--h-track` | | Interligne et espacement des lettres des titres |
| `--radius` | `0px` à `28px` | Coins droits ou très ronds (cartes, bouton rectangle, champs) |
| `--bw` | `2px` à `4px` | Épaisseur des bords (`cartes-dures`) |
| `--sh` | `0px` à `10px` | Décalage de l'ombre dure (`cartes-dures`) |
| `--cta-font`, `--cta-weight`, `--cta-case` | | Police du bouton, si elle doit différer de celle des titres (ex. `var(--font-body)` et `800`) |
| `--hero-panel` | une couleur claire ou vive | Fond du panneau de `hero-bande` |
| `--motif-force` | `3%` à `7%` | Intensité du motif de fond |
| `--no` | une couleur foncée | Couleur du « pas pour vous » ; par défaut celle du bouton, à définir si le bouton est clair |

La couleur de chaque bande se choisit dans la page, sur la balise de la section : `kz` (fond `--bg`), `kz kz-b` (`--bg2`), `kz kz-gold` (jaune pâle), `kz kz-accent` (`--band-accent`), `kz kz-dark` (`--band-dark`). Deux bandes voisines n'ont jamais la même couleur. Le hero, « ce que vous recevez », « qui je suis » et la FAQ restent sur `kz`, `kz-b` ou `kz-gold`.

Sur `merci.html` et les pages légales, reprendre les classes de cartes, de barre et de bouton : `<body class="doc cartes-trait barre-claire barre-lisere-fin bouton-coupe">`.

## Les couleurs et les polices (le bloc de variables)

| Variable | À quoi elle sert |
|---|---|
| `--bg` / `--bg2` | Les deux fonds clairs |
| `--card` | Fond des cartes |
| `--ink` / `--ink2` | Texte principal / texte secondaire (foncés) |
| `--band-dark`, `--on-dark`, `--on-dark2` | La bande foncée, la barre foncée, le pied de page, et leur texte |
| `--accent` | Sur-titres, numéros de la FAQ, cadre de la garantie (sur fond clair) |
| `--band-accent`, `--on-accent` | La bande de couleur et son texte |
| `--cta`, `--cta-dk`, `--cta-ink` | LE bouton, sa tranche (plus foncée), son texte |
| `--gold`, `--gold-ink` | La couleur de surlignage : liseré, pastilles, coches, mot fort sur bande foncée |
| `--line` | Les bords et les traits |
| `--font-display` / `--font-body` | Police des titres / police du texte |

Si la bande de couleur est **claire** (un vert tendre, un bleu pâle), ajouter dans le thème : `--on-accent` foncé, `--hl-accent: var(--cta);`, `--line-accent: var(--line);` et `--shadow-accent: color-mix(in srgb, var(--ink) 24%, transparent);`. Ne pas y poser les étapes.

## Les contraintes (à vérifier avant de montrer la page)

- **Contraste.** `--ink` sur `--bg`, `--bg2` et `--card` : au moins 7:1. `--ink2` sur ces fonds : au moins 4,5:1. `--on-dark` sur `--band-dark` et `--on-accent` sur `--band-accent` : au moins 7:1. `--accent` sur `--bg` : au moins 4,5:1.
- **Le bouton se lit.** `--cta-ink` sur `--cta` : au moins 4,5:1. Bouton clair → texte du bouton foncé, et ajouter dans le thème `.kz:not(.kz-dark):not(.kz-accent) { --hl: var(--accent); }` (un mot jaune sur fond clair ne se lit pas).
- **Un seul bouton de couleur.** `--cta` ne sert qu'au bouton et au mot fort des titres.
- **Bouton ≠ accent.** `--cta`, `--accent` et `--gold` sont trois teintes nettement différentes.
- **Deux polices, pas plus**, avec les accents français (é, è, à, ç, œ). Si le H1 déborde, baisser `--h-scale` avant de raccourcir le texte.
- **Le hero tient sans défiler** à 1440×900 et à 390×844, bouton visible, quel que soit le hero choisi : à revérifier sur captures.

## Cinq designs d'exemple

Ils servent à voir l'écart attendu entre deux clients. Ne jamais en livrer un tel quel : changer au moins la palette, les polices et deux axes.

### 1. « Affiche » · papier, encre noire, capitales, angles droits

Pour un commerce de bouche, un artisan qui a du caractère, un événement.

`<body class="hero-affiche cartes-trait barre-claire barre-lisere-fin bouton-coupe fort-souligne joint-droit motif-grille etapes-frise pq-liste has-sticky">`

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;600;800&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f6f1e7; --bg2: #ebe3d2; --card: #fffdf7;
  --ink: #15120e; --ink2: #4a433a;
  --band-dark: #15120e; --on-dark: #f6f1e7; --on-dark2: #cfc7b8;
  --accent: #1e4d7a; --band-accent: #1e3a5f; --on-accent: #f1f5fb;
  --cta: #d8381b; --cta-dk: #8f1f0b; --cta-ink: #ffffff;
  --gold: #f3b62f; --gold-ink: #15120e; --line: #15120e;
  --font-display: "Anton", "Arial Narrow", Impact, sans-serif;
  --font-body: "Work Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --h-weight: 400; --h-lh: 1.02; --h-track: 0.005em; --h-case: uppercase; --h-scale: 1.12;
  --radius: 0px; --bw: 2px; --sh: 0px;
  --motif-force: 4%;
}
```

### 2. « Douceur » · blanc cassé, vert tendre, tout en rondeurs

Pour un service à la personne, le bien-être, la petite enfance, la cuisine maison.

`<body class="hero-centre cartes-douces barre-accent barre-sans-lisere bouton-pilule bouton-doux fort-surligne joint-vagues motif-pois etapes-zigzag pq-colonnes has-sticky">`

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Nunito:wght@400;600;800&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #fdf9f1; --bg2: #f3eee0; --card: #ffffff;
  --ink: #23302a; --ink2: #51605a;
  --band-dark: #2f4a3a; --on-dark: #f2f7f0; --on-dark2: #cfe0d2;
  --accent: #3a7245; --band-accent: #e2efd6; --on-accent: #23302a;
  --hl-accent: var(--cta); --line-accent: var(--line); --shadow-accent: color-mix(in srgb, var(--ink) 24%, transparent);
  --cta: #d43f27; --cta-dk: #9c2a17; --cta-ink: #ffffff;
  --gold: #f8cd5a; --gold-ink: #23302a; --line: #23302a;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Nunito", system-ui, -apple-system, "Segoe UI", sans-serif;
  --h-weight: 700; --h-lh: 1.06; --h-track: -0.015em; --h-case: none; --h-scale: 1.04;
  --cta-font: var(--font-body); --cta-weight: 800;
  --radius: 26px; --bw: 2px; --sh: 0px;
  --motif-force: 6%;
}
```

### 3. « Comptoir » · crème, brun, bords épais et ombres dures

Pour un restaurant, une échoppe, un produit gourmand.

`<body class="hero-bande cartes-dures barre-foncee bouton-rectangle fort-couleur joint-pointes motif-vagues etapes-ligne pq-colonnes has-sticky">`

```html
<link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f8efdc; --bg2: #efdfc0; --card: #fffaf0;
  --ink: #2a1a0c; --ink2: #5a4430;
  --band-dark: #3b2110; --on-dark: #fbf1dd; --on-dark2: #e6d3b3;
  --accent: #486a2a; --band-accent: #375322; --on-accent: #f4f7e8;
  --cta: #c8372d; --cta-dk: #8c1f17; --cta-ink: #ffffff;
  --gold: #f0b23c; --gold-ink: #2a1a0c; --line: #2a1a0c;
  --font-display: "Dela Gothic One", "Arial Black", system-ui, sans-serif;
  --font-body: "Zen Maru Gothic", "Nunito", system-ui, -apple-system, "Segoe UI", sans-serif;
  --h-weight: 400; --h-lh: 1.14; --h-track: -0.01em; --h-case: none; --h-scale: 0.8;
  --radius: 16px; --bw: 3px; --sh: 7px;
  --hero-panel: var(--gold); --motif-force: 4.5%;
}
```

### 4. « Cabinet » · lin, bleu nuit, aplats calmes, grand biais

Pour un consultant, un coach, un métier du conseil ou du soin.

`<body class="hero-gauche cartes-aplat barre-foncee barre-sans-lisere bouton-rectangle bouton-plat fort-couleur joint-biais motif-rayures etapes-ligne pq-liste has-sticky">`

```html
<link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=DM+Sans:wght@400;600;800&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f5f1ea; --bg2: #e9e2d6; --card: #fbf8f3;
  --ink: #1b2233; --ink2: #4a5163;
  --band-dark: #1f2a44; --on-dark: #eef1f8; --on-dark2: #c2c9dc;
  --accent: #2c6e63; --band-accent: #1d5148; --on-accent: #eaf5f2;
  --cta: #bf4722; --cta-dk: #862f14; --cta-ink: #ffffff;
  --gold: #e8b85a; --gold-ink: #1b2233; --line: #1b2233;
  --font-display: "Young Serif", Georgia, serif;
  --font-body: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --h-weight: 400; --h-lh: 1.08; --h-track: -0.01em; --h-case: none; --h-scale: 0.96;
  --cta-font: var(--font-body); --cta-weight: 800;
  --radius: 6px; --bw: 2px; --sh: 0px;
  --motif-force: 3.5%;
}
```

### 5. « Studio pop » · bleu glacé, violet franc, bouton jaune

Pour une offre grand public, un cours, un service pour les familles.

`<body class="hero-droite cartes-dures barre-accent barre-lisere-fin bouton-pilule fort-surligne joint-crans motif-pois etapes-zigzag pq-colonnes has-sticky">`

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Figtree:wght@400;600;800&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f2f6ff; --bg2: #dfe8ff; --card: #ffffff;
  --ink: #101536; --ink2: #454a6b;
  --band-dark: #1b1f5e; --on-dark: #eef0ff; --on-dark2: #c3c8f0;
  --accent: #6a2bd9; --band-accent: #5a21c2; --on-accent: #f5efff;
  --cta: #ffcf24; --cta-dk: #c29500; --cta-ink: #101536;
  --gold: #7df0c8; --gold-ink: #101536; --line: #101536;
  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-body: "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif;
  --h-weight: 800; --h-lh: 1; --h-track: -0.02em; --h-case: none; --h-scale: 1.05;
  --radius: 22px; --bw: 3px; --sh: 6px;
  --motif-force: 6%;
}
/* bouton jaune : les mots forts des bandes claires passent en violet, et le « pas pour vous » en framboise */
.kz:not(.kz-dark):not(.kz-accent) { --hl: var(--accent); }
:root { --no: #c2264b; }
```

Les trois premiers existent en vrai, avec les mêmes textes : `tests/coeurriz-v3/design-a/`, `design-b/`, `design-c/` et leurs captures.

## Inventer le design d'un client

1. Partir du monde du client (son métier, sa ville, ses matières) : 2 couleurs qui viennent de là + 1 fond clair. La teinte du bouton en dernier : celle qui tranche le plus.
2. Choisir le hero d'après l'illustration qu'on a en tête : un objet seul → `hero-affiche` ou `hero-droite` ; une scène ou une rangée d'objets → `hero-centre` ; un dessin qui remplit tout → `hero-bande`.
3. Choisir une valeur pour chaque autre axe, en vérifiant la règle du trio (hero + cartes + barre jamais déjà vus ensemble).
4. Copier le bloc de variables le plus proche, changer les valeurs, garder toutes les lignes.
5. Faire les captures PC et mobile (voir `README.md`) et les regarder : texte lisible partout, bouton qui saute aux yeux, hero qui tient, rien sur le titre.
