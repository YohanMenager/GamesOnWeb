// import * as BABYLON from "/modules/babylonjs/babylon.js";
// import { SkyMaterial } from "/modules/babylonjs-materials/babylon.skyMaterial.min.js";
// import 'babylonjs-materials';
// console.log(BABYLON);


window.addEventListener("keydown", function(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
    }
});

export function initBabylon() {
    let canvas = document.getElementById('canvasJeu3');
    if (!canvas) {
        console.error("Canvas non trouvé ! Assurez-vous que l'élément existe dans le DOM.");
        return;
    }

    let engine = new BABYLON.Engine(canvas, true);
    let createScene = function(){
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();


        /*-----------------------------------------------------------------------------création des objets-----------------------------------------------------------------------------*/
        let box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);
        let box2 = BABYLON.Mesh.CreateBox("Box2", 4.0, scene);
        box.position.y = 2;

        let material = new BABYLON.StandardMaterial("material1", scene);
        material.wireframe = true;
        box2.material = material;
        box2.position.x = 5;
        
        let material2 = new BABYLON.StandardMaterial("material2", scene);
        material2.diffuseColor = new BABYLON.Color3(0.2, 0, 0);
        material2.emissiveColor = new BABYLON.Color3(0, 0, 0);
        material2.diffuseTexture = new BABYLON.Texture("/assets/textures/texture1.jpg", scene);
        material2.bumpTexture = new BABYLON.Texture("/assets/normalMaps/normalMap1.jpg", scene);
        box.material = material2;

        // Charger la texture des nuages
        // let textureNuage = new BABYLON.Texture("/assets/textures/nuages.jpg", scene);
        // textureNuage.bumpTexture = new BABYLON.Texture("/assets/normalMaps/nuages.jpg", scene);

        /*-----------------------------------------------------------------------------sol-----------------------------------------------------------------------------*/

        let materiauSol = new BABYLON.StandardMaterial("materiauSol", scene);

        materiauSol.bumpTexture = new BABYLON.Texture("/assets/normalMaps/nuages2.jpg", scene);
        materiauSol.diffuseColor = new BABYLON.Color3(1, 1, 1);
        // materiauSol.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);

        materiauSol.bumpTexture.uScale = 10; // Nombre de répétitions en largeur
        materiauSol.bumpTexture.vScale = 10; // Nombre de répétitions en hauteur
        materiauSol.bumpTexture.level = 1; // Augmente l'effet de relief
        

        let sol = BABYLON.MeshBuilder.CreateGround("sol", { width: 500, height: 500 }, scene);
        sol.material = materiauSol;


        /*-----------------------------------------------------------------------------skybox-----------------------------------------------------------------------------*/

        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/assets/textures/skybox/ciel", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

        // skyboxMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5); 


        /*-----------------------------------------------------------------------------caméra-----------------------------------------------------------------------------*/

        let camera = new BABYLON.FollowCamera("followCamera", BABYLON.Vector3.Zero(), scene);
        camera.lockedTarget = box;
        camera.radius = 10;
        camera.heightOffset = 0;
        camera.attachControl(canvas, true);

        let inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger, evt => inputMap[evt.sourceEvent.key] = true
        ));

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger, evt => inputMap[evt.sourceEvent.key] = false
        ));

        scene.onBeforeRenderObservable.add(() => {
            let speed = 0.1;
            if (inputMap["z"]) box.position.z += speed;
            if (inputMap["s"]) box.position.z -= speed;
            if (inputMap["q"]) box.position.x -= speed;
            if (inputMap["d"]) box.position.x += speed;
        });


        /*-----------------------------------------------------------------------------lumière-----------------------------------------------------------------------------*/
        let lumiere = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        // lumiere.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
        lumiere.intensity = 0.7;

        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                { trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: " " },
                () => lumiere.setEnabled(!lumiere.isEnabled())
            )
        );

        return scene;
    };

    let scene = createScene();
    engine.runRenderLoop(() => scene.render());
}

if (typeof BABYLON === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://cdn.babylonjs.com/babylon.js";
    script.onload = function() {
        console.log("Babylon.js chargé !");
        initBabylon();
    };
    document.head.appendChild(script);
} else {
    initBabylon();
}
