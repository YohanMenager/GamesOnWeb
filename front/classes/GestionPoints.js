export class GestionPoints {
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
        this.charger(); 
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

    static getPointsParJeuTotal(jeu) {
        let total = 0;
        for (const niveau in this.#PointsParJeu[jeu]) {
            if (this.#PointsParJeu[jeu].hasOwnProperty(niveau)) {
                total += this.#PointsParJeu[jeu][niveau];
            }
        }
        return total;
    }

    static ajouterPoints(nb) {
        this.#points += nb;
    }

    static retirerPoints(nb) {
        this.#points -= nb;
    }

    static sauvegarder() {
        console.log("Sauvegarde des points :", this.#points);
        if (!this.#username) return;

        const key = "data_points_" + this.#username;
        const dataStr = localStorage.getItem(key);
        const data = dataStr ? JSON.parse(dataStr) : {};
        console.log("Sauvegarde des données de points pour", this.#username);
        console.log("Données sauvegardées :", data);
        data["points"] = this.#PointsParJeu;

        localStorage.setItem(key, JSON.stringify(data));

    }

    static charger() {
        const key = "data_points_" + this.#username;
        const dataStr = localStorage.getItem(key);
        const data = dataStr ? JSON.parse(dataStr) : null;

        if (data && data.points) {
            console.log("Données trouvées");
            this.#PointsParJeu = data.points;
            return data.niveauxDebloques ?? 1;
        }
        console.log("Aucune donnée trouvée, initialisation par défaut");

        // Aucune donnée trouvée, initialisation par défaut
        this.#PointsParJeu = {
            1: {},
            2: {},
            3: { 1: 0, 2: 0, 3: 0 }
        };
        return 1;
    }

    static getPointsParJeu(jeu) {
        return this.#PointsParJeu[jeu];
    }

    static setPointsParJeu(jeu, points) {
        this.#PointsParJeu[jeu] = points;
    }

    static setPointsNiveau(jeu, niveau, points) {
        if (!this.#PointsParJeu[jeu]) this.#PointsParJeu[jeu] = {};
        if (!this.#PointsParJeu[jeu][niveau] || points > this.#PointsParJeu[jeu][niveau]) {
            this.#PointsParJeu[jeu][niveau] = points;
        }
    }

    static getPointsNiveau(jeu, niveau) {
        return this.#PointsParJeu[jeu]?.[niveau] ?? 0;
    }

    static getPoints() {
        return this.#points;
    }

    static resetPoints() {
        this.#points = 0;
    }
}
