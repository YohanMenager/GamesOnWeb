import { Entite } from './Entite.js';

/**
 * classe du joueur
 */
export class Personnage extends Entite {
    /**
     * 
     * @param {*} vitesse vitesse de déplacement
     * @param {*} vitesseMax vitesse maximale
     * @param {*} scene scène où se trouve le joueur
     */



    constructor(vitesse, vitesseMax, position, scene) {
        super(vitesse, vitesseMax, "Joueur", position, scene, true, "urotsuki.glb", 5);

        
        //commandes

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
            
            if (inputMap["z"] || inputMap["Z"] ) mv.z = 1;
            if (inputMap["s"] || inputMap["S"] ) mv.z = -1;
            if (inputMap["q"] || inputMap["Q"] ) mv.x = -1;
            if (inputMap["d"] || inputMap["D"] ) mv.x = 1;
            // if (inputMap["a"]) mv.y = -1;//pour faire des tests
            // if (inputMap["e"]) mv.y = 1;//pour faire des tests


            this.seDeplacer(mv);
            mv.x = 0;
            mv.z = 0;

            if(!(inputMap["z"] || inputMap["s"] || inputMap["q"] || inputMap["d"])) {
                this.vitesse = 0.1;
            }

        });


    }

    ajouterCollisions() {
        this.hitbox.onCollideObservable.add((otherMesh) => {
            if (otherMesh.metadata?.type === "Points") {
                // TODO : gestion des points
                otherMesh.metadata.instance.dispose()
            }
            if (otherMesh.metadata?.type === "Cle") {
                // TODO : gestion des points
                otherMesh.metadata.instance.dispose()
                console.log("clé trouvée")
            }

        });
    }

    // async creerJoueur()
    // {
    //     let result = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/3d/", "urotsuki.glb", this.scene);
    //     this.mesh = result.meshes[0];
    //     this.mesh.name = this.nom;

    //     this.mesh.scaling = new BABYLON.Vector3(5, 5, 5);
    //     const animationGroups = result.animationGroups;
    //     if (animationGroups && animationGroups.length > 0) {
    //         this.idle = animationGroups.find(group => group.name === "Idle");
    //         this.sit = animationGroups.find(group => group.name === "Sitting");
    //         this.walk = animationGroups.find(group => group.name === "Walking");
    //     }

    //     this.genererHitbox();
    //     this.hitbox.metadata = { type: "Joueur" };
    // }
    creerAnimations(animationGroups)
    {
        if (animationGroups && animationGroups.length > 0) 
        {
            this.idle = animationGroups.find(group => group.name === "Idle");
            this.sit = animationGroups.find(group => group.name === "Sitting");
            this.walk = animationGroups.find(group => group.name === "Walking");
        }
    }

    
}