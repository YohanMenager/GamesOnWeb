import {Imenu} from "../Imenu.js";

export class MenuDreamz extends Imenu{
    niveauxDebloques = 0;

    constructor(chargeur, niveauxDebloques = 1)
    {
        super(chargeur);
        this.niveauxDebloques = niveauxDebloques;
    }
    async afficherMenu()
    {
        console.log("Affichage du menu...");
        for (let i = 1; i <= this.niveauxDebloques; i++) {
            console.log(`Niveau ${i} disponible`);
        }
        if(!this.chargeur.joueur)
        {
            await this.chargeur.initJoueur();
        }
        // await this.demarrerNiveau(-1);//pour utiliser la zone de test
        await this.demarrerNiveau(this.niveauxDebloques);//temporaire jusqu'à qu'il y ait un menu
    }
    async demarrerNiveau(niveau)
    {
        // console.log(`entrée méthode demarrerNiveau`);
        if (niveau <= this.niveauxDebloques) {
            console.log(`Chargement du niveau ${niveau}...`);
            await this.chargeur.chargerNiveau(niveau);
        } else {
            console.log(`Niveau ${niveau} non débloqué !`);
        }
    }
    niveauTermine(numero)
    {
        console.log("Niveau terminé !");
        if(numero==this.niveauxDebloques)
        {
            this.niveauxDebloques++;
        }
        this.afficherMenu();
    }
}