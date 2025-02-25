import { Joueur } from '../Joueur.js';

export class Personnage extends Joueur {
    constructor(vitesse, vitesseMax, modele) {
        super(vitesse, vitesseMax, modele);
        this.modele.checkCollisions = true;
    }

    attaquer() {
        console.log("Personnage attaque");
    }

    seDeplacer(mv) {
        // console.log("Personnage se déplace");
        // this.modele.position.x += mv.x * this.vitesse;
        // this.modele.position.y += mv.y * this.vitesse;  
        // this.modele.position.z += mv.z * this.vitesse;

        this.modele.moveWithCollisions(new BABYLON.Vector3(mv.x * this.vitesse, mv.y, mv.z * this.vitesse));

        if(this.vitesse < this.vitesseMax) {
            this.vitesse += 0.01;
        }
    }
}