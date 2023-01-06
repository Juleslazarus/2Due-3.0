
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, get, ref, remove, update, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"; 


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


//! check if user is logged in to allow them on the page: 
auth.onAuthStateChanged((cred) => {
    if (!cred) {
        alert('Your Session Has Expired Or You Have Logged Out. Log Back In To Continue'); 
        window.location.href = './login.html'; 
    }
})


let goToDashBtn = document.querySelector('.goToDashBtn'); 

goToDashBtn.addEventListener('click', () => {
    auth.onAuthStateChanged((cred) => {
        if (cred) {
            location.href = './dashboard.html'
        }
        else {
            alert('Your Session Has Expired Or You Have Logged Out. Log Back In To Continue'); 
            window.location.href = './login.html'; 
        }
    })
})

let logoutBtn = document.querySelector('.logoutBtn'); 

logoutBtn.addEventListener('click', () => {
    auth.signOut() 
    .then(() => {
        alert('user signed out'); 
    })
})

