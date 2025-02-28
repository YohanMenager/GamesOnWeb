import { Ennemi } from "../Ennemi.js";

/**
 *  représente les ennemis de base du jeu
 */
export class Cauchemar extends Ennemi
{
    attaquer() {
        console.log("Le cauchemar attaque !");
    }

    seDeplacer() {
        console.log("Le cauchemar se déplace !");
    }
}
