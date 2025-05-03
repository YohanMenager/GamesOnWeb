/*Classe des ennemis, avec un déplacement autonome et 
rebond sur les bords.*/

import ObjectGraphique from "./ObjectGraphique.js";

export default class Ennemi extends ObjectGraphique {
 constructor(x, y, w, h, couleur, canvas) {
    super(x, y, w, h, couleur);
    this.canvas = canvas;
    this.vitesseX = 3;
    this.vitesseY = 3;
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;

        // Rebondir sur les bords
        if (this.x<=0 || this.x + this.w >= this.canvas.width) {
            this.vitesseX = -this.vitesseX;
        }
        if (this.y<=0 || this.y + this.h >= this.canvas.height) {
            this.vitesseY = -this.vitesseY;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }

}