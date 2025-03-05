import {Imenu} from "../Imenu.js";

export class MenuDreamz extends Imenu{
    Chargeur;
    niveauxDebloques = 0;

    constructor(chargeur, niveauxDebloques = 1)
    {
        super(chargeur);
        this.niveauxDebloques = niveauxDebloques;
    }
    afficherMenu()
    {
        console.log("Affichage du menu...");
        for (let i = 1; i <= this.niveauxDebloques; i++) {
            console.log(`Niveau ${i} disponible`);
        }
    }
    demarrerNiveau(niveau)
    {
        if (niveau <= this.niveauxDebloques) {
            console.log(`Chargement du niveau ${niveau}...`);
            this.chargeur.chargerNiveau(niveau);
        } else {
            console.log(`Niveau ${niveau} non débloqué !`);
        }
    }
}