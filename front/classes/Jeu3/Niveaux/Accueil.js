import {Labyrinthe} from "../Labyrinthe.js";
import { Plateforme } from "../Plateforme.js";
export class Accueil extends Labyrinthe
{
    constructor(scene)
    {
        super([],
            [], 
            [         
                new Plateforme(300, 15, 10, 0, -5, 0, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1, true),
                ],
                new BABYLON.Vector3(0, 5, 0),//point de départ
                scene,
            0);
        
        this.decor[0].mesh.metadata = {type: "Sol"};


        
    }
}