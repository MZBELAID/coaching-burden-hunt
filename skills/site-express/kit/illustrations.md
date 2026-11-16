# Les visuels, gratuitement

Une page sans image fait « modèle vide ». Ici, tous les visuels sont gratuits : **des illustrations dessinées en SVG directement dans la page**, **les vraies photos du client** dans des cadres prévus, et **des motifs de fond en CSS**. Aucune banque d'images, aucun générateur payant, aucun fichier à héberger.

## Les règles strictes (aucune exception)

- **Jamais de visage ni d'yeux.** Ni personne, ni animal, ni mascotte, ni émoji à visage. Attention aux formes qui y ressemblent : deux ronds côte à côte avec un point au centre, un œuf coupé en deux, deux tomates cerises alignées. On dessine des objets, des décors, des mains s'il le faut vraiment (sans corps).
- **Jamais de signe religieux** (ni bâtiment religieux, ni symbole).
- **Jamais de drapeau**, ni forme qui en évoque un (un disque rouge sur fond blanc, trois bandes verticales de couleur…).
- **Pas de fausse capture d'écran** : ni faux tableau de bord, ni fausse conversation, ni fausse notification de vente.
- **Pas de faux avis** : pas d'étoiles, pas de « 4,9/5 », pas de citation, pas de logo de média ou de client qui n'existe pas.
- **Pas de chiffre inventé dans une image.** Une pastille peut reprendre un fait de l'offre validée (« Livré en 48 h », « 20 € »), rien d'autre.
- Les prénoms dessinés sur une étiquette sont des exemples d'usage, jamais des clients présentés comme réels.

## 1. Les illustrations SVG

### Ce qu'il faut dessiner

- **1 illustration de hero** : l'objet du résultat promis, en gros plan. On doit comprendre ce qu'on achète sans lire. Son format dépend du hero choisi (`themes.md`) :
  - `hero-droite`, `hero-gauche` : dessin avec son fond, `viewBox="0 0 600 540"`, `preserveAspectRatio="xMidYMid slice"`, dans `<figure class="hero-art art">` (le cadre suit le style des cartes).
  - `hero-affiche` : un objet seul, **sans fond ni cadre**, `viewBox="0 0 620 500"`, `preserveAspectRatio="xMidYMid meet"`, dans `<figure class="hero-art">`. Il se place sous le titre, jamais dessus.
  - `hero-centre` : une frise large (une rangée d'objets, une scène), sans fond, `viewBox="0 0 1440 300"`, `slice`, dans `<figure class="hero-art">`. Sur mobile on ne voit que le milieu : l'essentiel au centre.
  - `hero-bande` : soit un objet sans fond posé sur le panneau de couleur (`<figure class="hero-art">`, `meet`), soit un dessin haut qui remplit tout le panneau (`<figure class="hero-art plein">`, `viewBox` d'environ 600×770, `slice`).
- **1 monogramme ou objet du métier** pour « Qui je suis » quand il n'y a pas de photo : `viewBox="0 0 400 400"`. Jamais de visage dessiné.
- **3 petites illustrations d'étapes** : un objet par étape (ce que le visiteur fait, ce que je fais, ce qu'il reçoit). Format `viewBox="0 0 320 200"`, dans `<div class="step-art">`.

Mettre `preserveAspectRatio="xMidYMid slice"` : le dessin remplit toujours son cadre. Sur mobile, le hero est plus large que haut : **garder le sujet au centre**, et ne rien mettre d'important dans les 15 % du haut et du bas.

### Le style (le même que les cartes de la page)

- **Formes simples** : rectangles arrondis, cercles, ellipses, quelques courbes. Pas de dégradé réaliste, pas de perspective compliquée. La vue de dessus (« à plat ») est la plus facile à réussir.
- **Aplats de couleur** pris dans le thème : le fond du dessin en `--bg2` ou un ton voisin, l'objet principal dans les couleurs du thème, **une seule touche** de la couleur du bouton.
- **Le trait suit le style des cartes** : bord épais pour `cartes-dures` et `cartes-trait` ; trait fin ou pas de trait, ombres douces en ellipse, pour `cartes-douces` et `cartes-aplat`. Avec un bord épais : `stroke="<la couleur --line>" stroke-width="4"` à `6`, `stroke-linejoin="round"`.
- **Ombre dure** : la même forme, en dessous, décalée de 6 à 10 px, en encre à 20 % d'opacité. Jamais d'ombre floue.
- **Des détails qui donnent envie** : 2 ou 3 textures simples (des points, des traits courts), un reflet clair, une étiquette, une pastille ronde inclinée de 8 à 12°.
- **Le texte dans le dessin** reprend les polices du thème : `style="font-family:var(--font-display)"`.
- **Cohérence** : les 4 dessins partagent le même fond, la même épaisseur de trait, les mêmes couleurs.

Les couleurs s'écrivent en dur dans le SVG (`fill="#f0b23c"`) ou suivent le thème avec `style="fill:var(--gold)"` (l'attribut `fill="var(--gold)"` ne marche pas, il faut passer par `style`).

