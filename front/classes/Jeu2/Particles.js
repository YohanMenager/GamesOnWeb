/*Classe pour générer des particules lors d’événements 
(ex. ramassage de power-up). */

export default class Particle {
    constructor(x, y, couleur, taille, vitesseX, vitesseY) {
        this.x = x;
        this.y = y;
        this.couleur = couleur;
        this.taille = taille;
        this.vitesseX = vitesseX;
        this.vitesseY = vitesseY;
        this.dureeDeVie = 50; // durée de vie en nombre de frames
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        this.dureeDeVie--;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.taille, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}