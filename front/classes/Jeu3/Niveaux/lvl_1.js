import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Bonus } from "../Bonus.js";
export class lvl_1 extends Labyrinthe
{
    constructor(scene)
    {
        super([], //sortie
            [new Bonus({nom: "Sortie", position: new BABYLON.Vector3(60, 5, -20), scene: scene}),
                new Bonus({nom: "Points", position: new BABYLON.Vector3(220, 5, -280), scene: scene, points: 10}),
                new Bonus({nom: "Points", position: new BABYLON.Vector3(20, 5, -280), scene: scene, points: 10}),], 
            [         

                ],
                new BABYLON.Vector3(260, 10, -280),//point de départ
                scene,
            1,
            120,
            100);
                
        

        const labyrinthe=[
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        this.genererLabyrinthe(labyrinthe);
        
    }
}