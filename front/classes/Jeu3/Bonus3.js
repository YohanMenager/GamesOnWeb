import { Bonus } from '../Bonus.js';

/**
 * représente un bonus pour le troisième jeu
 */
export class Bonus3 extends Bonus
{
    /**
     * 
     * @param {*} nom nom du bonus 
     * @param {*} modele modele qui représente le bonus, sprite ou modele 3d
     * @param {*} position coordonnées du bonus dans le niveau
     * @param {*} scene sert à créer le modèle si on ne lui en donne pas
     */
    constructor(nom, modele, position, scene)
    {
        super(nom, modele, position);
        this.scene = scene;

        //si on a pas donné de modèle, il y en a un par défaut
        if(modele == null)
        {
            this.modele = this.creerBonus();
        }

        this.modele.position = position;
    }

    creerBonus()
    {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 5,}, this.scene);//créé une sphère de diamètre 5
        let material = new BABYLON.StandardMaterial("material", this.scene);//création du métériau
        material.diffuseColor = new BABYLON.Color3(1, 1, 0);//couleur jaune
        material.emissiveColor = new BABYLON.Color3(1, 1, 0.5);//lumière de l'objet
        sphere.material = material;

        //création d'un halo autour de l'objet
        let glowLayer = new BABYLON.GlowLayer("glow", this.scene);
        glowLayer.renderingGroupId = 0;//sert à que ce qui brille ne brille pas à travers les murs. probablement pas nécessaire à cause de l'angle de vue mais on sait jamais
        glowLayer.intensity = 0.5
        glowLayer.unlit = true;
        glowLayer.addIncludedOnlyMesh(sphere);


        return sphere
    }
}