/*Le cœur du jeu. Il gère les niveaux, les collisions, 
les déplacements du joueur, les ennemis, les power-ups et l'affichage du score.
*/

// Liste des images de fond pour chaque niveau (constante globale)
const backgrounds = [
    "../../assets/Jeu2/backgrounds/1.jpg",
    "../../assets/Jeu2/backgrounds/2.jpg",
    "../../assets/Jeu2/backgrounds/3.jpg",
    "../../assets/Jeu2/backgrounds/4.jpg",
    "../../assets/Jeu2/backgrounds/5.jpg",
    "../../assets/Jeu2/backgrounds/6.jpg",
    "../../assets/Jeu2/backgrounds/7.jpg"
];

// Liste de musiques pour chaque thème
const musics = [
    "../../assets/Jeu2/musics/1.mp3",
    "../../assets/Jeu2/musics/2.mp3",
    "../../assets/Jeu2/musics/3.mp3",
    "../../assets/Jeu2/musics/4.mp3",
    "../../assets/Jeu2/musics/5.mp3",
    "../../assets/Jeu2/musics/6.mp3",
    "../../assets/Jeu2/musics/7.mp3"
];

const sounds = {
    collision: "../../assets/Jeu2/sounds/collision.mp3",
    powerUp: "../../assets/Jeu2/sounds/powerUp.mp3",
    levelUp: "../../assets/Jeu2/sounds/levelUp.mp3",
    victoire: "../../assets/Jeu2/sounds/victoire.mp3"
};


import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import ObjetSouris from "./ObjetSouris.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import Sortie from "./Sortie.js";
import ObjetSpecial from "./ObjetSpecial.js";
import PowerUp from "./PowerUp.js";
import Ennemi from "./Ennemi.js";
import Particle from "./Particles.js";

export default class Game {
    objetsGraphiques = [];
    niveau = 1;

    // Initialiser le score du joueur à 0
    score = 0;

    // Ajouter une propriété pour le temps de jeu 
    tempsRestant = 30; // Temps limite pour chaque niveau en secondes

    constructor(canvas,{ ecranInterface, messageInterface, btnDemarrer, boutonsFin }) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.ecranInterface = ecranInterface;
        this.messageInterface = messageInterface;
        this.btnDemarrer = btnDemarrer;
        this.boutonsFin = boutonsFin;

