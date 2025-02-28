import { Entite } from './Entite.js';//un ennemi est une entité

/**
 * représente un ennemi ou autre type d'obstacle
 */
export class Ennemi extends Entite {
    /**
     * 
     * @param {*} vitesse vitesse de l'ennemi
     * @param {*} vitesseMax vitesse maximale de l'ennemi (si on met une accélération)
     * @param {*} modele sprite ou modèle 3d de l'ennemi
     */
    constructor(vitesse, vitesseMax, modele, typeEnnemi) {
        super(vitesse, vitesseMax, modele);
        this.typeEnnemi = typeEnnemi;
    }

    

}
