import { GestionPoints } from "./classes/GestionPoints.js";


loadSection("Accueil");

// Gérer les clics sur la navigation
document.querySelectorAll('.li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.li').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        const section = item.getAttribute('data-section');
        loadSection(section);
    });
});


let currentModule = null;

export async function loadSection(section) {


    const username = getCookie("username");
    // Vérifier la connexion pour les sections de jeux
    if (["Jeu1", "Jeu2", "Jeu3"].includes(section)) {
        if (!username) {
            alert("Vous devez être connecté pour accéder à cette section.");
            return loadSection("Connexion");
        }
        else
        {
            GestionPoints.init(username);  // Initialiser GestionPoints avec le nom d'utilisateur
        }
    }  

    if(username)
    {
        let afficheScore = document.getElementById("affichage-score");
        //récupérer le score du joueur, s'il n'existe pas, on met 0
        let score = GestionPoints.getTotalPointsParJoueur()[username] || 0;
        afficheScore.innerHTML = username + " - Score : " + score;
    }
    
    const content = document.getElementById('content');

    // Supprimer le précédent CSS de section
    document.querySelectorAll("link[data-section-style]").forEach(link => link.remove());

    // Charger le fichier HTML de la section
    const response = await fetch(`./sections/${section}/${section}.html`);
    const html = await response.text();
    content.innerHTML = html;

        // Si le module chargé est accueil, on rajoute sur les boutons les mêmes écouteurs que la navbar pour jouer aux jeux.
    if (section === "Accueil") {
        document.querySelectorAll('.btn-jeu').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.li').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                const section = item.getAttribute('data-section');
                loadSection(section);
            });
        });
    }


    // Ajouter le CSS pour la section
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./sections/${section}/${section}.css`;
    link.setAttribute("data-section-style", section);  // pour le retrouver et le supprimer si besoin
    document.head.appendChild(link);

    // Charger dynamiquement le module JS
    try {
        // Ici, on utilise `import()` pour charger le module en tant que module ES
        currentModule = await import(`./sections/${section}/${section}.js?${Date.now()}`);  // Cache busting avec timestamp

        // S'assurer que le module a une méthode `init()` si elle existe
        if (typeof currentModule.init === "function") {
            currentModule.init();  // Appeler `init()` si disponible
        }
    } catch (e) {
        console.error(`Erreur lors du chargement de ${section}.js`, e);
    }
}


function toggleMenu()
{
    let navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
    let burger = document.querySelector('.burger');
    burger.classList.toggle('active');

}




function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getMailFromCookie()
{
    let username = getCookie("username");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username);
    return user.email;
}   

function getScoreFromCookie()
{
    let username = getCookie("username");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username);
    return user.score;
}

function setScoreFromCookie(score)
{
    let username = getCookie("username");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username);
    user.score = score;
    localStorage.setItem('users', JSON.stringify(users));
}

function deconnexion()
{
    deleteCookie("username");
    alert("Déconnexion réussie !");
}

function disableScroll() {
    window.addEventListener("keydown", preventScroll);
}

function enableScroll() {
    window.removeEventListener("keydown", preventScroll);
}

function preventScroll(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
    }
}
