//! firebase config section: 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, get, ref, remove, update, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"; 


const firebaseConfig = {
    apiKey: "AIzaSyAuwKzRj04MEHVD-D7ATn_uOBQ3dXD70M0",
    authDomain: "due3-a3d07.firebaseapp.com",
    databaseURL: "https://due3-a3d07-default-rtdb.firebaseio.com",
    projectId: "due3-a3d07",
    storageBucket: "due3-a3d07.appspot.com",
    messagingSenderId: "544320759090",
    appId: "1:544320759090:web:e78f5838ed1ff45499632b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(); 
const auth = getAuth(); 

//? these are the inputs on login.html for user auth: 
let loginEInput = document.querySelector('.loginEInput'); 
let loginPInput = document.querySelector('.loginPInput'); 
//? errortext h1 element to display the auth error message: 
let errorText = document.querySelector('.errorText'); 
let loginBtn = document.querySelector('.loginBtn'); 

loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    let email = loginEInput.value; 
    let password = loginPInput.value; 
    
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        location.href = './app.html'; 
        errorText.textContent = ''; 
    })
    .catch((err) => {
        console.log(err.message); 
        errorText.textContent = err.message; 
    })
})

//? this will check to make sure the user isn't already signed 
//? in to make UX run smoother
onAuthStateChanged((cred) => {
    if (cred) {
        location.href = './app.html'
    }
})