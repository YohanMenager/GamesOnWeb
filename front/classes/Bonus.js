/**
 * interface pour les différents bonus que l'on peut trouver dans le jeu
 */

export class Bonus {
    constructor(nom, modele, position) {
        this.nom = nom;
        this.modele = modele;
        this.position = position;
    }

}