import { Niveau } from "../Niveau.js";

/**
 * représente un labyrinthe, ou niveau du jeu
 */
export class Labyrinthe extends Niveau
{
    /**
     * 
     * @param {*} ennemis liste des ennemis
     * @param {*} objets liste des objets
     * @param {*} decor liste des objets de décor
     * @param {*} positionDepart position de départ du joueur
     */
    constructor(ennemis, objets, decor, positionDepart)
    {
        super(ennemis, objets);
        this.decor = decor;
        this.positionDepart = positionDepart;
    }
    
    afficher()
    {
        console.log("Labyrinthe affiché");
    }
    verifier()
    {
        console.log("Labyrinthe vérifié");
    }
}