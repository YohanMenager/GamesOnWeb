afficherConnexion();

function afficherConnexion()
{
    let connexion = document.getElementById('connexion');
    if(!connexion.classList.contains('active'))
    {
        document.getElementById('connexion').classList.add('active');
        document.getElementById('login-header').classList.add('active');
        document.getElementById('inscription').classList.remove('active');
        document.getElementById('signup-header').classList.remove('active');
        document.querySelector('.barre').style.left = '0';
    }

}
function afficherInscription()
{
    let inscription = document.getElementById('inscription');
    if(!inscription.classList.contains('active'))
    {
        document.getElementById('connexion').classList.remove('active');
        document.getElementById('signup-header').classList.add('active');
        document.getElementById('inscription').classList.add('active');
        document.getElementById('login-header').classList.remove('active');
        document.querySelector('.barre').style.left = '50%';
    }

}

function validerConnexion(){
    const username = document.forms["formConnexion"]["username"].value;
    const password = document.forms["formConnexion"]["password"].value;
    let valid = true;
    let messageUsername = document.getElementById("connexion-username-message");
    let messagePassword = document.getElementById("connexion-password-message");

    if (username === "") {
        messageUsername.innerText = "Nom d'utilisateur requis.";
        messageUsername.style.color = "red";
        valid = false;
    }
    else{
        messageUsername.innerText = "valide";
        messageUsername.style.color = "green";
    }

    if (password === "") {
        messagePassword.innerText = "Mot de passe requis. ";
        messagePassword.style.color = "red";
        valid = false;
    }
    else
    {
        messagePassword.innerText = "valide";
        messagePassword.style.color = "green";
    }

    let button = document.getElementById("connexion-button");
    if(valid)
    {
        button.disabled=false;
    }
    else
    {
        button.disabled=true;
    }

    return valid;
}

function validerInscription(){
    const username = document.forms["formInscription"]["username"].value;
    const password = document.forms["formInscription"]["password"].value;
    const email = document.forms["formInscription"]["email"].value;
    let valid = true;
    let messageUsername = document.getElementById("inscription-username-message");
    let messagePassword = document.getElementById("inscription-password-message");
    let messageEmail = document.getElementById("inscription-email-message");

    if (username === "") {
        messageUsername.innerText = "Nom d'utilisateur requis.";
        messageUsername.style.color = "red";
        valid = false;
    }
    else{
        messageUsername.innerText = "valide";
        messageUsername.style.color = "green";
    }

    if (!validerPassword(password).valid) {
        messagePassword.innerHTML = validerPassword(password).message;
        messagePassword.style.color = "red";
        valid = false;
    }
    else
    {
        messagePassword.innerText = "valide";
        messagePassword.style.color = "green";
    }

    if (!validerMail(email)) {
        messageEmail.innerText = "Email invalide. ";
        messageEmail.style.color = "red";
        valid = false;
    }
    else
    {
        messageEmail.innerText = "valide";
        messageEmail.style.color = "green";
    }

    
    let button = document.getElementById("inscription-button");
    if(valid)
    {
        button.disabled=false;
    }
    else
    {
        button.disabled=true;
    }

    return valid;
}


function validerMail(email) {
    if (email === "") {
        return false;
    }
    const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return res.test(String(email).toLowerCase());
}

function validerPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let valid = true;
    let message = "Le mot de passe doit contenir au moins :<ul>";

    if (password.length < minLength) {
        message += `<li>${minLength} caractères.</li>`;
        valid = false;
    }
    if (!hasUpperCase) {
        message += "<li>une lettre majuscule.</li>";
        valid = false;
    }
    if (!hasLowerCase) {
        message += "<li>une lettre minuscule.</li>";
        valid = false;
    }
    if (!hasDigit) {
        message += "<li>un chiffre.</li>";
        valid = false;
    }
    if (!hasSpecialChar) {
        message += "<li>un caractère spécial.</li>";
        valid = false;
    }
    message += "</ul>";

    return { valid, message };
}



function inscription()
{
    console.log("Inscription");
    const username = document.getElementById("usernameInscription").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwordInscription").value;
    
    const user = {username, email, password, score: 0};

    console.log("Nom d'utilisateur :", username);
    console.log("Email :", email);
    console.log("Mot de passe :", password);

    // Retrieve existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Utilisateurs existants :", users);

    // Check if username or email already exists
    const usernameExists = users.some(u => u.username === username);
    const emailExists = users.some(u => u.email === email);

    if (usernameExists) {
        alert("Nom d'utilisateur déjà pris.");
        return false;
    }

    if (emailExists) {
        alert("Adresse email déjà utilisée.");
        return false;
    }

    // Add new user to the users array
    users.push(user);

    // Store updated users array in local storage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Inscription réussie !");
    return true;

}

function connexion()
{
    console.log("Connexion");
    const username = document.getElementById("usernameConnexion").value;
    const password = document.getElementById("passwordConnexion").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        setCookie("username", username, 7); // Stocke l'utilisateur pour 7 jours
        alert("Connexion réussie !");
        return true;
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
        return false;
    }
}