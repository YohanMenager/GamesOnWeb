import { Entite } from './Entite.js';
export class Joueur extends Entite {

    constructor(vitesse, vitesseMax, modele) {
        super(vitesse, vitesseMax, modele);

    }

    attaquer() {
        throw new Error("la méthode attaquer() doit être implémentée");
    }

    seDeplacer(mv) {
        throw new Error("la méthode seDeplacer() doit être implémentée");
    }
}
