
import { Entite } from "./Entite.js";

/**
 *  représente les ennemis de base du jeu
 */
export class Cauchemar extends Entite
{
    constructor(vitesse, vitesseMax, nom, position, scene, nomModele, scale)
    {
        super(vitesse, vitesseMax, nom, position, scene, true, nomModele, scale);

        // this.nomMesh = nomMesh;
        // this.scene.onBeforeRenderObservable.add(() => {
        //     this.hitbox.moveWithCollisions(new BABYLON.Vector3(1, 0, 0));
        //     this.mesh.position.copyFrom(this.hitbox.position);
        // });

    }


    creerAnimations(animationGroups)
    {
        this.idle = animationGroups.find(group => group.name === "skeleton-skeleton|idle");
        this.walk = animationGroups.find(group => group.name === "skeleton-skeleton|run");
        this.attack = animationGroups.find(group => group.name === "skeleton-skeleton|attack");
        this.spawn = animationGroups.find(group => group.name === "skeleton-skeleton|spawn");
    }

    
}
