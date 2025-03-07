/**
 * Classe Plateforme
 * représente le sol et le décor
 */
export class Plateforme
{
    static numero = 0;

    /**
     * 
     * @param {*} largeur largeur de la plateforme
     * @param {*} longueur longueur de la plateforme
     * @param {*} hauteur hauteur de la plateforme
     * @param {*} positionX position en X
     * @param {*} positionZ position en Z
     * @param {*} texture texture de la plateforme
     * @param {*} normalMap carte de normales pour le relief
     * @param {*} scene scène où afficher la plateforme
     * @param {*} relief hauteur du relief pour la normalMap
     */
    constructor(largeur, longueur, hauteur, positionX, positionY, positionZ, texture, normalMap, scene, relief)
    {
        this.largeur = largeur;
        this.longueur = longueur;

       

        this.mesh = BABYLON.MeshBuilder.CreateBox(
            "plateforme_"+Plateforme.numero, 
            { width: largeur, 
                height: hauteur, 
                depth: longueur, faceUV: this.genererUV(),
                }, 
                scene);

        this.mesh.renderingGroupId = 1;//sert à que ce qui brille ne brille pas à travers les murs. probablement pas nécessaire à cause de l'angle de vue mais on sait jamais
        // let materiau = new BABYLON.StandardMaterial("materiauSol", scene);
        const materiau = new BABYLON.StandardMaterial("materiau", scene);
        // const materiauFace = new BABYLON.StandardMaterial("materiauFace", scene);
        // const materiauCote = new BABYLON.StandardMaterial("materiauCote", scene);

        if(texture != null)
        {
            materiau.diffuseTexture = new BABYLON.Texture(texture, scene);
            materiau.diffuseTexture.uScale = 1; // Nombre de répétitions en largeur
            materiau.diffuseTexture.vScale = 1; // Nombre de répétitions en hauteur

        }
        else{
            materiau.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.9);
            materiau.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);  
        }
        if(normalMap != null)
        {
            materiau.bumpTexture = new BABYLON.Texture(normalMap, scene);  
            materiau.bumpTexture.uScale =  1; // Nombre de répétitions en largeur
            materiau.bumpTexture.vScale =  1; // Nombre de répétitions en hauteur
            materiau.bumpTexture.level = relief; // Augmente l'effet de relief


            // materiau.useParallax = true;
            // materiau.useParallax = true;

        }
        // materiau.bumpTexture = new BABYLON.Texture("/assets/normalMaps/nuages2.jpg", scene);
 
        this.mesh.material = materiau;
        this.mesh.position.set(positionX, positionY, positionZ);
        this.mesh.checkCollisions = true;
        Plateforme.numero++;
    }

    genererUV()
    {
        const faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0, 0, this.largeur/this.longueur, 1);//arrière 
        faceUV[1] = new BABYLON.Vector4(0, 0, this.largeur/this.longueur, 1);//avant 
        faceUV[2] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//droite
        faceUV[3] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//gauche 
        faceUV[4] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//haut 
        faceUV[5] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//bas


        // for(let i of [2,3,4,5])
        // {
        //     faceUV[i] = new BABYLON.Vector4(0, 0, this.largeur/this.hauteur, 1);
        // }

        return faceUV;
    }


}