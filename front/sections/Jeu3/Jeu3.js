import { Personnage } from "/classes/Jeu3/Personnage.js";
import { lvl_1 } from "/classes/Jeu3/Niveaux/lvl_1.js";


let engine = null;
let scene = null;


export function initBabylon() {
    let canvas = document.getElementById('canvasJeu3');
    if (!canvas) {
        console.error("Canvas non trouvé");
        return;
    }

    let engine = new BABYLON.Engine(canvas, true);
    let createScene = function(){
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();

        /*-----------------------------------------------------------------------------niveau1-----------------------------------------------------------------------------*/

        let niveau1 = new lvl_1(scene);
        niveau1.afficher();

        /*-----------------------------------------------------------------------------joueur-----------------------------------------------------------------------------*/
        let joueur = new Personnage(1.3, 1.5, scene);
        joueur.modele.position = niveau1.positionDepart;
   
        /*-----------------------------------------------------------------------------sol-----------------------------------------------------------------------------*/

        // let materiauSol = new BABYLON.StandardMaterial("materiauSol", scene);

        // materiauSol.bumpTexture = new BABYLON.Texture("/assets/normalMaps/nuages2.jpg", scene);
        // materiauSol.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.9);
        // materiauSol.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);

        // materiauSol.bumpTexture.uScale = 10; // Nombre de répétitions en largeur
        // materiauSol.bumpTexture.vScale = 10; // Nombre de répétitions en hauteur
        // materiauSol.bumpTexture.level = 10; // Augmente l'effet de relief
        

        // let sol = BABYLON.MeshBuilder.CreateGround("sol", { width: 500, height: 500 }, scene);
        // sol.material = materiauSol;


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

        let camera = new BABYLON.ArcRotateCamera("arcCamera", -Math.PI/2, Math.PI / 6, 50, joueur.modele.position, scene);
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

        // scene.actionManager.registerAction(
        //     new BABYLON.ExecuteCodeAction(
        //         { trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: " " },
        //         () => lumiere.setEnabled(!lumiere.isEnabled())
        //     )
        // );

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
