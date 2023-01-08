
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

let userText = document.querySelector('.userText'); 

//? logic for opening the navMenu: 
let openNavMenu = document.querySelector('#openNavMenu'); 
let navMenu = document.querySelector('.navMenu'); 
let accountText = document.querySelector('.accountText'); 
let closeNavMenu = document.querySelector('#closeNavMenu'); 

openNavMenu.addEventListener('click', () => {
    auth.onAuthStateChanged((cred) => {
        let uid = cred.uid
        //? get users name
        let dbRef = ref(db); 
        get(child(dbRef, `users/${uid}/`))
        .then((username) => {
            accountText.textContent = username.val().email; 
        })
    })
    navMenu.style.display = 'flex'; 
})
closeNavMenu.addEventListener('click', () => {
    navMenu.style.display = 'none'; 
})

//? logic for logging out: 
let logoutBtn = document.querySelector('.logoutBtn'); 
logoutBtn.addEventListener('click', () => {
    auth.signOut(); 
})

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
            location.href = './collections.html'
        }
        else {
            alert('Your Session Has Expired Or You Have Logged Out. Log Back In To Continue'); 
            window.location.href = './login.html'; 
        }
    })
})

auth.onAuthStateChanged((cred) => {
    if (cred) {
        let uid = cred.uid; 
        let dbRef = ref(db, 'users/' + uid)
        get(dbRef)
        .then((user_name) => {
            userText.textContent = user_name.val().name; 
        })
    }
})