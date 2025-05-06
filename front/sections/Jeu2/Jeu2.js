/*Gère l'initialisation du jeu (window.onload), ajuste la taille du canvas, et démarre Game.js.
*/
import Game from "/classes/Jeu2/Game.js";
import { loadSection } from "../../index.js";   

let game = null;
// Bonne pratique : avoir une fonction appelée une fois
// que la page est prête, que le DOM est chargé, etc.
window.onload = init;

const ecranInterface = document.getElementById("ecran-interface");
const messageInterface = document.getElementById("message-interface");
const btnDemarrer = document.getElementById("btn-demarrer");
const btnRejouer = document.getElementById("btn-rejouer");
const btnArreter = document.getElementById("btn-arreter");
const boutonsFin = document.getElementById("boutons-fin");

export async function init() {
   // On recupère le canvas
   const canvas = document.querySelector("#myCanvas");
    console.log("initialisation du jeu");
   // On cree une instance du jeu
   game = new Game(canvas, {
    ecranInterface,
    messageInterface,
    btnDemarrer,
    boutonsFin
});

    // ici on utilise await car la méthode init est asynchrone
    // typiquement dans init on charge des images, des sons, etc.
    await game.init();

    // on peut démarrer le jeu
    //game.start();

    // Initial resize
     // Initial resize
     resizeCanvas();

     function loopBeforeStart() {
        if (!game.enCours) {
            game.drawAllObjects();
            requestAnimationFrame(loopBeforeStart);
        }
    }
    loopBeforeStart();


    }
    
    function resizeCanvas() {
        const canvas = document.getElementById('myCanvas');
        canvas.width = window.innerWidth - 20;
        canvas.height = window.innerHeight - 20;
    }
    
    // Resize the canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);
    
    
    btnDemarrer.addEventListener("click", () => {
        ecranInterface.style.display = "none";
        if (game) {
            game.start(); 
        }
    });
    
    btnRejouer.addEventListener("click", () => {
        loadSection("Jeu2");
    });
    
    btnArreter.addEventListener("click", () => {
        loadSection("Accueil");
    });