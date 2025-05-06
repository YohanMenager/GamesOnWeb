import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Bonus } from "../Bonus.js";

export class lvl_3 extends Labyrinthe
{
    constructor(scene)
    {
        super([
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(98, 5, -783), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(98, 5, -783), new BABYLON.Vector3(218, 5, -783)]),
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(539, 5, -663), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(539, 5, -663), new BABYLON.Vector3(620, 5, -742)]),
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(578, 5, -539), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(578, 5, -539), new BABYLON.Vector3(578, 5, -300)]),
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(538, 5, -260), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(538, 5, -260), new BABYLON.Vector3(300, 5, -261)]),
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(20, 5, -380), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(20, 5, -380), new BABYLON.Vector3(20, 5, -100)]),
            new Cauchemar(0.5, 3, "Cauchemar", new BABYLON.Vector3(100, 5, -63), scene, "skeleton.glb", 0.05, [new BABYLON.Vector3(100, 5, -63), new BABYLON.Vector3(300, 5, -63)]),
        ], 

        [
            new Bonus({nom: "Sortie", position: new BABYLON.Vector3(420, 5, -420), scene: scene}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(400, 5, -820), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(680, 5, -820), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(120, 5, -820), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(120, 5, -680), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(400, 5, -680), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(680, 5, -680), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(120, 5, -400), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(400, 5, -400), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(680, 5, -400), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(120, 5, -120), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(400, 5, -120), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(680, 5, -120), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(120, 5, -720), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(400, 5, -720), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(680, 5, -720), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(120, 5, -100), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(400, 5, -100), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(680, 5, -100), scene: scene, points: 10}),
            new Bonus({nom: "Points", position: new BABYLON.Vector3(120, 5, -260), scene: scene, points: 10}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(120, 5, -120), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(400, 5, -120), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(680, 5, -120), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(120, 5, -400), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(720, 5, -400), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(120, 5, -680), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(420, 5, -720), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
            new Bonus({nom: "Cle", position: new BABYLON.Vector3(680, 5, -680), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),
        ], 
            [         

                ],
                new BABYLON.Vector3(440, 10, -820),//point de départ
                scene,
            3,
        1000,
        1200);
                
        

            const labyrinthe=[
                
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1],
                [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
                [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1],
                [1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1],
                [1,0,1,0,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
                [1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
                [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
                [1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
                [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
                [1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
                [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
                [1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
                [1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
                [1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
                [1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1],
                [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1],
                [1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,1,1,0,0,0,0,0,1,0,1,1,1,0,1,1,1,0,1,0,0,0,1,0,1,0,1],
                [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
                [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1],
                [1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
                [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
                [1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1],
                [1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1],
                [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
                [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
                [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
                [1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
                [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
                [1,0,1,1,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,0,0,1,0,1,0,1,0,1],
                [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1],
                [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
                [1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
                [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
                [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
                [1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
                [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

            ];
        this.genererLabyrinthe(labyrinthe);
        
    }
}