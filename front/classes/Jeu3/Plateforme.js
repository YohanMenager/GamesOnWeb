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
    constructor(largeur, longueur, hauteur, positionX, positionY, positionZ, texture, textureCote, normalMap, normalMapCote, scene, relief, opacity, defilement = false)
    {
        //debug
        // console.log("plateforme numéro ", Plateforme.numero)
        // console.log("Texture URL:", texture);
        // console.log("TextureCote URL:", textureCote);
        // console.log("NormalMap URL:", normalMap);
        // console.log("NormalMapCote URL:", normalMapCote);

        this.largeur = largeur;
        this.longueur = longueur;

        this.scene = scene;

       

        this.mesh = BABYLON.MeshBuilder.CreateBox(
            "plateforme_"+Plateforme.numero, 
            { width: largeur, 
                height: hauteur, 
                depth: longueur, 
                }, 
                scene);
        
        const multimat = new BABYLON.MultiMaterial("multi", scene);
        // const materiau = new BABYLON.StandardMaterial("materiau", scene);
        const materiauFace = new BABYLON.StandardMaterial("materiauFace", scene);
        const materiauCote = new BABYLON.StandardMaterial("materiauCote", scene);
        const materiauHaut = new BABYLON.StandardMaterial("materiauHaut", scene)

        materiauFace.alpha = opacity;
        materiauCote.alpha = opacity;
        materiauHaut.alpha = opacity;

        if(texture != null)
        {
            materiauHaut.diffuseTexture = new BABYLON.Texture(texture, scene);
            materiauHaut.diffuseTexture.uScale = longueur/20; // Nombre de répétitions en largeur
            materiauHaut.diffuseTexture.vScale = largeur/20; // Nombre de répétitions en hauteur

        }
        else{
            materiauHaut.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.9);
            materiauHaut.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);  
        }
        if(textureCote != null)
        {
            materiauCote.diffuseTexture = new BABYLON.Texture(textureCote, scene)
            materiauCote.diffuseTexture.uScale = hauteur/10;
            materiauCote.diffuseTexture.vScale = longueur/10;

            materiauFace.diffuseTexture = new BABYLON.Texture(textureCote, scene)
            materiauFace.diffuseTexture.uScale = largeur/10;
            materiauFace.diffuseTexture.vScale = hauteur/10;            
        }
        else
        {
            materiauCote.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.9);
            materiauCote.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);              
        }


        if(normalMap != null)
        {
            materiauHaut.bumpTexture = new BABYLON.Texture(normalMap, scene);  
            materiauHaut.bumpTexture.uScale =  longueur/20; // Nombre de répétitions en longueur
            materiauHaut.bumpTexture.vScale =  largeur/20; // Nombre de répétitions en largeur
            materiauHaut.bumpTexture.level = relief; // Augmente l'effet de relief



        }
        if(normalMapCote != null)
        {
            materiauCote.bumpTexture = new BABYLON.Texture(normalMap, scene);  
            materiauCote.bumpTexture.uScale =  longueur/10; // Nombre de répétitions en largeur
            materiauCote.bumpTexture.vScale =  hauteur/10; // Nombre de répétitions en hauteur
            materiauCote.bumpTexture.level = relief; // Augmente l'effet de relief    
            
            materiauFace.bumpTexture = new BABYLON.Texture(normalMap, scene);  
            materiauFace.bumpTexture.uScale =  largeur/10; // Nombre de répétitions en longueur
            materiauFace.bumpTexture.vScale =  hauteur/10; // Nombre de répétitions en hauteur
            materiauFace.bumpTexture.level = relief; // Augmente l'effet de relief                  
        }


        if(defilement)
        {
            materiauHaut.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
            materiauHaut.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            
            materiauFace.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
            materiauFace.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
            this.scene.onBeforeRenderObservable.add(() => {
                this.mesh.material.subMaterials[0].diffuseTexture.uOffset -= 0.01;
                this.mesh.material.subMaterials[2].diffuseTexture.vOffset += 0.005;
            });
        }



        multimat.subMaterials.push(materiauFace);
        multimat.subMaterials.push(materiauCote);
        multimat.subMaterials.push(materiauHaut);



        this.mesh.material = multimat;

        //assigner des subMeshs aux différentes faces
        this.mesh.subMeshes = [];
        const verticesCount = this.mesh.getTotalVertices();

        //haut de la plateforme
        this.mesh.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, this.mesh));
        this.mesh.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 6, 6, this.mesh));

        //côtés
        this.mesh.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 12, 6, this.mesh));
        this.mesh.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 18, 6, this.mesh));
    
        //faces avant et arrière
        this.mesh.subMeshes.push(new BABYLON.SubMesh(2, 0, verticesCount, 24, 6, this.mesh));
        this.mesh.subMeshes.push(new BABYLON.SubMesh(2, 0, verticesCount, 30, 6, this.mesh));
    

        this.mesh.position.set(positionX, positionY, positionZ);
        this.mesh.checkCollisions = true;

        Plateforme.numero++;
        
    }

    dispose()
    {
        this.mesh.dispose();
    }
    
    createInstance(name, x, y, z) {
        let instance = this.mesh.createInstance(name);
        instance.checkCollisions = this.mesh.checkCollisions;
        instance.metadata = this.mesh.metadata;
        instance.position = new BABYLON.Vector3(x, y, z);
        return instance;
    }


}