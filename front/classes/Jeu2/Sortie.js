/*Objectif à atteindre pour passer au niveau suivant.*/

import ObjectGraphique from "./ObjectGraphique.js";

export default class Sortie extends ObjectGraphique {
    constructor(x, y, w, h, couleur) {
        super(x, y, w, h, couleur);
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}