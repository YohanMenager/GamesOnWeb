import { GestionPoints } from "./GestionPoints.js";
import { Timer } from "./Timer.js";

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
    constructor(ennemis, objets, tempsMax = 0, pointsNiveau = 0)
    {
        this.ennemis = ennemis;
        this.objets = objets;
        this.tempsMax = tempsMax;
        this.pointsNiveau = pointsNiveau;//points gagnés à la fin du niveau
    }

    generer()
    {
        console.log("Niveau généré");
    }

    calculerScoreNiveau() {
        const pointsTemps = Math.max(0, Math.floor(this.tempsMax - Timer.getTime())* 10); // 10 points par seconde restante
        return GestionPoints.getPoints() + pointsTemps + this.pointsNiveau;
      }
      
}