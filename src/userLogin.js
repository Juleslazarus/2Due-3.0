
import { initializeApp } from "firebase/app";
import { getDatabase, set, get, ref, remove, update, child } from 'firebase/database'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; 


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

let loginBtn = document.querySelector('.loginBtn'); 
let loginEInput = document.querySelector('.loginEInput')
let loginPInput = document.querySelector('.loginPInput')
let errorText = document.querySelector('.errorText'); 


loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    let email = loginEInput.value; 
    let password = loginPInput.value; 
    auth.signInWithEmailAndPassword(auth, email, password)
    .then(() => {
       errorText.textContent = ''; 
    })
    .catch((err) => {
        console.log(err.message); 
        errorText.textContent = err.message; 
    })
})

auth.onAuthStateChanged((cred) => {
    if (cred) {
        location.href = '../pages/app.html'
    }
})
