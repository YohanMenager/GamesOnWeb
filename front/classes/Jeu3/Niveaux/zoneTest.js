import {Labyrinthe} from "../Labyrinthe.js";
import {Cauchemar} from "../Cauchemar.js";
import { Plateforme } from "../Plateforme.js";
import { Bonus } from "../Bonus.js";
export class zoneTest extends Labyrinthe
{
    constructor(scene)
    {
        super([new Cauchemar(0.5, 0.6, "squelette", new BABYLON.Vector3(-60, 5, -50), scene, "skeleton.glb", 0.05)], 
            [new Bonus({nom: "Sortie", position: new BABYLON.Vector3(60, 5, -20), scene: scene}),
                new Bonus({nom: "Points", position: new BABYLON.Vector3(50, 5, -20), scene: scene, points: 10}),
                new Bonus({nom: "Cle", position: new BABYLON.Vector3(60, 5, -10), scene: scene, nomModele: "cle.glb", scale: 0.15, requis: true, points: 100}),], 
            [         
                new Plateforme(200, 200, 10, 0, -5, 0, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
                new Plateforme(20, 20, 10, 0, -5, -20, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
                new Plateforme(20, 2.5, 0.5, 0, 0, 20, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
                new Plateforme(20, 2.5, 0.5, 0, 0.5, 22.5, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
                new Plateforme(20, 2.5, 0.5, 0, 1, 24, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
                new Plateforme(20, 2.5, 0.5, 0, 1.5, 26.5, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
                new Plateforme(20, 2.5, 0.5, 0, 2, 28, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, scene,  null, 1),
                ],
                new BABYLON.Vector3(10, 5, -10),//point de départ
                scene,
            -1);
        this.decor[1].mesh.rotation.x = Math.PI/8;
        for(const plateforme of this.decor)
        {
            plateforme.mesh.metadata = {type: "Sol"};
        }


        
    }
}