/**
 * Classe Entite
 * représente une entité, qui peut être un joueur, un ennemi, un objet, etc.
 */
export class IEntite {
    vitesse;
    vitesseMax;
    mesh;
    /**
     * 
     * @param {*} vitesse vitesse de l'entité
     * @param {*} vitesseMax vitesse maximale de l'entité (si on met une accélération)
     * @param {*} mesh sprite ou modèle 3d de l'entité
     */
    constructor(vitesse, vitesseMax, mesh, nom, position) {
        this.vitesse = vitesse;
        this.vitesseMax = vitesseMax;
        this.mesh = mesh;
        this.nom = nom;
        this.position = position;
    }

    /**
     * déplacement de l'entité
     * @param {*} mv vecteur de déplacement
     */
    seDeplacer(mv) {
        throw new Error("la méthode seDeplacer() doit être implémentée");
    }

}