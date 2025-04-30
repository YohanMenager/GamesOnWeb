export class GestionPoints
{
    static #points = 0;
    static #PointsParJeu = {
        1: {},
        2: {},
        3: {
            1: 0,
            2: 0,
            3: 0,
        }
    };

    static total()
    {
        let total = 0;
        for (const jeu in this.#PointsParJeu) {
            if (this.#PointsParJeu.hasOwnProperty(jeu)) {
                total += this.#PointsParJeu[jeu];
            }
        }
        return total;
    }
    static getPointsParJeuTotal(jeu)
    {
        let total = 0;
        for (const niveau in this.#PointsParJeu[jeu]) {
            if (this.#PointsParJeu[jeu].hasOwnProperty(niveau)) {
                total += this.#PointsParJeu[jeu][niveau];
            }
        }
        return total;
    }

    static ajouterPoints(nb)
    {
        this.#points += nb;
    }
    static retirerPoints(nb)
    {
        this.#points -= nb;
    }
    static sauvegarder(joueur, nb)
    {
        // TODO : Mettre à jour le joueur avec le nombre de points dans la base de données
    }
    static charger(joueur)
    {
        // TODO : Charger le joueur avec le nombre de points dans la base de données
    }
    static getPointsParJeu(jeu)
    {
        return this.#PointsParJeu[jeu];
    }
    static setPointsParJeu(jeu, points)
    {
        this.#PointsParJeu[jeu] = points;
    }
    static setPointsNiveau(jeu, niveau, points)
    {
        this.#PointsParJeu[jeu][niveau] = points;
    }
    static getPointsNiveau(jeu, niveau)
    {
        return this.#PointsParJeu[jeu][niveau];
    }


    static getPoints()
    {
        return this.#points;
    }
    static resetPoints()
    {
        this.#points = 0;
    }

}