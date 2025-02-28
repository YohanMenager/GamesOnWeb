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
        this.modele.checkCollisions = true;

    }

    creerJoueur()
    {
        let box = BABYLON.Mesh.CreateBox("Box", 4.0, this.scene);
        box.position.y = 2;

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
        this.modele.moveWithCollisions(new BABYLON.Vector3(mv.x * this.vitesse, mv.y, mv.z * this.vitesse));

        //la vitesse augmente progressivement, sauf si on atteint la vitesse maximale
        if(this.vitesse < this.vitesseMax) {
            this.vitesse += 0.01;
        }
    }
}