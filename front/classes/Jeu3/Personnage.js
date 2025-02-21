import { Joueur } from '../Joueur.js';

export class Personnage extends Joueur {
    constructor(vitesse, vitesseMax, modele) {
        super(vitesse, vitesseMax, modele);
    }

    attaquer() {
        console.log("Personnage attaque");
    }

    seDeplacer(mv) {
        console.log("Personnage se déplace");
        this.modele.position.x += mv.x * this.vitesse;
        this.modele.position.y += mv.y * this.vitesse;  
        this.modele.position.z += mv.z * this.vitesse;
        if(this.vitesse < this.vitesseMax) {
            this.vitesse += 0.01;
        }
    }
}