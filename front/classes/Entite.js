/**
 * Classe Entite
 * représente une entité, qui peut être un joueur, un ennemi, un objet, etc.
 */
export class Entite {
    vitesse;
    vitesseMax;
    modele;
    /**
     * 
     * @param {*} vitesse vitesse de l'entité
     * @param {*} vitesseMax vitesse maximale de l'entité (si on met une accélération)
     * @param {*} modele sprite ou modèle 3d de l'entité
     */
    constructor(vitesse, vitesseMax, modele) {
        this.vitesse = vitesse;
        this.vitesseMax = vitesseMax;
        this.modele = modele;
    }

    /**
     * déplacement de l'entité
     * @param {*} mv vecteur de déplacement
     */
    seDeplacer(mv) {
        throw new Error("la méthode seDeplacer() doit être implémentée");
    }
}