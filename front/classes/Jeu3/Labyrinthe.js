import { Niveau } from "../Niveau.js";
export class Labyrinthe extends Niveau
{
    constructor(ennemis, objets, decor)
    {
        super(ennemis, objets);
        this.decor = decor;
    }
    
    afficher()
    {
        console.log("Labyrinthe affiché");
    }
    verifier()
    {
        console.log("Labyrinthe vérifié");
    }
}