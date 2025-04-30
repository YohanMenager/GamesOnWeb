import { INiveau } from "../INiveau.js";
import { Plateforme } from "./Plateforme.js";

/**
 * représente un labyrinthe, ou niveau du jeu
 */
export class Labyrinthe extends INiveau
{
    #numero;
    nbCle = 0;
    /**
     * 
     * @param {*} ennemis liste des ennemis
     * @param {*} objets liste des objets
     * @param {*} decor liste des objets de décor
     * @param {*} positionDepart position de départ du joueur
     */
    constructor(ennemis, objets, decor, positionDepart, scene, numero, tempsMax, pointsNiveau = 0)
    {
        super(ennemis, objets, tempsMax, pointsNiveau);
        this.decor = decor;
        this.positionDepart = positionDepart;
        this.scene = scene
        this.#numero = numero;
        for(let objet of this.objets)
        {
            if(objet.requis)
            {
                this.nbCle++;
            }
        }
    }

    genererLabyrinthe(labyrinthe)
    {
        let murBase = new Plateforme(20, 20, 15, -50, 50, 50, null, null, null, null, this.scene,  null, 0);
        let solBase = new Plateforme(20, 20, 10, -50, 50, 50, "/assets/textures/grass.jpg", "/assets/textures/ground.jpg", null, null, this.scene,  null, 1);

        murBase.isVisible = false;
        solBase.isVisible = false;
        solBase.checkCollisions = true;
        murBase.checkCollisions = true;

        for (let z = 0; z < labyrinthe.length; z++) {
            for (let x = 0; x < labyrinthe[z].length; x++) {
                if (labyrinthe[z][x] == 0) {
                    let sol = solBase.createInstance("solInstance_" + x + "_" + z, 20 * x, -5, -20 * z);
                    sol.checkCollisions = true;
                    sol.metadata = {type: "Sol"};
                    this.decor.push(sol);
                } else if (labyrinthe[z][x] == 1) {
                    let mur = murBase.createInstance("murInstance_" + x + "_" + z, 20 * x, -2.5, -20 * z);
                    this.decor.push(mur);
                }
            }
        }
    }

    getNumero()
    {
        return this.#numero;
    }
    

    supprimer()
    {
        for(let i = 0; i < this.objets.length; i++)
        {
            this.objets[i].dispose();
        }
        for(let i = 0; i < this.ennemis.length; i++)
        {
            this.ennemis[i].dispose();
        }
        for(let i = 0; i < this.decor.length; i++)
        {
            this.decor[i].dispose();
        }
        this.objets = [];
        this.ennemis = [];
        this.decor = [];
    }


}