//! firebase config section: 

import { initializeApp } from "firebase/app";
import { getDatabase, set, get, ref, remove, update, child } from 'firebase/database'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; 


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

//? these are the input elements we'll need for user auth: 
let regFNInput = document.querySelector('.regFNInput'); //? reg=register FN=first-name
let regEInput = document.querySelector('.regEInput'); 
let regPassInput = document.querySelector('.regPassInput'); 

//? this is the register btn for register.html: 
let signUpBtn = document.querySelector('.signUpBtn'); 
let signup = document.getElementById('signup'); 

//? dom element to display errors: 
let errorText = document.querySelector('.errorText'); 

function registerNewUser(event) {
    event.preventDefault(); 
    let name = regFNInput.value; 
    let email = regEInput.value; 
    let password = regPassInput.value; 
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log(cred)
        set(ref(db, 'users/' + cred.user.uid), {
            name: regFNInput.value, 
            email: regEInput.value
        })
        errorText.textContent = ''; 
    })
    .catch((err) => {
        errorText.textContent = err.message; 
    })
}

signup.addEventListener('click', registerNewUser); 