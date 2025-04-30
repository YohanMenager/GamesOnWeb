/*Objet améliorant les capacités du joueur (ex. réduction de taille).*/

import ObjectGraphique from "./ObjectGraphique.js";

export default class PowerUp extends ObjectGraphique {
    constructor(x, y, w, h, couleur) {
        super(x, y, w, h, couleur);
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}