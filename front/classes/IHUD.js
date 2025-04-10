/**
 * Classe HUD
 * représente l'interface utilisateur
 */
export class IHUD {
    boutonMenu;
    timer;
    score;
    labelNiveau;

    constructor() {

    }
    setScore(val) {}
    setTemps(val) {}
    ajouterObjet(objet) {}
    retirerObjet(objet) {}

    afficherTexte(texte, position, duree = 2000) {}
    actualiser() {}
    cacher() {}
    afficher() {}
    setNiveau(niveau) {}
}