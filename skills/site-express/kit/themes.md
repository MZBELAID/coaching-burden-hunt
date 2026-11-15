# Écrire un thème

Un thème, c'est **deux petits blocs** à coller dans chaque page du site (`index.html`, `merci.html` et les 6 pages légales), à l'endroit marqué « THÈME » :

1. la ligne `<link>` des polices Google Fonts ;
2. le bloc `:root { … }` dans `<style id="theme">`.

Et une classe sur `<body>` pour la forme du joint entre les bandes : `joint-vagues`, `joint-crans` ou `joint-droit`.

On ne touche jamais à `kit.css`. Tout ce qui change d'un client à l'autre passe par ces variables.

## Les variables

| Variable | À quoi elle sert |
|---|---|
| `--bg` | Fond principal : le hero, la FAQ |
| `--bg2` | 2e fond, un peu plus soutenu : la bande « ce que vous recevez », les avis |
| `--card` | Fond des cartes |
| `--ink` / `--ink2` | Texte principal / texte secondaire |
| `--band-dark` | La bande foncée (« comment ça marche »), la barre du haut, le pied de page |
| `--on-dark` / `--on-dark2` | Texte / texte secondaire sur la bande foncée |
| `--accent` | Sur-titres, numéros de la FAQ, cadre de la garantie (sur fond clair) |
| `--band-accent` / `--on-accent` | La bande de couleur (« pour qui ») et son texte |
| `--cta` / `--cta-dk` / `--cta-ink` | LE bouton, sa tranche (plus foncée), son texte |
| `--gold` / `--gold-ink` | La couleur de surlignage : liseré sous la barre du haut, mots surlignés sur les bandes foncées, pastilles, coches |
| `--line` | Les bords épais des cartes |
| `--ok` | Le vert des coches « pour vous si » (facultatif ; à éclaircir sur un thème sombre) |
| `--font-display` / `--font-body` | Police des titres / police du texte |
| `--h-weight`, `--h-lh`, `--h-track`, `--h-case` | Graisse, interligne, espacement et casse des titres |
| `--h-scale` | Taille des titres : `1` par défaut, `0.8` pour une police très large, `1.15` pour une police étroite |
| `--radius` | Arrondi des cartes et du bouton (`0px` = angles droits) |
| `--bw` | Épaisseur des bords (2 à 4 px) |
| `--sh` | Décalage de l'ombre dure (`0px` = pas d'ombre) |
| `--motif`, `--motif-o` | Facultatif : un motif de fond en CSS pour les bandes qui portent la classe `kz-motif` (voir `illustrations.md`) |

## Les contraintes (à vérifier avant de montrer la page)

- **Contraste AA.** `--ink` sur `--bg`, `--bg2` et `--card` : au moins 7:1. `--ink2` sur ces mêmes fonds : au moins 4,5:1. `--on-dark` sur `--band-dark` et `--on-accent` sur `--band-accent` : au moins 7:1. `--accent` sur `--bg` : au moins 4,5:1 (il sert à du petit texte).
- **Le bouton se lit.** `--cta-ink` sur `--cta` : au moins 4,5:1. Si le bouton est clair (jaune, menthe), le texte du bouton est foncé.
- **Un seul bouton de couleur.** `--cta` ne sert qu'au bouton et aux mots surlignés des titres clairs. Aucun autre élément cliquable n'a cette couleur.
- **Bouton ≠ accent.** `--cta` et `--accent` sont deux teintes nettement différentes (rouge et vert, jaune et violet…). `--gold` est une 3e teinte.
- **`--cta-dk` est le bouton en plus foncé** (même teinte, 25 à 35 % plus sombre) : c'est la tranche qui donne l'effet « bouton à enfoncer ».
- **Deux polices, pas plus.** Une police de titre qui a du caractère, une police de texte très lisible. Vérifier que la police de titre a bien les accents français (é, è, à, ç, œ).
- **La lisibilité d'abord.** Si une police de titre fait déborder le H1 du hero, baisser `--h-scale` avant de raccourcir le texte.
- **Le hero tient sans scroller** sur PC (1440×900) et sur mobile (390×844) : à revérifier après chaque changement de police.

## Trois thèmes d'exemple

### 1. « Atelier » · clair, chaleureux, éditorial

Pour un artisan, un consultant, un service « fait main ». C'est le thème déjà en place dans `page.html`.

`<body class="joint-vagues has-sticky">`

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=DM+Sans:wght@400;600;800&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #f7f2e8; --bg2: #ece3d1; --card: #fffdf8;
  --ink: #1c1b22; --ink2: #4b4856;
  --band-dark: #1f2a44; --on-dark: #eef1f8; --on-dark2: #c2c9dc;
  --accent: #2c6e63; --band-accent: #1d5148; --on-accent: #eaf5f2;
  --cta: #d1442a; --cta-dk: #8f2a17; --cta-ink: #ffffff;
  --gold: #f2b84b; --gold-ink: #1c1b22; --line: #1c1b22;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --h-weight: 900; --h-lh: 1.04; --h-track: -0.015em; --h-case: none; --h-scale: 1;
  --radius: 10px; --bw: 3px; --sh: 7px;
}
```

### 2. « Nuit néon » · sombre, net, technique

Pour un service numérique, un studio, une offre de nuit ou de jeu. Tout le site est foncé ; le bouton est clair, donc son texte est foncé.

`<body class="joint-crans has-sticky">`

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --bg: #14151c; --bg2: #1c1e29; --card: #232634;
  --ink: #f3f1ea; --ink2: #bdbab0;
  --band-dark: #0b0c11; --on-dark: #f3f1ea; --on-dark2: #aeaca4;
  --accent: #7ee0c3; --band-accent: #2b2f6b; --on-accent: #eef0ff;
  --cta: #ff6a45; --cta-dk: #b53218; --cta-ink: #14151c;
  --gold: #ffd166; --gold-ink: #14151c; --line: #f3f1ea;
  --ok: #5fd38a;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --h-weight: 700; --h-lh: 1.02; --h-track: -0.03em; --h-case: none; --h-scale: 1.05;
  --radius: 4px; --bw: 2px; --sh: 6px;
}
```

### 3. « Studio pop » · clair, vif, joyeux

Pour une offre grand public, un cours, un service pour les familles. Fond bleu glacé, violet franc, bouton jaune (texte foncé), très arrondi.

`<body class="joint-vagues has-sticky">`

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
}
/* bouton jaune : un mot jaune sur fond clair serait illisible, les mots surlignés des bandes claires passent en violet */
.kz:not(.kz-dark):not(.kz-accent) { --hl: var(--accent); }
```

Règle générale : si `--cta` est une couleur claire, garder cette dernière ligne dans le thème.

## Un 4e exemple, réel : le thème de la démo Coeurriz

« Comptoir curry » (crème, brun curry, vert matcha, bouton rouge tomate, Dela Gothic One + Zen Maru Gothic, `--h-scale: 0.8` parce que la police de titre est très large) : voir le haut de `tests/coeurriz-v2/site/public/index.html`.

## Inventer un thème pour un client

1. Partir du monde du client (son métier, sa ville, ses matières) : 2 couleurs qui viennent de là + 1 fond clair ou foncé.
2. Choisir la teinte du bouton en dernier : celle qui tranche le plus avec le reste.
3. Copier un des blocs ci-dessus, changer les valeurs, garder toutes les lignes.
4. Faire les captures PC et mobile (voir `README.md`) et les regarder : texte lisible partout, bouton qui saute aux yeux, hero qui tient.
