import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Plateforme } from "../Plateforme.js";
import { Bonus3 } from "../Bonus3.js";
export class lvl_1 extends Labyrinthe
{
    constructor(scene)
    {

        //constructor(largeur, longueur, hauteur, positionX, positionY, positionZ, texture, textureCote, normalMap, normalMapCote, scene, relief, opacity)
    
        super([new Bonus3("Bonus1", null, new BABYLON.Vector3(0, 2, 100), scene)], 
            [], 
            //segment 1
            [new Plateforme(20, 120, 10, 0, -5, 30, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
            new Plateforme(5, 60, 15, 12.5, -2.5, 0, null, null, null, null, scene,  null, 0),
            new Plateforme(5, 60, 15, -12.5, -2.5, 0, null, null, null, null, scene,  null, 0),
            new Plateforme(30, 5, 15, 0, -2.5, -32.5, null, null, null, null, scene,  null, 0),
            //segment 2
            new Plateforme(60, 20, 10, 40, -5, 40, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),

                ],
                new BABYLON.Vector3(0, 5, -20));
                
        
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