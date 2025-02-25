import {Labyrinthe} from "../Labyrinthe.js";
import {Ennemi} from "../../Ennemi.js";
import { Plateforme } from "../Plateforme.js";
export class lvl_1 extends Labyrinthe
{
    constructor(scene)
    {
        super([], 
            [], 
            [new Plateforme(20, 20, 10, 0, 0, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
                new Plateforme(200, 20, 15, 0, 50, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
                new Plateforme(20, 200, 10, 50, -70, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
                new Plateforme(200, 200, 10, 50, 200, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
                ]);
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