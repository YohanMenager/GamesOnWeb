// import * as BABYLON from 'babylonjs';
import { SkyMaterial } from "babylonjs-materials";


window.addEventListener("keydown", function(event) {
    // Empêcher le scroll avec les flèches directionnelles et la barre espace
    // j'ajoute ça pour pouvoir contrôler la caméra sans scroller la page, ce qui serait pénible
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
    }
});

if (typeof BABYLON === 'undefined') {
    const script = document.createElement('script');
    script.src = "http://cdn.babylonjs.com/2-4/babylon.max.js";
    script.onload = function() {
        console.log("Babylon.js chargé !");
        initBabylon(); 
    };
    document.head.appendChild(script);
} else {
    initBabylon();
}

function initBabylon() {
    let canvas = document.getElementById('canvasJeu3');

    let engine = new BABYLON.Engine(canvas, true);
    let createScene = function(){
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();


        let box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);
        let box2 = BABYLON.Mesh.CreateBox("Box2", 4.0, scene);

        let material = new BABYLON.StandardMaterial("material1", scene);
        material.wireframe=true;
        box2.material = material;
        box2.position.x = 5;
        
        let material2 = new BABYLON.StandardMaterial("material2", scene);
        material2.diffuseColor = new BABYLON.Color3(0.2, 0, 0);
        material2.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        // material2.alpha = 0.3;//transparence
        material2.diffuseTexture = new BABYLON.Texture("/assets/textures/texture1.jpg", scene);//texture
        material2.bumpTexture = new BABYLON.Texture("/assets/normalMaps/normalMap1.jpg", scene);//normalMap
        box.material = material2;


        let skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        skyMaterial.backFaceCulling = false; // Visible des deux côtés
        skyMaterial.luminance = 0.8; // Luminosité des nuages
        skyMaterial.turbidity = 8; // Densité des nuages

        // Appliquer la texture sur un cube ou un plan
        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);
        ground.material = skyMaterial;



        // let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(5, 10, -10), scene);
        // camera.setTarget(BABYLON.Vector3.Zero());

        // let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, box.position, scene);

        let camera = new BABYLON.FollowCamera("followCamera", BABYLON.Vector3.Zero(), scene);
        camera.lockedTarget = box;
        camera.radius = 10;
        camera.heightOffset = 0;


        //--------------------------------------------contrôle de la caméra--------------------------------------------//
        camera.attachControl(canvas, true);


        // camera.keysUp.push(90);
        // camera.keysDown.push(83);
        // camera.keysLeft.push(81);
        // camera.keysRight.push(68);

        //--------------------------------------------contrôle de la boîte--------------------------------------------//
            let inputMap = {}; // Stocke les touches pressées
            scene.actionManager = new BABYLON.ActionManager(scene);

            // Écoute les touches appuyées
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
                    inputMap[evt.sourceEvent.key] = true;
                }
            ));

            // Écoute les touches relâchées
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyUpTrigger, function(evt) {
                    inputMap[evt.sourceEvent.key] = false;
                }
            ));

            // Mise à jour des mouvements à chaque frame
            scene.onBeforeRenderObservable.add(() => {
                let speed = 0.1; // Vitesse de déplacement

                if (inputMap["z"]) {  // Avancer
                    box.position.z += speed;
                }
                if (inputMap["s"]) {  // Reculer
                    box.position.z -= speed;
                }
                if (inputMap["q"]) {  // Gauche
                    box.position.x -= speed;
                }
                if (inputMap["d"]) {  // Droite
                    box.position.x += speed;
                }
            });
        //--------------------------------------------fin contrôle de la boîte--------------------------------------------//

        //--------------------------------------------lumière--------------------------------------------//
        
        let light = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
        light.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger : BABYLON.ActionManager.OnKeyUpTrigger, parameter: " "
                },
                function()
                {
                    light.setEnabled(!light.isEnabled());
                }
            )
        );


        //--------------------------------------------fin lumière--------------------------------------------//
        
        return scene;
    };

    let scene = createScene();
    engine.runRenderLoop(function(){
        // scene.getMeshByName("Box").rotation.x += 0.01;
        // light = scene.getLightByName("light1");
        // light.diffuse.g += 0.001;
        // light.diffuse.b += 0.001;
        // light.diffuse.r -= 0.01;
        scene.render();
    });
}