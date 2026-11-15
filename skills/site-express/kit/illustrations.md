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

- **1 illustration de hero** : l'objet du résultat promis, en gros plan. On doit comprendre ce qu'on achète sans lire. Format `viewBox="0 0 600 540"`, dans `<figure class="hero-art art">`.
- **3 petites illustrations d'étapes** : un objet par étape (ce que le visiteur fait, ce que je fais, ce qu'il reçoit). Format `viewBox="0 0 320 200"`, dans `<div class="step-art">`.

Mettre `preserveAspectRatio="xMidYMid slice"` : le dessin remplit toujours son cadre. Sur mobile, le hero est plus large que haut : **garder le sujet au centre**, et ne rien mettre d'important dans les 15 % du haut et du bas.

### Le style (le même que les cartes de la page)

- **Formes simples** : rectangles arrondis, cercles, ellipses, quelques courbes. Pas de dégradé réaliste, pas de perspective compliquée. La vue de dessus (« à plat ») est la plus facile à réussir.
- **Aplats de couleur** pris dans le thème : le fond du dessin en `--bg2` ou un ton voisin, l'objet principal dans les couleurs du thème, **une seule touche** de la couleur du bouton.
- **Bord épais partout** : `stroke="<la couleur --line>" stroke-width="4"` à `6`, `stroke-linejoin="round"`.
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

`tests/coeurriz-v2/site/public/index.html` : une boîte de curry japonais vue de dessus (riz, katsu, légumes, étiquette au prénom, baguettes, serviette à carreaux, vapeur) et 3 étapes (le formulaire et la pièce de 20 €, la marmite, la pile de boîtes et l'horloge).

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

Un motif discret sur le hero et sur le bloc final suffit à sortir du « fond uni ». On l'écrit dans le thème (`--motif`), puis on ajoute la classe `kz-motif` sur la bande. Il doit rester à peine visible : 4 à 6 % d'encre, jamais derrière un long texte foncé.

Des vagues (comme la démo) :

```css
--motif-c: color-mix(in srgb, var(--ink) 4.5%, transparent);
--motif: radial-gradient(circle at 50% 100%, transparent 0 10px, var(--motif-c) 10px 12px, transparent 12px 18px, var(--motif-c) 18px 20px, transparent 20px) 0 0 / 56px 28px,
         radial-gradient(circle at 50% 100%, transparent 0 10px, var(--motif-c) 10px 12px, transparent 12px 18px, var(--motif-c) 18px 20px, transparent 20px) 28px 14px / 56px 28px;
```

Des pois :

```css
--motif: radial-gradient(circle, color-mix(in srgb, var(--ink) 9%, transparent) 2px, transparent 2.5px) 0 0 / 22px 22px;
```

Des rayures fines en biais :

```css
--motif: repeating-linear-gradient(135deg, color-mix(in srgb, var(--ink) 5%, transparent) 0 2px, transparent 2px 14px);
```

Un quadrillage (papier, plan, carnet) :

```css
--motif: linear-gradient(color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px) 0 0 / 28px 28px,
         linear-gradient(90deg, color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px) 0 0 / 28px 28px;
```

Le joint entre deux bandes fait aussi partie du décor : `joint-vagues` (festons), `joint-crans` (créneaux carrés) ou `joint-droit`, sur `<body>`.

## Avant de montrer la page

- Les 4 dessins se lisent en 1 seconde, sans légende ?
- Aucun visage, aucun œil, aucun signe religieux, aucun drapeau, même par accident ?
- Rien dans une image ne promet plus que l'offre validée ?
- Sur mobile, le sujet du hero est entier et centré ?
