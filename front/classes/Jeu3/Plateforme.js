export class Plateforme
{
    static numero = 0;
    constructor(largeur, longueur, hauteur, positionX, positionZ, texture, normalMap, scene, relief)
    {
        this.largeur = largeur;
        this.longueur = longueur;

        this.positionX = positionX;
        this.positionZ = positionZ;
       

        this.mesh = BABYLON.MeshBuilder.CreateBox(
            "plateforme_"+Plateforme.numero, 
            { width: largeur, 
                height: hauteur, 
                depth: longueur, faceUV: this.genererUV(),
                }, 
                scene);


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
        this.mesh.position.set(positionX, -5, positionZ);
        this.mesh.checkCollisions = true;
        Plateforme.numero++;
    }

    genererUV()
    {
        const faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0, 0, this.largeur/this.longueur, 1);//arrière -- correct
        faceUV[1] = new BABYLON.Vector4(0, 0, this.largeur/this.longueur, 1);//avant -- correct
        faceUV[2] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//droite -- correct ?
        faceUV[3] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//gauche -- correct ?
        faceUV[4] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//haut --correct ?
        faceUV[5] = new BABYLON.Vector4(0, 0, this.longueur/this.largeur, 1);//bas


        // for(let i of [2,3,4,5])
        // {
        //     faceUV[i] = new BABYLON.Vector4(0, 0, this.largeur/this.hauteur, 1);
        // }

        return faceUV;
    }


}