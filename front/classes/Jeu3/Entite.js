import { IEntite } from "../IEntite.js";

export class Entite extends IEntite
{
    walk;
    idle;
    vitesseY = 1;
    nomModele;
    scale;
    constructor(vitesse, vitesseMax, nom, position, scene, gravite = true, nomModele = null, scale = 1)
    {
        super(vitesse, vitesseMax, null, nom, position);
        this.scene = scene;
        this.gravite = gravite;
        // console.log("-------------------------------\ninialisation de nomModele pour "+this.nom+"\n-------------------------------\n")
        // console.log(this.nom+" - "+nomModele)
        this.nomModele = nomModele;
        // console.log("-------------------------------\nfin inialisation de nomModele pour "+this.nom+"\n-------------------------------\n")
        // console.log(this.nom+" - "+this.nomModele)
        this.scale = scale;
       
        // if(nomModele != null && nom != "Joueur")
        // {
        //     this.init(nomModele, scale);
        // }
    }

    async init()
    {
        
        await this.creerModele(this.nomModele, this.scale);
        this.ajouterCollisions();
    }

    ajouterCollisions()
    {
        return null;//implémenté dans les classes filles
    }

    genererHitbox()
    {
        this.mesh.position = this.position;
        this.mesh.name=this.nom;
        this.hitbox = BABYLON.MeshBuilder.CreateBox("hitbox", { size: 4.0 }, this.scene);
        this.hitbox.material = new BABYLON.StandardMaterial("hitboxMaterial", this.scene);
        this.hitbox.material.alpha = 0.5;
        this.hitbox.material.wireframe = true;//pour tester et voir la hitbox
        this.hitbox.isVisible = false;
        this.hitbox.checkCollisions = true;
        //aide en partie à empêcher le joueur de passer à travers les murs
        //babylonjs utilise un ellipsoïde pour la hitbox, qui est plus précis qu'une boîte et qui est invisible
        this.hitbox.ellipsoid = new BABYLON.Vector3(2, 2, 2); // Définit un volume de collision
        this.hitbox.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0); // Décale vers le haut

        this.hitbox.position = this.mesh.position.clone();   
        
        // this.hitbox.applyGravity = true;

        if(this.gravite)
        {
            this.scene.onBeforeRenderObservable.add(() => {
                this.hitbox.moveWithCollisions(new BABYLON.Vector3(0, -1*this.vitesseY, 0));
                this.mesh.position.copyFrom(this.hitbox.position);
                this.vitesseY += 0.05;
                
            });            
            //arrête la chute si on touche le sol	
            this.hitbox.onCollideObservable.add((otherMesh) => {
                if(otherMesh.metadata?.type=="Sol")
                {
                    this.vitesseY = 0;
                }
            });
        }

        
        this.hitbox.metadata = { type: this.nom, instance: this };

    }

    /**
     * déplace le joueur
     * @param {*} mv vecteur de déplacement
     */
    seDeplacer(mv) {

        if(mv.x == 0 && mv.z == 0 && this.walk && this.idle) {
            this.walk.stop();
            this.idle.start(true);
        }
        else {
            if(this.idle && this.walk)
            {
                this.idle.stop();
                this.walk.start(true);
            }

            const angle = Math.atan2(mv.x, mv.z);
            const quaternion = BABYLON.Quaternion.FromEulerAngles(0, angle, 0);
            this.mesh.rotationQuaternion = quaternion;
        }


        //le joueur se déplace, en ne passant pas à travers les murs. on multiplie par la vitesse
        this.hitbox.moveWithCollisions(new BABYLON.Vector3(mv.x * this.vitesse, mv.y, mv.z * this.vitesse));

        // Synchronisation du modèle avec la hitbox, sinon la hitbox bouge toute seule
        this.mesh.position.copyFrom(this.hitbox.position);

        //la vitesse augmente progressivement, sauf si on atteint la vitesse maximale
        if(this.vitesse < this.vitesseMax) {
            this.vitesse += 0.01;
        }

        //debug
        // console.log(this.vitesse);
    }
    
    /**
     * Supprime l'entité
     */
    dispose()
    {
        if (this.mesh) {
            this.scene.removeMesh(this.mesh); // Supprime le mesh de la scène
            if (this.mesh.getChildMeshes) {
                this.mesh.getChildMeshes().forEach(m => this.scene.removeMesh(m));
            }
            this.mesh.dispose(true, true);

        }
        if(this.hitbox)
        {
            this.scene.removeMesh(this.hitbox);
            this.hitbox.dispose(true, true);
        }

        
        if (this.skeleton) {
            this.skeleton.dispose(); // Supprime le squelette s'il y en a un
        }

        if (this.animationGroup) {
            this.animationGroup.dispose(); // Supprime les animations s'il y en a
        }

        if (this.onBeforeRenderObserver) {
            this.scene.onBeforeRenderObservable.remove(this.onBeforeRenderObserver);
        }

        if(this.nom)
        {
            this.nom="";
        }
        if(this.requis)
        {
            this.requis = false;
        }
        
    }

    async creerModele()
    {
        let result = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/3d/", this.nomModele, this.scene);
        this.mesh = result.meshes[0];
        this.mesh.name = this.nom;

        this.mesh.scaling = new BABYLON.Vector3(this.scale, this.scale, this.scale);

        this.genererHitbox();

        const animationGroups = result.animationGroups;
        // if (animationGroups && animationGroups.length > 0)
        // {
            this.creerAnimations(animationGroups);
        // }
        // else
        // {
            // console.log("pas d'animations pour "+this.#nom);
            // console.log(result.meshes);
            // this.mesh.alwaysSelectAsActiveMesh = true;
            // this.mesh.unfreezeWorldMatrix();
            // this.mesh.rotation.x = BABYLON.Tools.ToRadians(45);
            // this.scene.onBeforeRenderObservable.add(() => {
            //     this.mesh.rotation.y+=0.01;
    
            // });
        // }

        if(!this.mesh.material)
        {
            this.genererMateriau();
            
        }
    }

    genererMateriau()
    {
        return null;//implémenté dans les classes filles
    }

    creerAnimations(animationGroups)
    {
        return null;//implémenté dans les classes filles
    }

}