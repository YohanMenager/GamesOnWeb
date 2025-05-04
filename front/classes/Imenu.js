export class Imenu {
    chargeur;
    niveauxDebloques;
    nomJeu;
    username;

    constructor(chargeur, nomJeu) {
        this.chargeur = chargeur;
        this.nomJeu = nomJeu;
        this.username = this.getCookie("username"); // ← récupère le nom du joueur
        this.chargerProgression();
        console.log("Progression chargée pour", this.username, ":", this.niveauxDebloques);
    }

    /**
     * @description Récupère un cookie par son nom.
     */
    getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    }

    /**
     * @description Charge la progression du joueur depuis la clé data_<username>.
     */
    chargerProgression() {
        const data = JSON.parse(localStorage.getItem("data_" + this.username)) || {};
        const val = parseInt(data["progression_" + this.nomJeu]);
        this.niveauxDebloques = isNaN(val) ? 1 : val;
    }

    /**
     * @description Sauvegarde la progression du joueur dans data_<username>.
     */
    sauvegarderProgression() {
        const key = "data_" + this.username;
        const data = JSON.parse(localStorage.getItem(key)) || {};
        data["progression_" + this.nomJeu] = this.niveauxDebloques;
        localStorage.setItem(key, JSON.stringify(data));
    }

    debloquerNiveau() {
        this.niveauxDebloques++;
        this.sauvegarderProgression();
    }

    afficherMenu() {
        throw new Error("la méthode afficherMenu() doit être implémentée");
    }

    demarrerNiveau(niveau) {
        throw new Error("la méthode demarrerNiveau() doit être implémentée");
    }
}
