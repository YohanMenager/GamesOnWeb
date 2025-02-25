export class Niveau
{
    ennemis = [];
    objets = [];

    constructor(ennemis, objets)
    {
        this.ennemis = ennemis;
        this.objets = objets;
    }

    generer()
    {
        console.log("Niveau généré");
    }
}