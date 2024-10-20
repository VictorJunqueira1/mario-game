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