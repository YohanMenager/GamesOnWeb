import { IHUD } from "../IHUD.js";
import { Timer } from "../Timer.js";

export class HUD extends IHUD {

    menu;
    ui;
    /**
     * * Crée l'interface utilisateur
     */
    constructor(scene) {
        super();
        //création de l'ui
        this.ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

        /*-------------éléments-------------*/

        //bouton menu, en haut à droite
        this.boutonMenu = BABYLON.GUI.Button.CreateSimpleButton("menuButton", "Menu");
        this.boutonMenu.width = "150px";
        this.boutonMenu.height = "50px";
        this.boutonMenu.color = "white";
        this.boutonMenu.background = "black";
        this.boutonMenu.fontSize = 25;
        this.boutonMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.boutonMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.boutonMenu.top = "20px";
        this.boutonMenu.left = "-10px";
        this.boutonMenu.paddingLeft = "10px";
        this.boutonMenu.paddingTop = "10px";
        this.boutonMenu.paddingRight = "10px";
        this.boutonMenu.paddingBottom = "10px";
        this.boutonMenu.textBlock.color = "white";
        this.boutonMenu.textBlock.fontSize = 25;
        this.boutonMenu.onPointerClickObservable.add(() => {
            if(this.menu.isVisible) {
                Timer.setVitesse(1);
                this.menu.cacher();
                this.afficher();
            }
            else {
                Timer.setVitesse(0);
                this.menu.afficherMenu();
                this.cacher();
            }
        });
        this.ui.addControl(this.boutonMenu);


        // Label du niveau au centre en haut
        this.labelNiveau = new BABYLON.GUI.TextBlock("labelNiveau", "");
        this.labelNiveau.color = "white";
        this.labelNiveau.fontSize = 25;
        this.labelNiveau.height = "50px";
        this.labelNiveau.width = "150px";
        this.labelNiveau.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.labelNiveau.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.labelNiveau.top = "20px";
        this.ui.addControl(this.labelNiveau);



        //label score en haut à gauche
        this.score = new BABYLON.GUI.TextBlock("labelScore", "");
        this.score.height = "30px";
        this.score.color = "white";
        this.score.fontSize = 25;

        //label temps en dessous du score
        this.timer = new BABYLON.GUI.TextBlock("labelTemps", "");
        this.timer.height = "30px";
        this.timer.color = "white";
        this.timer.fontSize = 25;

        //label clés à trouver, en dessous du temps
        this.labelCle = new BABYLON.GUI.TextBlock("labelCle", "");
        this.labelCle.height = "30px";
        this.labelCle.color = "white";
        this.labelCle.fontSize = 25;

        this.panneauGauche = new BABYLON.GUI.StackPanel();
        this.panneauGauche.width = "300px";
        this.panneauGauche.isVertical = true;
        this.panneauGauche.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.panneauGauche.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.panneauGauche.paddingTop = "30px";
        this.panneauGauche.paddingLeft = "10px";
        this.panneauGauche.addControl(this.score);
        this.panneauGauche.addControl(this.timer);
        this.panneauGauche.addControl(this.labelCle);

        this.ui.addControl(this.panneauGauche);
        this.ui.zIndex = 1; // Assurez-vous que l'UI est au-dessus de tout le reste

    }



    setScore(val) {
        this.score.text = "Score : " + val;
    }
    setTemps(val) {
        this.timer.text = val;
    }

    afficherTexte(texte, position, duree = 2000) {
        let texteAffiche = new BABYLON.GUI.TextBlock("texteAffiche", texte);
        texteAffiche.color = "white";
        texteAffiche.fontSize = 25;
        texteAffiche.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        texteAffiche.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        texteAffiche.top = `${position?.y ?? 0}px`;
        texteAffiche.left = `${position?.x ?? 0}px`;
        this.ui.addControl(texteAffiche);
        setTimeout(() => {
            this.ui.removeControl(texteAffiche);
            texteAffiche.dispose(); // Dispose du texte après l'avoir retiré de l'UI
        }, duree);
    }

    cacher() {
        this.ui.isVisible = false;
        // this.boutonMenu.isVisible = false;
        this.labelNiveau.isVisible = false;
        this.panneauGauche.isVisible = false;
    }
    afficher() {
        this.ui.isVisible = true;
        this.boutonMenu.isVisible = true;
        this.labelNiveau.isVisible = true;
        this.panneauGauche.isVisible = true;
    }
    setNiveau(niveau) {
        this.labelNiveau.text = "Niveau " + niveau;
    }

    setNbCleTrouve(nbCleTrouve, nbCleRequise) {
        if(nbCleRequise == 0 || nbCleTrouve == nbCleRequise)
        {
            this.labelCle.text = "Trouvez la sortie !";

        }
        else
        {
            this.labelCle.text = "Clés : " + nbCleTrouve + "/" + nbCleRequise;
        }
        
    }

    reset(niveau) {
        this.setScore(0);
        this.setTemps("00:00");
        this.setNbCleTrouve(0, 0);
        this.setNiveau(niveau);
    }


}