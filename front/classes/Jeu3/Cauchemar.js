
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


    attaquer() {
        console.log("Le cauchemar attaque !");
    }

    // async creerCauchemar()
    // {
    //     let result = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/3d/", this.nomMesh, this.scene);
    //     this.mesh = result.meshes[0];
    //     this.mesh.name = this.nom;

    //     this.mesh.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    //     const animationGroups = result.animationGroups;
        
    //     if (animationGroups && animationGroups.length > 0) {
    //         this.idle = animationGroups.find(group => group.name === "skeleton-skeleton|idle");
    //         this.walk = animationGroups.find(group => group.name === "skeleton-skeleton|run");
    //         this.attack = animationGroups.find(group => group.name === "skeleton-skeleton|attack");
    //         this.spawn = animationGroups.find(group => group.name === "skeleton-skeleton|spawn");
    //     }


    //     this.genererHitbox();
    //     this.hitbox.metadata = { type: "Ennemi" };
      
    // }

    creerAnimations(animationGroups)
    {
        this.idle = animationGroups.find(group => group.name === "skeleton-skeleton|idle");
        this.walk = animationGroups.find(group => group.name === "skeleton-skeleton|run");
        this.attack = animationGroups.find(group => group.name === "skeleton-skeleton|attack");
        this.spawn = animationGroups.find(group => group.name === "skeleton-skeleton|spawn");
    }

    
}