### Les briques de base

Un objet avec son bord et son ombre dure :

```html
<rect x="78" y="126" width="460" height="320" rx="36" fill="#2a1a0c" opacity=".22"/>   <!-- l'ombre, décalée -->
<rect x="70" y="110" width="460" height="320" rx="36" fill="#6b3a17" stroke="#2a1a0c" stroke-width="6"/>
```

Une texture qui se répète (chapelure, carreaux, vagues) : un `<pattern>` dans `<defs>`, puis `fill="url(#son-id)"`. Donner un préfixe aux `id` (par exemple `cz-`) pour qu'ils ne se mélangent pas entre deux dessins de la même page.

Une pastille :

```html
<g transform="rotate(10 504 84)">
  <circle cx="504" cy="84" r="66" fill="#f0b23c" stroke="#2a1a0c" stroke-width="5"/>
  <circle cx="504" cy="84" r="55" fill="none" stroke="#2a1a0c" stroke-width="2.5" stroke-dasharray="3 7" stroke-linecap="round"/>
  <text x="504" y="112" text-anchor="middle" font-size="36" fill="#2a1a0c" style="font-family:var(--font-display)">48 h</text>
</g>
```

### Un peu de vie (classes prêtes dans `kit.css`)

- `class="anim-float"` sur le groupe de l'objet principal : il flotte doucement.
- `class="anim-steam"` (+ `d2`, `d3` pour décaler) sur un trait de vapeur, de fumée ou d'étincelle : il monte et s'estompe, sans jamais disparaître.
- `class="anim-pulse"` sur une pastille HTML : un halo.

Tout s'arrête seul si le visiteur a demandé moins d'animations. Aucun dessin ne doit dépendre d'une animation pour être compris.

### Un exemple complet

Le même sujet dessiné de trois façons, une par design : `tests/coeurriz-v3/design-a/` (un grand bol vu de côté, sans cadre), `design-b/` (une rangée de boîtes à prénoms, en frise, sans trait), `design-c/` (la boîte vue de dessus qui remplit un panneau), avec leurs 3 étapes (le formulaire et la pièce de 20 €, la marmite, la pile de boîtes et l'horloge).

## 2. Les photos du client

Seulement de vraies photos fournies par le client : son produit, son atelier, son plat, ses mains au travail. Pas de visage reconnaissable si le client ne l'a pas demandé lui-même, et dans le doute, cadrer sur l'objet.

Le cadre prévu (bord épais + ombre dure, comme les cartes) :

```html
<figure class="art photo"><img src="atelier.jpg" alt="Le plan de travail, les outils rangés" width="1200" height="900" loading="lazy"></figure>
```

- `photo` = format 4:3 ; `photo sq` = carré. La photo est recadrée pour remplir le cadre.
- Dans le hero : `<figure class="hero-art art"><img …></figure>` à la place du SVG (sans `loading="lazy"`).
- Dans une carte d'avis : `<figure class="art photo sq">` au-dessus de la citation, seulement si l'auteur de l'avis a fourni sa photo.
- Poids : moins de 300 Ko par photo (JPEG ou WebP, 1 200 px de large suffisent). Le fichier est posé à côté de `index.html`.
- Toujours un `alt` qui décrit ce qu'on voit.

## 3. Les motifs de fond en CSS

Un motif discret sur le hero et sur le bloc final suffit à sortir du « fond uni ». Il se choisit avec une classe sur `<body>` et s'applique aux bandes qui portent `kz-motif` :

- `motif-vagues` (demi-cercles, façon vagues japonaises), `motif-pois`, `motif-rayures` (fines, en biais), `motif-grille` (papier, plan, carnet), ou `motif-aucun`.
- L'intensité se règle dans le thème : `--motif-force: 4%;` (de 3 à 7 %). Le motif doit rester à peine visible, jamais gênant derrière le texte.
- Un motif sur mesure reste possible : définir `--motif` dans le thème avec des dégradés CSS (`radial-gradient`, `repeating-linear-gradient`) et la couleur `var(--motif-c)`.

Le joint entre deux bandes fait aussi partie du décor : `joint-vagues` (festons), `joint-crans` (créneaux carrés), `joint-pointes` (dents de scie), `joint-biais` (grand biais) ou `joint-droit`, sur `<body>`.

## Avant de montrer la page

- Les 4 dessins se lisent en 1 seconde, sans légende ?
- Aucun visage, aucun œil, aucun signe religieux, aucun drapeau, même par accident ?
- Rien dans une image ne promet plus que l'offre validée ?
- Sur mobile, le sujet du hero est entier et centré ?
- Rien ne recouvre le titre, ni sur PC ni sur mobile ?
