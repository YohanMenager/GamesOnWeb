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

    static #username = null; 

    static init(username) {
        this.#username = username;
        this.charger(username);
    }
    

    static total() {
        let total = 0;
        for (const jeu in this.#PointsParJeu) {
            for (const niveau in this.#PointsParJeu[jeu]) {
                total += this.#PointsParJeu[jeu][niveau];
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
    static sauvegarder(niveauxDebloques) {
        if (!this.#username) return;
    
        const sauvegarde = {
            points: this.#PointsParJeu,
            niveauxDebloques: niveauxDebloques
        };
    
        localStorage.setItem("data_" + this.#username, JSON.stringify(sauvegarde));
    }
    
    
    static charger(username) {
        this.#username = username;
        const data = localStorage.getItem("data_" + username);
        if (data) {
            const sauvegarde = JSON.parse(data);
            this.#PointsParJeu = sauvegarde.points || [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            return sauvegarde.niveauxDebloques ?? 1;
        } else {
            this.#PointsParJeu = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            return 1; // Par défaut, 1 niveau débloqué
        }
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
        if (!this.#PointsParJeu[jeu]) this.#PointsParJeu[jeu] = {};
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