import { auth } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Alternar para a tela de cadastro
document.getElementById('auth-toggle').addEventListener('click', () => {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
});

// Alternar para a tela de login
document.getElementById('signup-toggle').addEventListener('click', () => {
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
});

// Cadastro
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (password.length < 6) {
        document.getElementById('message-signup').innerText = 'Mínimo 6 caracteres.';
        document.getElementById('message-signup').style.display = 'block';
        return;
    } else {
        document.getElementById('message-signup').style.display = 'none';
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'game.html';
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                document.getElementById('message-signup').innerText = 'Este e-mail já está em uso.';
            } else {
                document.getElementById('message-signup').innerText = 'Erro no cadastro. Tente novamente.';
            }
            document.getElementById('message-signup').style.display = 'block';
        });
});

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Login realizado com sucesso!');
            window.location.href = 'game.html';
        })
        .catch(() => {
            document.getElementById('message').innerText = 'E-mail ou senha incorretos(as).';
            document.getElementById('message').style.display = 'block';
        });
});

// Traduções

async function loadLanguage(lang) {
    const response = await fetch(`./locales/${lang}.json`);
    const translations = await response.json();
    applyTranslations(translations);
}

function applyTranslations(translations) {
    document.querySelector('h2').innerText = translations['login_title'];
    document.getElementById('login-email').placeholder = translations['email_placeholder'];
    document.getElementById('login-password').placeholder = translations['password_placeholder'];
    document.querySelector('#login-form button').innerText = translations['login_button'];
    document.querySelector('#auth-toggle p').innerHTML = translations['signup_message'];
    document.querySelector('#signup-container h2').innerText = translations['signup_title'];
    document.getElementById('signup-email').placeholder = translations['email_placeholder'];
    document.getElementById('signup-password').placeholder = translations['password_placeholder'];
    document.querySelector('#signup-form button').innerText = translations['signup_button'];
    document.querySelector('#signup-toggle p').innerHTML = translations['already_have_account'];
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    loadLanguage(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    document.getElementById('language-selector').value = savedLang;
    loadLanguage(savedLang);
});

document.getElementById('language-selector').addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
});

const languageSelector = document.getElementById('language-selector');
languageSelector.addEventListener('change', (event) => {
    localStorage.setItem('language', event.target.value);
});

window.onload = () => {
    const storedLanguage = localStorage.getItem('language') || 'en';
    languageSelector.value = storedLanguage; 
};