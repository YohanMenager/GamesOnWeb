import { GestionPoints } from "../GestionPoints.js";
import Cookie from "./cookie.js";
import { create2DArray } from "./utils.js";

/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
export default class Grille {
  cookiesSelectionnees = [];

  constructor(l, c) {
    this.audioCoup = new Audio('../../assets/sounds/pop.mp3');
    this.audioPoint = new Audio('../../assets/sounds/point.mp3');
    this.colonnes = c;
    this.lignes = l;
    this.nombreDeCoup=25;
    this.score = 0;
    // le tableau des cookies
    this.cookies = create2DArray(l);

    //let existeAlignement = false;
    this.remplirTableauDeCookies(6);
    /*
    do {
      this.remplirTableauDeCookies(6);
      existeAlignement = this.testAlignementDansTouteLaGrille();
      console.log("ExisteAlignement : " + existeAlignement)
    } while(existeAlignement)
    */
  }

  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    caseDivs.forEach((div, index) => {
      let ligne = Math.floor(index / this.lignes);
      let colonne = index % this.colonnes;

      let cookie = this.cookies[ligne][colonne];
      let img = cookie.htmlImage;

      // On met un écouteur de click sur l'image
      img.onclick = (event) => {
        let cookieClickee = this.getCookieFromImage(event.target);

        // on regarde combien on a de cookies selectionnées
        if (this.cookiesSelectionnees.length === 0) {
          cookieClickee.selectionnee();
          this.cookiesSelectionnees.push(cookieClickee);
        } else if (this.cookiesSelectionnees.length === 1) {
          cookieClickee.selectionnee();
          this.cookiesSelectionnees.push(cookieClickee);
          // on essaie de swapper
          let swapped = Cookie.swapCookies(this.cookiesSelectionnees[0],
            this.cookiesSelectionnees[1]);

            if(swapped) {
              // On en a swappé deux, on cherche les alignements

              this.testAlignementDansTouteLaGrille();


              this.coupPlayed();
            }
          // on remet le tableau des cookies selectionnées à 0
          this.cookiesSelectionnees = [];
        } else {
        }
      }

      // On met un écouteur de drag'n'drop sur l'image
      img.ondragstart = (event) => {
        let cookieDragguee = this.getCookieFromImage(event.target);
        cookieDragguee.selectionnee();

        // on remet à zero le tableau des cookies selectionnees
        this.cookiesSelectionnees = [];
        this.cookiesSelectionnees.push(cookieDragguee);
      }

      img.ondragover = (event) => {
        return false;
      }

      img.ondragenter = (event) => {
        const i = event.target;
        i.classList.add("imgDragOver");
      }

      img.ondragleave = (event) => {
        const i = event.target;
        i.classList.remove("imgDragOver");
      }

      img.ondrop = (event) => {
        let cookieDragguee = this.getCookieFromImage(event.target);
        cookieDragguee.selectionnee();

        // on ajoute au tableau la deuxième cookie
        this.cookiesSelectionnees.push(cookieDragguee);

        // et on regarde si on peut les swapper
        let swapped = Cookie.swapCookies(this.cookiesSelectionnees[0], this.cookiesSelectionnees[1]);
        if(swapped) {
          // On en a swappé deux, on cherche les alignements
          this.testAlignementDansTouteLaGrille();
          this.coupPlayed();

        }
        // on remet le tableau des cookies selectionnées à 0
        this.cookiesSelectionnees = [];
        cookieDragguee.htmlImage.classList.remove("imgDragOver");
      }

      div.appendChild(img);
    });
  }

  getCookieFromImage(i) {
    let ligneCookie = i.dataset.ligne;
    let colonneCookie = i.dataset.colonne;
    return this.cookies[ligneCookie][colonneCookie];
  }
  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    for (let l = 0; l < this.lignes; l++) {
      for (let c = 0; c < this.colonnes; c++) {
        //console.log("ligne = " + l + " colonne = " + c);
        const type = Math.round(Math.random() * (nbDeCookiesDifferents - 1))
        this.cookies[l][c] = new Cookie(type, l, c);
      }
    }
  }


  // Test des alignements de 3 cookies ou plus, horizontalement et verticalement

  testAlignementDansTouteLaGrille() {
    let alignementExisteLignes = false;
    let alignementExisteColonnes = false;

    alignementExisteLignes = this.testAlignementToutesLesLignes();
    alignementExisteColonnes = this.testAlignementToutesLesColonnes();

    return (alignementExisteLignes || alignementExisteColonnes);
  }

  testAlignementToutesLesLignes() {
    let alignementLignes = false;

    for (let i = 0; i < this.lignes; i++) {
      alignementLignes = this.testAlignementLigne(i);
    }

    return alignementLignes;
  }

  testAlignementLigne(ligne) {
    let tabLigne = this.cookies[ligne];
    let groupe = [];
    let resultat = [];
  
    for (let c = 0; c < this.colonnes; c++) {
      if (groupe.length === 0 || tabLigne[c].type === groupe[groupe.length - 1].type) {
        groupe.push(tabLigne[c]);
      } else {
        if (groupe.length >= 3) {
          resultat = resultat.concat(groupe);
        }
        groupe = [tabLigne[c]];
      }
    }
  
    if (groupe.length >= 3) {
      resultat = resultat.concat(groupe);
    }
  
    return resultat;
  }
  
  
  
  testAlignementDansTouteLaGrille() {
    let tousLesAlignements = [];
  
    for (let l = 0; l < this.lignes; l++) {
      tousLesAlignements = tousLesAlignements.concat(this.testAlignementLigne(l));
    }
  
    for (let c = 0; c < this.colonnes; c++) {
      tousLesAlignements = tousLesAlignements.concat(this.testAlignementColonne(c));
    }
  
    
    let cookiesUniques = [...new Set(tousLesAlignements)];
  
   
    if (cookiesUniques.length >= 3) {
      cookiesUniques.forEach(cookie => {
        cookie.cachee();
      });
      
      this.ajouterScorePourAlignement(cookiesUniques.length);
      return true;
    }
  
    return false;
  }

  testAlignementColonne(colonne) {
    let groupe = [];
    let resultat = [];
  
    for (let l = 0; l < this.lignes; l++) {
      let cookie = this.cookies[l][colonne];
  
      if (groupe.length === 0 || cookie.type === groupe[groupe.length - 1].type) {
        groupe.push(cookie);
      } else {
        if (groupe.length >= 3) {
          resultat = resultat.concat(groupe);
        }
        groupe = [cookie];
      }
    }
  
    if (groupe.length >= 3) {
      resultat = resultat.concat(groupe);
    }
  
    return resultat;
  }
  contientCookieCachee() {
    for (let l = 0; l < this.lignes; l++) {
      for (let c = 0; c < this.colonnes; c++) {
          let cookie = this.cookies[l][c];
          if (cookie.htmlImage.classList.contains("cookieCachee")) {
            return true;
          }
      }
    }
    return false;

  }

  updateGrilleDebut() {
    this.testAlignementDansTouteLaGrille();
    while (this.contientCookieCachee()) {
        for (let l = 0; l < this.lignes; l++) {
            for (let c = 0; c < this.colonnes; c++) {
                let cookie = this.cookies[l][c];
                if (cookie.htmlImage.classList.contains("cookieCachee")) {
                    this.cookies[l][c] = new Cookie(Math.round(Math.random() * 5), l, c);
                    if (this.cookies[l][c].htmlImage) {
                        this.cookies[l][c].htmlImage.classList.remove("cookieCachee");
                    }
                }
            }
        }
        this.showCookies();
        this.testAlignementDansTouteLaGrille();
        
    }
    this.score=0;
  }

  coupPlayed() {


    if (this.nombreDeCoup > 0) {
      this.audioCoup.play();
      this.nombreDeCoup--;
      this.afficherCoup()
        if (this.contientCookieCachee()) {
          if (this.contientCookieCachee()) {
            console.log("Il reste des cookies cachés");

            this.FaireDisparaitreLesCookiesCachées();
            this.faireTomberLesCookies();
            this.afficherScore() 
            this.audioPoint.play();
          }
        }
    } 
    this.checkGameOver()
  }
  faireTomberLesCookies() {
    for (let l = 8; l > -1; l--) {
      for (let c = 8; c > -1; c--) {
        if (this.cookies[l][c] == null) {
          let move = 1; 
  
          while (l - move >= 0 && this.cookies[l - move][c] == null) {
            move++;
          }
  
          if (l - move >= 0) {
            this.cookies[l][c] = this.cookies[l - move][c];
            console.log(this.cookies[l][c])
            this.cookies[l][c].setLigne(l);
            this.cookies[l][c].setColonne(c);
  
            this.cookies[l - move][c] = null;
          }
        }
      }
    }
    for (let l = 8; l > -1; l--) {
      for (let c = 8; c > -1; c--) {
        if (this.cookies[l][c] == null) {
          this.cookies[l][c] = new Cookie(Math.round(Math.random() * 5), l, c);
        }
      }
    }
  
    this.showCookies();
    console.log(this.cookies);

    this.testAlignementDansTouteLaGrille();

    if (this.contientCookieCachee()) {
      this.FaireDisparaitreLesCookiesCachées();
      this.faireTomberLesCookies();
    }
  }
  
  
  FaireDisparaitreLesCookiesCachées() {
    for (let l = 0; l < this.lignes; l++) {
      for (let c = 0; c < this.colonnes; c++) {
        let cookie = this.cookies[l][c];
        if (cookie && cookie.htmlImage.classList.contains("cookieCachee")) {
      
          cookie.htmlImage.remove();
          
          this.cookies[l][c] = null;
        }
      }
    }
  }
  ajouterScorePourAlignement(n) {
    this.score += 10 * (n * (n + 1)) / 2;
  }
  afficherScore() {
    let scoreDiv = document.querySelector("#score");
    scoreDiv.innerHTML = "Score : "+ this.score;
  }
  afficherCoup() {
    let coupDiv = document.querySelector("#coup");
    coupDiv.innerHTML = "Coups restants : "+ this.nombreDeCoup;
  }
  checkGameOver() {
    if (this.nombreDeCoup == 0) {
      let modal = document.getElementById("gameOverModal");
      let finalScore = document.getElementById("finalscore");
      finalScore.textContent = "Score : " + this.score;
      modal.style.display = "block";
      
      document.getElementById("replayButton").onclick = () => {
        location.reload(); 
      };

      if(this.score > GestionPoints.getPointsParJeu(1)[1])
      {
        GestionPoints.setPointsNiveau(1, 1, this.score);
        GestionPoints.sauvegarder();
      }
      else if(GestionPoints.getPointsParJeu(1)[1] == null){
        GestionPoints.setPointsNiveau(1, 1, this.score);
        GestionPoints.sauvegarder();
      }
      let MaxScoreElem = document.getElementById("maxscore");
      let MaxScore = GestionPoints.getPointsParJeu(1)[1];
      MaxScoreElem.textContent = "Max Score : " + MaxScore;
    }
  }
}