import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC0nD4P3Z9HX32MHoyCWBWBbBnNhssN4iA",
    authDomain: "mario-game-1dc66.firebaseapp.com",
    projectId: "mario-game-1dc66",
    storageBucket: "mario-game-1dc66.appspot.com",
    messagingSenderId: "646305183997",
    appId: "1:646305183997:web:03dfb13843a2da37572694"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };