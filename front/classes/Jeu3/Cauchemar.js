import { Ennemi } from "../ennemi";

export class Cauchemar extends Ennemi
{
    attaquer() {
        console.log("Le cauchemar attaque !");
    }

    seDeplacer() {
        console.log("Le cauchemar se déplace !");
    }
}
