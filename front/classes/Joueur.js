import { Entite } from './Entite.js';//un joueur est une entité

/**
 * représente un joueur, qui est une entité
 */
export class Joueur extends Entite {



    //servira à créer le joueur dans la scène
    creerJoueur()
    {
        throw new Error("la méthode creerJoueur() doit être implémentée");
    }


}
