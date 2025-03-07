import { Personnage } from "/classes/Jeu3/Personnage.js";
import { ChargeurDreamz } from "/classes/Jeu3/ChargeurDreamz.js";
import { MenuDreamz } from "/classes/Jeu3/MenuDreamz.js";

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
    let createScene = function(){
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();

        /*-----------------------------------------------------------------------------chargement-----------------------------------------------------------------------------*/

        const chargeur = new ChargeurDreamz(scene);
        const menu = new MenuDreamz(chargeur, 1);
        menu.afficherMenu();
        menu.demarrerNiveau(1);

        
        scene.collisionsEnabled = true; // Active la gestion des collisions globalement, utile pour que le joueur ne soit pas à moitié dans les murs en cas de collisions

        /*-----------------------------------------------------------------------------joueur-----------------------------------------------------------------------------*/
        let joueur = new Personnage(1.1, 1.3, scene);
        joueur.hitbox.position = chargeur.niveau.positionDepart;
        console.log(chargeur.niveau.positionDepart);
        console.log(joueur.hitbox.position);
   



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
        let camera = new BABYLON.ArcRotateCamera("arcCamera", -Math.PI/2, Math.PI / 6, 50, joueur.hitbox.position, scene);
        camera.attachControl(canvas, true);//pour faire des tests
        /*-----------------------------------------------------------------------------clavier-----------------------------------------------------------------------------*/

        let inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger, evt => inputMap[evt.sourceEvent.key] = true
        ));

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger, evt => inputMap[evt.sourceEvent.key] = false
        ));

        let mv = new BABYLON.Vector3(0, 0, 0);
        scene.onBeforeRenderObservable.add(() => {
            
            if (inputMap["z"]) mv.z = 1;
            if (inputMap["s"]) mv.z = -1;
            if (inputMap["q"]) mv.x = -1;
            if (inputMap["d"]) mv.x = 1;

            // mv.y = -1;//si on veut mettre la gravité

            joueur.seDeplacer(mv);
            // console.log(joueur.modele.position);

            mv.x = 0;
            mv.z = 0;

            if(!(inputMap["z"] || inputMap["s"] || inputMap["q"] || inputMap["d"])) {
                joueur.vitesse = 0.1;
            }

        });


        /*-----------------------------------------------------------------------------lumière-----------------------------------------------------------------------------*/
        let lumiere = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        // lumiere.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
        lumiere.intensity = 0.7;


        return scene;
    };

    let scene = createScene();
    engine.runRenderLoop(() => scene.render());
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
