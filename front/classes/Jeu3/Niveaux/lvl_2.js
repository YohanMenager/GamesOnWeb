import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Bonus } from "../Bonus.js";

export class lvl_2 extends Labyrinthe
{
    constructor(scene)
    {
        super([new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(170, 5, -170), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(170, 5, -170), new BABYLON.Vector3(190, 5, -110)]),
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(40, 5, -20), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(40, 5, -20), new BABYLON.Vector3(30, 5, -120)]),
        ], //sortie

        [new Bonus({nom: "Sortie", position: new BABYLON.Vector3(280, 5, -20), scene: scene}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(100, 5, -20), scene: scene, points: 10}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(20, 5, -280), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),], 
            [         

                ],
                new BABYLON.Vector3(280, 10, -280),//point de départ
                scene,
                2,
                240,
                200);
                
        

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