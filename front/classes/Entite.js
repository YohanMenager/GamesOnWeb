export class Entite {
    vitesseY;
    vitesse;
    vitesseMax;
    modele;
    constructor(vitesse, vitesseMax, modele) {
        this.vitesse = vitesse;
        this.vitesseMax = vitesseMax;
        this.modele = modele;
    }

    attaquer() {
        throw new Error("la méthode attaquer() doit être implémentée");
    }

    seDeplacer(mv) {
        throw new Error("la méthode seDeplacer() doit être implémentée");
    }
}