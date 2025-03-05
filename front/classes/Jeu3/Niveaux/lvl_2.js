import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Plateforme } from "../Plateforme.js";
import { Bonus3 } from "../Bonus3.js";

export class lvl_2 extends Labyrinthe
{
    constructor(scene)
    {
        super([new Bonus3("Bonus1", null, new BABYLON.Vector3(0, 2, 100), scene)], 
            [], 
            [],
                new BABYLON.Vector3(0, 2, 0));
                
        
        this.scene = scene;
        
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