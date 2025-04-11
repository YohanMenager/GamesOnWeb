import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Bonus } from "../Bonus.js";

export class lvl_2 extends Labyrinthe
{
    constructor(scene)
    {
        super([new Cauchemar(0.5, 0.6, "Cauchemar", new BABYLON.Vector3(170, 5, -170), scene, "skeleton.glb", 0.05),
            new Cauchemar(0.5, 0.6, "Cauchemar", new BABYLON.Vector3(40, 5, -20), scene, "skeleton.glb", 0.05)
        ], //sortie

        [new Bonus({nom: "Sortie", position: new BABYLON.Vector3(280, 5, -20), scene: scene}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(100, 5, -20), scene: scene, points: 10}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(20, 5, -280), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),], 
            [         

                ],
                new BABYLON.Vector3(280, 5, -280),//point de départ
                scene,
            2);
                
        

            const labyrinthe=[
                
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
                [1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            ];
        this.genererLabyrinthe(labyrinthe);
        
    }
}