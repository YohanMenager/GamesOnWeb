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
        this.modele = this.creerJoueur();

        this.hitbox = BABYLON.Mesh.CreateBox("hitbox", 4.0, this.scene);
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

    creerJoueur()
    {
        let box = BABYLON.Mesh.CreateBox("Box", 4.0, this.scene);
        box.renderingGroupId = 1;//sert à que ce qui brille ne brille pas à travers le joueur. probablement pas nécessaire à cause de l'angle de vue mais on sait jamais
        // box.position.y = 2;

        let material = new BABYLON.StandardMaterial("material", this.scene);
        material.diffuseColor = new BABYLON.Color3(0.2, 0, 0);
        material.emissiveColor = new BABYLON.Color3(0, 0, 0);
        material.diffuseTexture = new BABYLON.Texture("/assets/textures/texture1.jpg", this.scene);
        material.bumpTexture = new BABYLON.Texture("/assets/normalMaps/normalMap1.jpg", this.scene);
        box.material = material;
        
        return box;     
    }

    attaquer() {
        console.log("Personnage attaque");
    }

    /**
     * déplace le joueur
     * @param {*} mv vecteur de déplacement
     */
    seDeplacer(mv) {

        //le joueur se déplace, en ne passant pas à travers les murs. on multiplie par la vitesse
        this.hitbox.moveWithCollisions(new BABYLON.Vector3(mv.x * this.vitesse, mv.y, mv.z * this.vitesse));

        // Synchronisation du modèle avec la hitbox, sinon la hitbox bouge toute seule
        this.modele.position.copyFrom(this.hitbox.position);

        //la vitesse augmente progressivement, sauf si on atteint la vitesse maximale
        if(this.vitesse < this.vitesseMax) {
            this.vitesse += 0.01;
        }
    }
}