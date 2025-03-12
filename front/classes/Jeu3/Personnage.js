import { Joueur } from '../Joueur.js';

/**
 * classe du joueur
 */
export class Personnage extends Joueur {
    /**
     * 
     * @param {*} vitesse vitesse de déplacement
     * @param {*} vitesseMax vitesse maximale
     * @param {*} scene scène où se trouve le joueur
     */



    constructor(vitesse, vitesseMax, scene) {
        super(vitesse, vitesseMax, null);
        this.scene = scene;

        console.log("Création du personnage");

    }

    async creerJoueur()
    {
        console.log("Chargement du personnage...");

        let result = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/3d/", "urotsuki.glb", this.scene);

        this.modele = result.meshes[0];
        console.log("Mesh chargé :", this.modele);
        console.log(this.modele.rotation);

        // this.modele.position = new BABYLON.Vector3(0, 0, 0);
        this.modele.scaling = new BABYLON.Vector3(5, 5, 5);
        const animationGroups = result.animationGroups;
        if (animationGroups && animationGroups.length > 0) {
            this.idle = animationGroups.find(group => group.name === "Idle");
            this.sit = animationGroups.find(group => group.name === "Sitting");
            this.walk = animationGroups.find(group => group.name === "Walking");
        }




        this.hitbox = BABYLON.MeshBuilder.CreateBox("hitbox", { size: 4.0 }, this.scene);
        this.hitbox.material = new BABYLON.StandardMaterial("hitboxMaterial", this.scene);
        this.hitbox.material.alpha = 0.5;
        this.hitbox.material.wireframe = true;//pour tester et voir la hitbox
        this.hitbox.isVisible = false;
        this.hitbox.checkCollisions = true;
        //aide en partie à empêcher le joueur de passer à travers les murs
        //babylonjs utilise un ellipsoïde pour la hitbox, qui est plus précis qu'une boîte et qui est invisible
        this.hitbox.ellipsoid = new BABYLON.Vector3(2, 2, 2); // Définit un volume de collision
        this.hitbox.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0); // Décale vers le haut

        this.hitbox.position = this.modele.position.clone();
    }

    attaquer() {
        console.log("Personnage attaque");
    }

    /**
     * déplace le joueur
     * @param {*} mv vecteur de déplacement
     */
    seDeplacer(mv) {

        if(mv.x == 0 && mv.z == 0) {
            this.walk.stop();
            this.idle.start(true);
        }
        else {
            this.idle.stop();
            this.sit.stop();
            this.walk.start(true);

            const angle = Math.atan2(mv.x, mv.z);
            const quaternion = BABYLON.Quaternion.FromEulerAngles(0, angle, 0);
            this.modele.rotationQuaternion = quaternion;
        }


        //le joueur se déplace, en ne passant pas à travers les murs. on multiplie par la vitesse
        this.hitbox.moveWithCollisions(new BABYLON.Vector3(mv.x * this.vitesse, mv.y, mv.z * this.vitesse));

        // Synchronisation du modèle avec la hitbox, sinon la hitbox bouge toute seule
        this.modele.position.copyFrom(this.hitbox.position);

        //la vitesse augmente progressivement, sauf si on atteint la vitesse maximale
        if(this.vitesse < this.vitesseMax) {
            this.vitesse += 0.01;
        }

        //debug
        // console.log(this.vitesse);
    }
}