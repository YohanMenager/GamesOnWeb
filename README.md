# GamesOnWeb


## lancer le projet :
Le site est disponible à [cette adresse](https://games-on-web-omega.vercel.app).



Pour le lancer après l'avoir cloné, il faut aller dans le dossier back et lancer les commandes suivantes:

      npm install
  
      npm start
  
assurez-vous d'avoir le port 4000 libre.


## Jeu 2 : Jeu Canvas 

### Description 
Ce jeu exploite <canvas> pour les graphismes et diverses interactions. Il comprend la gestion des niveaux, des collisions, des écouteurs d’événements, des ennemis autonomes, des objets interactifs, des bonus et un système de particules. La logique du jeu est intégrée à Game.js, qui orchestre les règles de progression et d’interaction.

### Fonctionnalités 
- Gestion complète du jeu (Game.js) :
  - Gestion des niveaux avec progression et nouveaux éléments à chaque étape.
  - Chronomètre limitant le temps par niveau.
  - Système de score évolutif.
  - Détection avancée des collisions entre objets.
  - Gestion du joueur : mouvements fluides et interactions.
  - Gestion des ennemis : déplacement autonome et test de collision avec le joueur.
  - Power-ups et objets spéciaux modifiant la taille du joueur et augmentant le score.
  - Effets sonores dynamiques (collision, victoire, power-up, changement de niveau).
  - Animation fluide avec requestAnimationFrame.

- Interface utilisateur interactive avec boutons pour démarrer, rejouer et arrêter le jeu.
- Capture des entrées utilisateur : Prise en compte du clavier (keydown, keyup) et de la souris (mousemove).
- Personnalisation du fond : Changement de l’image de fond et de la musique selon le niveau.
- Système de particules : Effets visuels lors de certains événements.
- Fonctions utilitaires :
  - Dessin rapide de cercles.
  - Création de grilles pour le positionnement des objets.
- Redimensionnement dynamique : Mise à jour automatique du canvas en cas de changement de taille de la fenêtre.

### Dépendances
Le jeu repose sur plusieurs modules :
- Game.js : Cœur du jeu (niveaux, collisions, musique, score).
- collisions.js : Gestion des interactions entre objets.
- écouteurs.js : Capture des entrées utilisateur.
- Ennemi.js : Déplacement et rendu des ennemis.
- ObjectGraphique.js : Classe de base pour les objets graphiques.
- Modules d’objets interactifs : ObjetSouris.js, ObjetSpecial.js, Obstacle.js, PowerUp.js, Sortie.js.
- Particles.js : Génération d’effets visuels dynamiques.
- Player.js : Gestion du personnage joueur.
- utils.js : Fonctions de rendu graphique.

### Utilisation

- Démarrer le jeu : Cliquez sur Démarrer.
- Rejouer : Réinitialise la page.
- Arrêter : Redirige vers une page externe.

#### Comment gagner des points ?

Le joueur peut accumuler des points de différentes manières :
- Atteindre la sortie : Chaque fois que le joueur atteint la sortie, il passe au niveau suivant et gagne 100 points.
- Ramasser un objet spécial : Ces objets bonus rapportent 50 points et permettent aussi de monter de niveau.
- Ramasser un power-up : Cela rapporte 5 points et réduit légèrement la taille du joueur, ce qui peut l’aider à éviter les obstacles.

#### Comment perdre le jeu ?
Le joueur peut perdre de différentes façons :
- Temps écoulé : Chaque niveau est limité à 30 secondes. Si le joueur n’atteint pas la sortie avant la fin du temps, il perd et voit apparaître un écran de fin.
- Collision avec un ennemi : Si le joueur entre en contact avec un ennemi, il perd instantanément et un message s’affiche indiquant la défaite.
- Sortie du jeu volontaire : Si le joueur clique sur le bouton Arrêter, il est redirigé vers une page externe et la partie s’arrête.

#### Objectif du jeu
- Le jeu comporte 7 niveaux. Pour gagner, le joueur doit atteindre la sortie du niveau 7.
- Si le joueur réussit à passer tous les niveaux, il entend un son de victoire et voit un message de félicitations.



## crédits
### assets 3D
Urotsuki par [uosew](https://www.fab.com/sellers/uosew/about)
squelettes par [Romulo Lima](https://www.fab.com/sellers/Romulo%20Lima/about)
