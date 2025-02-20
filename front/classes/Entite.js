export class Entite {
    vitesseY = 0;
    vitesse = 0;

    constructor() {

    }

    attaquer() {
        throw new Error("la méthode attaquer() doit être implémentée");
    }

    seDeplacer() {
        throw new Error("la méthode seDeplacer() doit être implémentée");
    }
}