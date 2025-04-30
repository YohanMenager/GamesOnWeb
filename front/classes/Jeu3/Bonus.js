
import { Entite } from './Entite.js';

/**
 * représente un bonus pour le troisième jeu
 */
export class Bonus extends Entite
{
    requis = false;
    points = 0;
    /**
     * 
     * @param {*} nom nom du bonus 
     * @param {*} position coordonnées du bonus dans le niveau
     * @param {*} scene sert à créer le modèle si on ne lui en donne pas
     */
    constructor({
        nom,
        position,
        scene,
        gravite = false,
        nomModele = null,
        scale = 1,
        requis = false,
        points = 0
    })
    {
        super(0, 0, nom, position, scene, gravite, nomModele, scale);
        this.requis = requis;
        this.points = points;

        switch(nom)
        {
            case "Sortie":
                this.mesh = this.creerSortie();
                this.genererHitbox();
                break;
            case "Points":
                this.mesh = this.creerBonusP();
                this.genererHitbox();
                break;
            // case "Cle":
            //     this.init();
            //     break;
        }
        


    }

    desactiverSortie()
    {
        this.mesh.material.diffuseColor = new BABYLON.Color3(0.9, 0, 0);//couleur rouge
        this.mesh.material.emissiveColor = new BABYLON.Color3(1, 0.4, 0.4);//lumière de l'objet
        this.hitbox.checkCollisions = false;
    }

    activerSortie()
    {
        this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 0);//couleurjaune
        this.mesh.material.emissiveColor = new BABYLON.Color3(1, 1, 1);//lumière de l'objet
        this.hitbox.checkCollisions = true;
    }

    genererMateriau()
    {
        if(this.nom == "Cle")
        {
            // console.log(this.mesh)
            let goldMaterial = new BABYLON.PBRMetallicRoughnessMaterial("gold", this.scene);
            goldMaterial.baseColor = new BABYLON.Color3(1, 0.84, 0); // Couleur or
            goldMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.075, 0); // Teinte dorée lumineuse

            goldMaterial.albedoColor = new BABYLON.Color3(1, 0.84, 0); // Couleur or
            goldMaterial.metallic = 1; // Métallique à fond
            goldMaterial.roughness = 0.5; // Plus brillant (proche de 0)
            


            // let glowLayer = new BABYLON.GlowLayer("glow", this.scene);
            // glowLayer.intensity = 0.5
            // glowLayer.unlit = true;
            // glowLayer.addIncludedOnlyMesh(this.mesh);
            
            this.mesh.getChildMeshes().forEach(m => {
                m.material = goldMaterial;
                // glowLayer.addIncludedOnlyMesh(m);
            });

            this.mesh.material = goldMaterial;
            // console.log(this.mesh.material);            
        }
        else return null;
    }

    

    //apparence par défaut
    creerSortie()
    {
        let sphere = BABYLON.MeshBuilder.CreateSphere(this.nom, {diameter: 5,}, this.scene);//créé une sphère de diamètre 5
        let material = new BABYLON.StandardMaterial("material", this.scene);//création du métériau
        // material.diffuseColor = new BABYLON.Color3(1, 1, 0);//couleur jaune
        // material.emissiveColor = new BABYLON.Color3(1, 1, 0.5);//lumière de l'objet
        sphere.material = material;

        //création d'un halo autour de l'objet
        let glowLayer = new BABYLON.GlowLayer("glow", this.scene);
        glowLayer.intensity = 0.5
        glowLayer.unlit = true;
        glowLayer.addIncludedOnlyMesh(sphere);

        return sphere
    }

    creerBonusP()
    {
        let sphere = BABYLON.MeshBuilder.CreateSphere(this.nom, {diameter: 1,}, this.scene);//créé une sphère de diamètre 5
        let material = new BABYLON.StandardMaterial("material", this.scene);//création du métériau
        material.diffuseColor = new BABYLON.Color3(1, 1, 0);//couleur jaune
        material.emissiveColor = new BABYLON.Color3(1, 1, 0.5);//lumière de l'objet
        sphere.material = material;

        //création d'un halo autour de l'objet
        let glowLayer = new BABYLON.GlowLayer("glow", this.scene);
        glowLayer.intensity = 0.5
        glowLayer.unlit = true;
        glowLayer.addIncludedOnlyMesh(sphere);

        return sphere        
    }

    creerAnimations(animationGroups)
    {
        if(this.nom == "Cle")
            {
                
                // this.mesh.rotate(BABYLON.Axis.Z, Math.PI / 8, BABYLON.Space.LOCAL); 
                // this.scene.onBeforeRenderObservable.add(()=>
//                 {
                    // this.mesh.rotate(BABYLON.Axis.Z, 0.01, BABYLON.Space.LOCAL); 
                    // this.mesh.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.WORLD); 
                    // this.mesh.rotate(BABYLON.Axis.X, 0.01, BABYLON.Space.LOCAL); 
                // })
            }
            else return null;
    }

}
