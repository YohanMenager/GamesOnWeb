import { Ichargeur } from '../Ichargeur.js';
import { lvl_1 } from './Niveaux/lvl_1.js';
import { lvl_2 } from './Niveaux/lvl_2.js';
import { zoneTest } from './Niveaux/zoneTest.js';

export class ChargeurDreamz extends Ichargeur {
    scene;
    niveau;
    constructor(scene) {
        super();
        this.scene = scene;
    }

    chargerNiveau(niveau) {
        //effacer le niveau d'avant pour éviter les fuites de mémoire
        //si la méthode est appelée pour la première fois, on évite les erreurs en vérifiant si le niveau existe
        if (this.niveau) {
            this.niveau.dispose();
        }
        switch (niveau) {
            case -1:
                this.niveau = new zoneTest(this.scene);
                break;
            case 1:
                this.niveau = new lvl_1(this.scene);
                break;
            case 2:
                this.niveau = new lvl_2(this.scene);
                break;
            // Ajouter d'autres niveaux ici
            default:
                console.error("Niveau non reconnu !");
                this.niveau = null;
                break;
        }
    }
}