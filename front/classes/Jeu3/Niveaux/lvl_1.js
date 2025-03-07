import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Plateforme } from "../Plateforme.js";
import { Bonus3 } from "../Bonus3.js";
export class lvl_1 extends Labyrinthe
{
    constructor(scene)
    {
        super([new Bonus3("Bonus1", null, new BABYLON.Vector3(0, 2, 100), scene)], 
            [], 
            [new Plateforme(20, 20, 10, 0, -5, 0, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(20, 20, 10, 0, -5, 20, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(20, 20, 10, 0, -5, -20, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(5, 20, 15, 12.5, -2.5, 20, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(5, 20, 15, -12.5, -2.5, 20, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(5, 20, 15, 12.5, -2.5, 0, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(5, 20, 15, -12.5, -2.5, 0, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(5, 20, 15, 12.5, -2.5, -20, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(5, 20, 15, -12.5, -2.5, -20, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
            new Plateforme(30, 5, 15, 0, -2.5, -32.5, null, "/assets/normalMaps/nuages2.jpg", scene,  10),
                ],
                new BABYLON.Vector3(0, 2, -20));
                
        
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