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
const db = getDatabase(app); 
const auth = getAuth(app); 

//! index.html: 

let getStartedBtn = document.querySelector('.getStartedBtn'); 

getStartedBtn.addEventListener('click', () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            location.href = 'user.html'; 
        } else {
            location.href = 'register.html'
        }
    })
})

//! register.html: 
//? these are the input elements we'll need for user auth: 
let regFNInput = document.querySelector('.regFNInput'); //? reg=register FN=first-name
let regEinput = document.querySelector('.regEinput'); 
let regPassInput = document.querySelector('.regPassInput'); 

//? this is the register btn for register.html: 
let regBtn = document.querySelector('.regBtn'); 
