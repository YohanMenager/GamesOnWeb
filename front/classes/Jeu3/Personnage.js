import { GestionPoints } from '../GestionPoints.js';
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

    peutMarcher = false;

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
            if (this.peutMarcher) {
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
            }
            


        });


    }


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