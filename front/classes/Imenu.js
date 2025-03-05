export class Imenu {
    chargeur;
    constructor(chargeur)
    {
        this.chargeur = chargeur;
    }
    afficherMenu()
    {
        throw new Error("la méthode afficherMenu() doit être implémentée");
    }
    demarrerNiveau(niveau)
    {
        throw new Error("la méthode demarrerNiveau() doit être implémentée");
    }
}

