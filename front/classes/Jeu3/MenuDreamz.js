import {Imenu} from "../Imenu.js";
import {GestionPoints} from "../GestionPoints.js";
import {Timer} from "../Timer.js";

export class MenuDreamz extends Imenu{
    niveauxDebloques = 0;

    constructor(chargeur, niveauxDebloques = 2)
    {
        super(chargeur);
        this.niveauxDebloques = niveauxDebloques;
    }

    async init()
    {
        console.log("Initialisation du menu...");
        this.ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("menu", true, this.chargeur.scene);
        this.menuContainer = new BABYLON.GUI.StackPanel("menuContainer");
        this.menuContainer.isVertical = true;
        this.menuContainer.width = "1000px";
        this.menuContainer.height = "90%";
        this.menuContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.menuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        this.menuContainer.background = "rgb(30,30,30)";
        // this.menuContainer.alpha = 0.5;
        this.menuContainer.zIndex = 1;
        this.menuContainer.thickness = 0;

        const boutonFermer = BABYLON.GUI.Button.CreateSimpleButton("fermer", "Fermer le menu");
        boutonFermer.width = "150px";
        boutonFermer.height = "50px";
        boutonFermer.color = "white";
        boutonFermer.background = "black";
        boutonFermer.fontSize = 25;
        boutonFermer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        boutonFermer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.menuContainer.addControl(boutonFermer);
        boutonFermer.onPointerClickObservable.add(() => {
            Timer.setVitesse(1);
            this.cacherMenu();
            if(this.chargeur.niveau.getNumero() != 0)
            {
                this.chargeur.hud.afficher();
            }
            
        })

        const boutonAccueil = BABYLON.GUI.Button.CreateSimpleButton("accueil", "Accueil");

        boutonAccueil.width = "150px";
        boutonAccueil.height = "50px";
        boutonAccueil.color = "black";
        boutonAccueil.fontSize = 25;
        boutonAccueil.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        boutonAccueil.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        boutonAccueil.top = `${(0)*60}px`;
        boutonAccueil.left = "-10px";
        boutonAccueil.paddingLeft = "10px";
        boutonAccueil.paddingTop = "10px";
        boutonAccueil.paddingRight = "10px";
        boutonAccueil.paddingBottom = "10px";
        boutonAccueil.textBlock.color = "black";
        boutonAccueil.textBlock.fontSize = 25;
        
            boutonAccueil.background = "yellow";
            boutonAccueil.onPointerClickObservable.add(() => {
                this.demarrerNiveau(0);
            });
        this.menuContainer.addControl(boutonAccueil);

        for(let i = 0; i < this.chargeur.nbNiveaux; i++)
        {
            const boutonNiveau = BABYLON.GUI.Button.CreateSimpleButton(`niveau${i}`, `Niveau ${i+1}`);
            boutonNiveau.width = "150px";
            boutonNiveau.height = "50px";
            boutonNiveau.color = "black";
            boutonNiveau.fontSize = 25;
            boutonNiveau.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            boutonNiveau.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            boutonNiveau.top = `${(i+1)*60}px`;
            boutonNiveau.left = "-10px";
            boutonNiveau.paddingLeft = "10px";
            boutonNiveau.paddingTop = "10px";
            boutonNiveau.paddingRight = "10px";
            boutonNiveau.paddingBottom = "10px";
            boutonNiveau.textBlock.color = "black";
            boutonNiveau.textBlock.fontSize = 25;
            
            if(i+1 < this.niveauxDebloques)
            {
                boutonNiveau.background = "yellow";
                boutonNiveau.onPointerClickObservable.add(() => {
                    this.demarrerNiveau(i+1);
                });
            }
            else if(i+1 == this.niveauxDebloques)
            {
                boutonNiveau.background = "blue";
                boutonNiveau.onPointerClickObservable.add(() => {
                    this.demarrerNiveau(i+1);
                });
            }
            else
            {
                boutonNiveau.background = "gray";
                boutonNiveau.alpha = 0.5;
                boutonNiveau.isHitTestVisible = false;
            }
            this.menuContainer.addControl(boutonNiveau);
            this.menuContainer.isVisible = false; // Le menu est caché au début
            this.ui.addControl(this.menuContainer);
        }
        
        if(!this.chargeur.joueur)
            {
                await this.chargeur.initJoueur();
            }
        // this.afficherMenu();
        // this.demarrerNiveau(0);
    }

    afficherMenu()
    {
        this.ui.isVisible = true;
        this.menuContainer.isVisible = true;
        // console.log("Affichage du menu...");
        // for (let i = 1; i <= this.niveauxDebloques; i++) {
        //     console.log(`Niveau ${i} disponible`);
        // }
        // await this.demarrerNiveau(-1);//pour utiliser la zone de test
        // await this.demarrerNiveau(this.niveauxDebloques);//temporaire jusqu'à qu'il y ait un menu
    }

    cacherMenu()
    {
        this.ui.isVisible = false;
        this.menuContainer.isVisible = false;
        // console.log("Cacher le menu...");
    }

    async demarrerNiveau(niveau)
    {
        // console.log(`entrée méthode demarrerNiveau`);
        if (niveau <= this.niveauxDebloques) {
            console.log(`Chargement du niveau ${niveau}...`);
            this.cacherMenu();
            await this.chargeur.chargerNiveau(niveau);
        } else {
            console.log(`Niveau ${niveau} non débloqué !`);
        }
    }
    niveauTermine(numero)
    {
        console.log("Niveau terminé !");
        Timer.setVitesse(0);
        this.chargeur.hud.cacher();
        //gestion des points
        let pointsGagnes = this.chargeur.niveau.calculerScoreNiveau();
        console.log(`Points gagnés : ${pointsGagnes}`);
        console.log('ancien score :', GestionPoints.getPointsParJeu(3)[numero]);
        if(pointsGagnes > GestionPoints.getPointsParJeu(3)[numero])
        {
            GestionPoints.setPointsNiveau(3, numero, pointsGagnes);
            console.log(`Nouveau score pour le niveau ${numero} : ${pointsGagnes}`);
        }

        //pour gérer si on débloque le niveau suivant ou pas
        if(numero==this.niveauxDebloques)
        {
            for(let bouton of this.menuContainer.children)
            {
                if(bouton.name == `niveau${numero}`)
                {
                    bouton.background = "blue";
                    bouton.alpha = 1;
                    bouton.isHitTestVisible = true;
                    bouton.onPointerClickObservable.add(() => {
                        this.demarrerNiveau(numero+1);
                    });
                }
                if(bouton.name == `niveau${numero-1}`)
                    {
                        bouton.background = "yellow";
                        // bouton.alpha = 1;
                        // bouton.isHitTestVisible = true;
                        // bouton.onPointerClickObservable.add(() => {
                        //     this.demarrerNiveau(numero+1);
                        // });
                    }
            }
            this.niveauxDebloques++;
        }
        this.afficherMenu();
    }
}