# Les règles de design d'une page de vente

À relire avant de dessiner, puis une dernière fois devant les captures. Elles viennent des meilleurs guides de design gratuits (Anthropic frontend-design, Impeccable, landing-page-design, baseline-ui, cro), adaptées à ce kit.

## Avant de toucher au design

1. **Une offre, un public, une action.** Un seul bouton principal, le même libellé en haut et en bas.
2. **Tout le texte d'abord.** Le vrai contenu, dans les mots du client final. Rien d'inventé.
3. **Partir du sujet, pas d'un style.** Demande-toi : « aurais-je fait la même page pour un autre client ? » Si oui, recommence. Les couleurs, les motifs et l'illustration viennent du monde du client (son produit, sa ville, son métier).
4. **Un mini plan avant le code** : 4 à 6 couleurs nommées, les 2 polices et leur rôle, l'idée de l'illustration du hero.

## Le premier écran

5. **Le test des 5 secondes** : pour qui, le résultat (le titre), la phrase de l'offre, le prix, le bouton, la garantie. Tout visible sans défiler, sur PC et à 390 px de large.
6. **Le bouton = un verbe + ce qu'on obtient** (« Je réserve avec 20 € »). Jamais « Envoyer » ou « En savoir plus » sur le site.
7. **Une vraie illustration**, qui montre la promesse (le produit livré, le résultat). Jamais un espace vide, jamais une image générique.

## Typographie et couleurs

8. **Deux polices au plus**, choisies exprès pour ce client. Pas Inter, Roboto ni Arial.
9. **Une échelle de tailles fixe.** Texte de 16 px minimum sur mobile, lignes de 60 à 75 caractères sur PC, pas de mot seul sur la dernière ligne d'un titre.
10. **Une couleur dominante et un seul accent.** Le bouton a sa couleur à lui, utilisée nulle part ailleurs.
11. **Le contraste se vérifie sur le rendu** : 4,5:1 pour le texte, 3:1 pour les grands titres. Sur une bande colorée, le texte secondaire est une teinte de la bande, pas du gris.

## Les sections

12. **Une idée par section.** Les bandes de couleur alternent pour donner le rythme.
13. **Les espacements viennent d'une liste fermée** (multiples de 8). Plus d'espace au-dessus d'un titre qu'en dessous.
14. **La preuve colle à la promesse** : la garantie et les vrais avis près des boutons, les objections dans la FAQ.
15. **Pas de squelette par défaut** : pas trois cartes identiques « icône + titre + texte », pas de texte en dégradé, pas de verre flou, pas de bordure colorée d'un seul côté.

## Le mouvement

16. **Un seul moment fort** : l'entrée du hero. Pas le même fondu sur chaque section.
17. **Des micro-animations discrètes** : une carte qui se soulève de 2 px, environ 200 ms, seulement `transform` et `opacity`, et `prefers-reduced-motion` respecté. Rien ne doit rester invisible sans JavaScript.

## Mobile

18. **Vérifié à 390 px** : aucun défilement horizontal, des zones tactiles de 44 px, rien qui dépende du survol.

## Avant de montrer

19. **Regarde tes captures** (PC et mobile, le haut et la page entière) comme un directeur artistique : corrige ce qui déborde, ce qui est fade, ce qui est vide.
20. **Retire un élément décoratif.** Puis vérifie les liens légaux, le titre de l'onglet et la description de la page.