        // Gestion de l'état du jeu
        this.encours = false ;
        // etat du clavier et de la souris
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };

        // Charger l'image de fond
        this.backgroundImage = new Image();
        this.backgroundImage.src = backgrounds[(this.niveau - 1) % backgrounds.length];

        // Couleurs de fond en option si les images échouent
        this.background = ["#ADD8E6", "#FFD700", "#FF6347", "#8A2BE2", "#8A2BE2"];
        
        // Charger la musique de fond
        this.backgroundMusic = new Audio();
        // Demander la lecture de la musique au clic
        document.addEventListener("click", () => {
            if (this.encours && this.backgroundMusic.paused) {
                this.backgroundMusic.play().catch(error => console.error("Erreur lecture audio :", error));
            }
        });

        document.addEventListener("keydown", () => {
            if (this.encours && this.backgroundMusic.paused) {
                this.backgroundMusic.play().catch(error => console.error("Erreur lecture audio :", error));
            }
        });

        this.backgroundMusic.loop = true; // La musique tourne en boucle
        this.setMusic(); // Initialise la musique selon le niveau
    
        // Charger les effets sonores
        this.collisionSound = new Audio(sounds.collision);
        console.log("Chargement du son de collision :", this.collisionSound.src);
        this.powerUpSound = new Audio(sounds.powerUp);
        this.levelUpSound = new Audio(sounds.levelUp);
        this.victoireSound = new Audio(sounds.victoire);
    
    }

    // Méthode pour changer la musique de fond selon le niveau
    setMusic() {
        this.backgroundMusic.pause(); // Arrêter la musique en cours
        this.backgroundMusic.src = musics[this.niveau % musics.length];
        console.log("Lecture de la musique:", this.backgroundMusic.src);
    
        this.backgroundMusic.play().catch(error => {
            console.warn("Lecture bloquée. Attente d’une interaction utilisateur.");
        });
    }

    //Méthode pour stopper la musique de fond
    finDeJeu() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }

    // Méthode pour jouer l'effet sonore de collision
    jouerSonCollision() {
        this.collisionSound.pause(); // Met en pause si le son était en cours
        this.collisionSound.currentTime = 0; // Remet le son au début
        this.collisionSound.volume = 1.0; // Assure que le volume est bien actif
    
        this.collisionSound.play().catch(error => {
            console.warn("Lecture du son de collision bloquée :", error);
        });
    }

    // Méthode pour gérer l'écran de fin de jeu
    afficherEcranFin(message) {
        this.messageInterface.textContent = message;
        this.btnDemarrer.style.display = "none";
        this.boutonsFin.style.display = "flex";
        this.ecranInterface.style.display = "flex";
        this.enCours = false;
        this.finDeJeu(); 

        if (this.intervalTemps) {
            clearInterval(this.intervalTemps);
        }
    }
    
    

    jouerSonVictoire() {
        this.victoireSound.play(); // Jouer l'effet sonore de victoire
    }


    async init() {
        this.ctx = this.canvas.getContext("2d");

        this.drawAllObjects();

        this.player = new Player(this.canvas.width * 0.1, this.canvas.height * 0.1);
        this.objetsGraphiques.push(this.player);

        // Un objert qui suite la souris, juste pour tester
        this.objetSouris = new ObjetSouris(200, 200, 25, 25, "orange");
        this.objetsGraphiques.push(this.objetSouris);

        this.initNiveau(this.niveau);

        this.collisionSound.addEventListener("canplaythrough", () => {
            console.log("Son de collision prêt à être joué !");
        });

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    initNiveau(niveau) {

        // Supprimer les anciens obstacles et la sortie
        this.objetsGraphiques = this.objetsGraphiques.filter(obj => !(obj instanceof Obstacle || obj instanceof Sortie || obj instanceof ObjetSpecial));

        // Réinitialiser la position du joueur
        this.player.x = this.canvas.width * 0.1;
        this.player.y = this.canvas.height * 0.1;

        // zone de début pour eviter de mettre des obstacles dessus
        const startZone = {
            x: this.player.x - this.player.w / 2,
            y: this.player.y - this.player.h / 2,
            w: this.player.w * 2,
            h: this.player.h * 2
        };

        // generation des obstacles
        for (let i = 0; i < niveau; i++) {
            let obstacle;
            do {
                obstacle = new Obstacle(
                    Math.random() * this.canvas.width * 0.8,
                    Math.random() * this.canvas.height * 0.8,
                    40 + Math.random() * 90,
                    80 + Math.random() * 60,
                    "red"
                );
            } while (rectsOverlap(obstacle.x, obstacle.y, obstacle.w, obstacle.h, startZone.x, startZone.y, startZone.w, startZone.h));
            this.objetsGraphiques.push(obstacle);
        }

        // Ajouter la sortie
        this.sortie = new Sortie(this.canvas.width * 0.9, this.canvas.height * 0.5, 100, 100, "purple");
        this.objetsGraphiques.push(this.sortie);

        // Ajout l'objet spécial avec une probabilité de 20% à partir du niveau 5
        if (niveau >= 5 && Math.random() < 0.2) {
            let objetSpecial;
            do {
                objetSpecial = new ObjetSpecial(
                    Math.random() * this.canvas.width * 0.8,
                    Math.random() * this.canvas.height * 0.8,
                    30,
                    30,
                    "lightblue"
                );
            } while (rectsOverlap(objetSpecial.x, objetSpecial.y, objetSpecial.w, objetSpecial.h, startZone.x, startZone.y, startZone.w, startZone.h));
            this.objetsGraphiques.push(objetSpecial);
        }
        
        // Ajout du power-up avec une probabilité de 30% 
        if(Math.random() < 0.3) {
            const powerUp = new PowerUp(
                Math.random() * this.canvas.width * 0.8,
                Math.random() * this.canvas.height * 0.8,
                30,
                30,
                "green"
            );
            this.objetsGraphiques.push(powerUp);
        }
        // Réinitialser le temps de jeu pour le niveau
        this.tempsRestant = 30; // 30 secondes pour chaque niveau

        // Création des ennemis
        const ennemi = new Ennemi(200, 200, 40, 40, "black",this.canvas);
        this.objetsGraphiques.push(ennemi);
        
        // Changer l'image de fond pour le niveau actuel
        this.backgroundImage.src = backgrounds[this.niveau % backgrounds.length];
    
        // Changer la musique de fond pour le niveau actuel
        //this.setMusic();
    }

    resizeCanvas() {
        this.objetsGraphiques = [];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        if (this.enCours) return; 
        this.enCours = true;

        console.log("Game démarré");

        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.init(); // Re-initialize objects on resize
        });
        
        this.tempsRestant = 30;

        this.setMusic();

        this.intervalTemps = setInterval(() => {
            if (!this.enCours) return;
            if (this.tempsRestant > 0) {
               this.tempsRestant--;
            } else {
            this.afficherEcranFin("⏰ Temps écoulé ! Vous avez perdu !");
            }
        }, 1000);

        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        if (!this.enCours) return;
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        // Dessiner l'image de fond
        if (this.backgroundImage.complete) {
            this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            // Couleur de secours si l'image ne charge pas
            this.ctx.fillStyle = this.background[this.niveau % this.background.length];
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });

        // Dessiner le score et le temps
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Score: " + this.score, 10, 30);
        this.ctx.fillText(`Temps restant: ${this.tempsRestant}s`, 10, 50);
    }

    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        
        // Déplacement du joueur. 
        this.movePlayer();

        // on met à jour la position de objetSouris avec la position de la souris
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;

        // On regarde si le joueur a atteint la sortie
        this.testCollisionPlayerSortie();

        // On regarde si le joueur a atteint l'objet spécial
        this.testCollisionPlayerObjetSpecial();

        //Effet du power-up sur le joueur
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof PowerUp && rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
            console.log ("Power-up ramassé !"); 
            this.powerUpSound.play(); // Jouer l'effet sonore du power-up

            //Génération de particules
            for (let i = 0; i < 20; i++) {
                const vitesseX = (Math.random() - 0.5) * 4;
                const vitesseY = (Math.random() - 0.5) * 4;
                const taille = Math.random() * 5 + 2;
                const couleur = "orange";
                const particle = new Particle(obj.x + obj.w / 2, obj.y + obj.h / 2, couleur, taille, vitesseX, vitesseY);
                this.objetsGraphiques.push(particle);
            }

            //Réduire sa largeur de 05% et sa hauteur de 05%
            this.player.w *= 0.9;
            this.player.h *= 0.9;
            
            // Augmenter le score du joueur de 5 points
            this.score += 5;
            
            // Supprimer le power-up
            this.objetsGraphiques.splice(this.objetsGraphiques.indexOf(obj), 1); // Supprimer le power-up
            }
        });

        // Ajout d'un appel à la méthode move() pour les ennemis 
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Ennemi) {
                obj.move();
                if (rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    this.jouerSonCollision(); 
                    setTimeout(() => { 
                        this.afficherEcranFin("Collision avec un ennemi ! Vous avez perdu !"); 
                    }, 200); 
                }
            }
        });

        // Mise à jour des particules
        this.objetsGraphiques = this.objetsGraphiques.filter(obj => {
            if (obj instanceof Particle) {
                obj.move();
                return obj.dureeDeVie > 0; // Supprimer les particules après leur durée de vie
            }
            return true;
        });
    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        if(this.inputStates.ArrowRight) {
            this.player.vitesseX = 6;
        } 
        if(this.inputStates.ArrowLeft) {
            this.player.vitesseX = -6;
        } 

        if(this.inputStates.ArrowUp) {
            this.player.vitesseY = -6;
        } 

        if(this.inputStates.ArrowDown) {
            this.player.vitesseY = 6;
        } 

        this.player.move();

        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/2 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w/2;
        }
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;
        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    testCollisionPlayerSortie() {
        if (this.sortie && rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, this.sortie.x, this.sortie.y, this.sortie.w, this.sortie.h)) {
            this.levelUpSound.play(); // Jouer l'effet sonore du passage au niveau suivant
            this.niveau++;
            this.initNiveau(this.niveau);
            this.score += 100; // Augmenter le score de 100 point
            if (this.niveau > 7) {
                this.jouerSonVictoire();
                this.afficherEcranFin("🎉 Bravo, vous avez gagné !");
                return;
            }            
            this.initNiveau(this.niveau);
        }
    }

    testCollisionPlayerObjetSpecial() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof ObjetSpecial) {
                if (rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    this.score += 50;
                    this.niveau++;
                    this.initNiveau(this.niveau);
                }
            }
        });
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Obstacle) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // collision
                    console.log("Collision avec obstacle");
                    
                    // on remet le joueur à sa position de départ
                    if (this.player.x < obj.x) {
                        this.player.x = obj.x - this.player.w / 2;
                    } else if (this.player.x > obj.x + obj.w) {
                        this.player.x = obj.x + obj.w + this.player.w / 2;
                    }
    
                    if (this.player.y < obj.y) {
                        this.player.y = obj.y - this.player.h / 2;
                    } else if (this.player.y > obj.y + obj.h) {
                        this.player.y = obj.y + obj.h + this.player.h / 2;
                    }
    
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;
                }
            }
        });
    }

}