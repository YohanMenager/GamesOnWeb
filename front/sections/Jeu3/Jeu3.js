import { ChargeurDreamz } from "/classes/Jeu3/ChargeurDreamz.js";
import { MenuDreamz } from "/classes/Jeu3/MenuDreamz.js";
import { Timer } from '/classes/Timer.js';
import { GestionPoints } from "../../classes/GestionPoints.js";

let engine = null;
let scene = null;


export function initBabylon() {
    let canvas = document.getElementById('canvasJeu3');
    if (!canvas) {
        console.error("Canvas non trouvé");
        return;
    }

    let engine = new BABYLON.Engine(canvas, true);
    /**
     * Cette fonction initialise la scène Babylon.
     * note : J'aurais pu créer une scène par niveau, mais cela fait plus de chargement et c'est moins optimisé,
     * en particulier pour un jeu de type labyrinthe où les niveaux sont très similaires.
     * @returns {BABYLON.Scene}
     */
    let createScene = async function(){
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();

        scene.collisionsEnabled = true; // Active la gestion des collisions globalement, utile pour que le joueur ne soit pas à moitié dans les murs en cas de collisions

        // scene.gravity = new BABYLON.Vector3(0, -0.5, 0); // Gravité pour les collisions
        /*-----------------------------------------------------------------------------chargement-----------------------------------------------------------------------------*/

        const chargeur = new ChargeurDreamz(scene);



        const menu = new MenuDreamz(chargeur);
        await menu.init();
        chargeur.hud.menu = menu;
        menu.demarrerNiveau(0);

        /*-----------------------------------------------------------------------------skybox-----------------------------------------------------------------------------*/

        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/assets/textures/skybox/espace", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

        // skyboxMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5); 


        /*-----------------------------------------------------------------------------caméra-----------------------------------------------------------------------------*/

        //j'utilise une caméra arcrotate pour pouvoir tourner autour du joueur
        //j'utilise un arcrotate car je veux que la caméra soit toujours à la même hauteur,
        //et contrairement à la followcamera, ça part pas dans tous les sens au moindre mouvement
        let camera = new BABYLON.ArcRotateCamera("Camera", 5*Math.PI/4, Math.PI/4, 25, chargeur.joueur.hitbox.position, scene);
        // chargeur.camera = camera;
        // camera.attachControl(canvas, true);//pour faire des tests, doit être désactivé en production
       

        /*-----------------------------------------------------------------------------lumière-----------------------------------------------------------------------------*/
        let lumiere = new BABYLON.HemisphericLight("lumiere", new BABYLON.Vector3(0, 1, 0), scene);
        // lumiere.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
        lumiere.intensity = 0.7;


        
                              
       

         /*-----------------------------------------------------------------------------collisions-----------------------------------------------------------------------------*/
         chargeur.joueur.hitbox.onCollideObservable.add((otherMesh) => {
            if(otherMesh.metadata?.instance?.constructor.name == "Bonus")
            {
                GestionPoints.ajouterPoints(otherMesh.metadata.instance.points);
                if(otherMesh.metadata?.type != "Sortie") {
                    otherMesh.metadata.instance.dispose()
                }
            }
            if(otherMesh.metadata?.type=="Sortie")
            {
                
                otherMesh.metadata.instance.desactiverSortie();
                menu.niveauTermine(chargeur.niveau.getNumero());
            }
            if (otherMesh.metadata?.type === "Ennemi")
            {
                chargeur.mort();
            }
    });

    


    /*-----------------------------------------------------------------------------événements à chaque frame-----------------------------------------------------------------------------*/
        
    scene.onBeforeRenderObservable.add(() => {
        if(chargeur.hud)
        {
            chargeur.hud.setTemps(Timer.getFormattedTimeWithHours());
            chargeur.hud.setScore(GestionPoints.getPoints());
        }
        if(chargeur.niveau)
        {
            /*-------------------------------------------------------------------vérifier si la sortie peut être activée-------------------------------------------------------------------*/
            let nbBonusRequis = 0;
            let sortie = null
            for(const objet of chargeur.niveau.objets)
            {
                if(objet.requis)
                {
                    nbBonusRequis++;
                }
                else if((objet.nom == "Sortie"))
                {
                    sortie = objet;
                }
            }
            if(sortie)
            {
                if(nbBonusRequis == 0)
                {
                    sortie.activerSortie()
                }
                else
                {
                    sortie.desactiverSortie()
                }
            }
            chargeur.hud.setNbCleTrouve(chargeur.niveau.nbCle - nbBonusRequis, chargeur.niveau.nbCle);


            /*-------------------------------------------------------------------éviter la chute-------------------------------------------------------------------*/
            if(chargeur.joueur.hitbox.position.y < -100)
                {
                    chargeur.mort();
                }    
            /*-------------------------------------------------------------------comportement ennemis-------------------------------------------------------------------*/
        
            for (const ennemi of chargeur.niveau.ennemis) {
                if (ennemi.mesh) {
                    //trouver la direction du joueur
                    const direction = directionJoueur(chargeur.joueur.hitbox.position, ennemi.hitbox.position);
                    let distance = distance2D(chargeur.joueur.hitbox.position, ennemi.hitbox.position);
                    //si le joueur est à moins de 40 unités de l'ennemi, il se déplace vers lui
                    if (distance < 40) {
                        // ennemi.hitbox.moveWithCollisions(direction.normalize().scaleInPlace(-0.05));
                        ennemi.seDeplacer(direction.normalize());
                    }
                    else
                    {
                        if(ennemi.walk && ennemi.idle)
                        {
                            ennemi.walk.stop();
                            ennemi.idle.start(true);
                        }
                    }

                    
                    
                }
            }            
        }
 
    });





        return scene;
    };

    createScene().then((scene) => {
        engine.runRenderLoop(() => scene.render());
    });
    
}

function distance2D(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.z - p2.z) ** 2);
}

function directionJoueur(joueur, ennemi) {
    return new BABYLON.Vector3(joueur.x - ennemi.x, 0, joueur.z - ennemi.z);
}

// if (typeof BABYLON === 'undefined') {
//     const script = document.createElement('script');
//     script.src = "https://cdn.babylonjs.com/babylon.js";
//     script.onload = function() {
//         console.log("Babylon.js chargé !");
//         initBabylon();
//     };
//     document.head.appendChild(script);
// } 
// else {
//     initBabylon();
// }
