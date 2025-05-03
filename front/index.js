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

    if(section == "Jeu1" || section == "Jeu2" || section == "Jeu3")
    {
        let username = getCookie("username");
        if(username == null)
        {
            alert("Vous devez être connecté pour accéder à cette section.");
             return loadSection("Connexion");
        }
        else
        {
            disableScroll();
        }
    }
    else
    {
        enableScroll();
    }
        
    // Supprimer l'ancien script JS de section
    const oldScript = document.querySelector('script[data-section-script]');
    if (oldScript) oldScript.remove();

    // Supprimer le style associé
    const oldStyle = document.querySelector(`#style-${section}`);
    if (oldStyle) oldStyle.remove();

    // Charger le HTML
    const response = await fetch(`./sections/${section}/${section}.html`);
    const html = await response.text();
    content.innerHTML = html;

    // Ajouter le CSS s'il n'existe pas déjà
    if (!document.querySelector(`#style-${section}`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./sections/${section}/${section}.css`;
        link.id = `style-${section}`;
        document.head.appendChild(link);
    }

    // Ajouter le JS de la section
    const script = document.createElement('script');
    script.src = `./sections/${section}/${section}.js`;
    script.setAttribute('data-section-script', section);
    script.type = 'module'; 

    import(`./sections/${section}/${section}.js`)
    .then(module => {
      if (typeof module.init === 'function') {
        module.init();
      }
    });


    document.head.appendChild(script);

}

function toggleMenu()
{
    let navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
    let burger = document.querySelector('.burger');
    burger.classList.toggle('active');

}
window.toggleMenu = toggleMenu;




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
