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

// Fonction pour charger une section HTML/CSS/JS dynamiquement
async function loadSection(section) {
    const content = document.getElementById('content');

    // Charger le fichier HTML de la section
    const response = await fetch(`./sections/${section}/${section}.html`);
    const html = await response.text();
    content.innerHTML = html;

    // Charger le CSS de la section
    const existingStyle = document.querySelector(`#style-${section}`);
    if (!existingStyle) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./sections/${section}/${section}.css`;
        link.id = `style-${section}`;
        document.head.appendChild(link);
    }

    // Charger le JS de la section
    const script = `./sections/${section}/${section}.js`;
    // script.src = `./sections/${section}/${section}.js`;
    // script.type = 'module';
    // document.head.appendChild(script);

    try {
        

        const module = await import(script);
        // console.log(module);

        // Si la section chargée est "Connexion", exécuter afficherConnexion()
        if (section === "Connexion" && module.afficherConnexion) {
            module.afficherConnexion();
        }
        if (section === "Jeu3") {
            module.initBabylon();
        }
        

        // Attacher les événements dans le HTML
        document.getElementById("login-header")?.addEventListener("click", module.afficherConnexion);
        document.getElementById("signup-header")?.addEventListener("click", module.afficherInscription);
        document.getElementById("connexion-button")?.addEventListener("click", module.connexion);
        document.getElementById("inscription-button")?.addEventListener("click", module.inscription);
    } catch (error) {
        console.error(`Erreur lors du chargement du module ${script}`, error.message);
    }


    if(section == "Jeu1" || section == "Jeu2" || section == "Jeu3")
    {
        let username = getCookie("username");
        if(username == null)
        {
            alert("Vous devez être connecté pour accéder à cette section.");
            loadSection("Connexion");
        }
        else
        {
            disableScroll();
        }
        // if(section == "Jeu3")
        // {
            // alert("Le jeu 3 n'est pas encore disponible.");
            // let score = getScoreFromCookie();
            // document.getElementById("score").innerHTML = "Score : " + score;
            // let lienBabylonjs = '<script src="http://cdn.babylonjs.com/2-4/babylon.max.js"></script>';

            // const lienBabylonjs = document.createElement('script');
            // lienBabylonjs.src = "https://cdn.babylonjs.com/babylon.max.js";
            // lienBabylonjs.defer = true;
            // document.head.appendChild(lienBabylonjs);
        // }
    }
    else
    {
        enableScroll();
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
