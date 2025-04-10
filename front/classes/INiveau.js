
/**
 * Classe Niveau
 * représente un niveau
 */
export class INiveau
{
    ennemis = [];//liste des ennemis
    objets = [];//liste des objets

    /**
     * 
     * @param {*} ennemis liste des ennemis
     * @param {*} objets liste des objets
     */
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