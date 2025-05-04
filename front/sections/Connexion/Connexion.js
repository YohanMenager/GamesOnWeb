export function afficherConnexion() {
    let connexion = document.getElementById('connexion');
    if (!connexion.classList.contains('active')) {
        connexion.classList.add('active');
        document.getElementById('login-header').classList.add('active');
        document.getElementById('inscription').classList.remove('active');
        document.getElementById('signup-header').classList.remove('active');
        document.querySelector('.barre').style.left = '0';
    }
}

export function afficherInscription() {
    let inscription = document.getElementById('inscription');
    if (!inscription.classList.contains('active')) {
        document.getElementById('connexion').classList.remove('active');
        document.getElementById('signup-header').classList.add('active');
        inscription.classList.add('active');
        document.getElementById('login-header').classList.remove('active');
        document.querySelector('.barre').style.left = '50%';
    }
}

export function validerConnexion() {
    const username = document.forms["formConnexion"]["username"].value;
    const password = document.forms["formConnexion"]["password"].value;
    let valid = true;
    let messageUsername = document.getElementById("connexion-username-message");
    let messagePassword = document.getElementById("connexion-password-message");

    if (username === "") {
        messageUsername.innerText = "Nom d'utilisateur requis.";
        messageUsername.style.color = "red";
        valid = false;
    } else {
        messageUsername.innerText = "valide";
        messageUsername.style.color = "green";
    }

    if (password === "") {
        messagePassword.innerText = "Mot de passe requis.";
        messagePassword.style.color = "red";
        valid = false;
    } else {
        messagePassword.innerText = "valide";
        messagePassword.style.color = "green";
    }

    document.getElementById("connexion-button").disabled = !valid;
    return valid;
}

export function validerInscription() {
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
    } else {
        messageUsername.innerText = "valide";
        messageUsername.style.color = "green";
    }

    const passwordValidation = validerPassword(password);
    if (!passwordValidation.valid) {
        messagePassword.innerHTML = passwordValidation.message;
        messagePassword.style.color = "red";
        valid = false;
    } else {
        messagePassword.innerText = "valide";
        messagePassword.style.color = "green";
    }

    if (!validerMail(email)) {
        messageEmail.innerText = "Email invalide.";
        messageEmail.style.color = "red";
        valid = false;
    } else {
        messageEmail.innerText = "valide";
        messageEmail.style.color = "green";
    }

    document.getElementById("inscription-button").disabled = !valid;
    return valid;
}

export function validerMail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export function validerPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let valid = true;
    let message = "Le mot de passe doit contenir au moins :<ul>";

    if (password.length < minLength) { message += `<li>${minLength} caractères.</li>`; valid = false; }
    if (!hasUpperCase) { message += "<li>une lettre majuscule.</li>"; valid = false; }
    if (!hasLowerCase) { message += "<li>une lettre minuscule.</li>"; valid = false; }
    if (!hasDigit) { message += "<li>un chiffre.</li>"; valid = false; }
    if (!hasSpecialChar) { message += "<li>un caractère spécial.</li>"; valid = false; }

    message += "</ul>";
    return { valid, message };
}

export function inscription() {
    const username = document.getElementById("usernameInscription").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwordInscription").value;
    hashPassword(password).then(hashedPassword => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({
            username: username,
            email: email,
            password: hashedPassword,
            score: 0,
            points: {
                1: { 1: 0, 2: 0, 3: 0 },
                2: { 1: 0, 2: 0, 3: 0 },
                3: { 1: 0, 2: 0, 3: 0 }
            }
        });
        localStorage.setItem("users", JSON.stringify(users));
        setCookie("username", username, 7);
        alert("Inscription réussie !");
        loadSection("Accueil");
    });
}

export function connexion() {
    const username = document.getElementById("usernameConnexion").value;
    const password = document.getElementById("passwordConnexion").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username);

    if (!user) {
        alert("Utilisateur non trouvé.");
        return false;
    }

    return hashPassword(password).then(hashed => {
        if (hashed === user.password) {
            setCookie("username", username, 7);
            alert("Connexion réussie !");
            loadSection("Accueil");
            return true;
        } else {
            alert("Mot de passe incorrect.");
            return false;
        }
    });
}

function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

export function init() {
    document.getElementById("login-header")?.addEventListener("click", afficherConnexion);
    document.getElementById("signup-header")?.addEventListener("click", afficherInscription);
    document.getElementById("connexion-button")?.addEventListener("click", connexion);
    document.getElementById("inscription-button")?.addEventListener("click", inscription);
    afficherConnexion();
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}