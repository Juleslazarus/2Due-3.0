

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, get, ref, remove, update, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"; 


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
//? this will check if the user is already logged in to avoid the need to go through various pages 
//? to access the app 
auth.onAuthStateChanged((cred) => {
    if (cred) {
        location.href = './app.html'; 
    }
})


//? dom elements needed for user registration: 
let regFNInput = document.querySelector('.regFNInput')
let regEInput = document.querySelector('.regEInput'); 
let regPassInput = document.querySelector('.regPassInput'); 
let signUpBtn = document.querySelector('.signUpBtn'); 
//? this will display the error message: 
let errorText = document.querySelector('.errorText'); 

//? user sign up logic: 
signUpBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    let name = regFNInput.value; 
    let email = regEInput.value; 
    let password = regPassInput.value; 
    errorText.textContent = ''; 
    createUserWithEmailAndPassword(auth, email, password) 
    .then((cred) => {
        let uid = cred.user.uid; 
        console.log(uid)
        console.log(cred)
        set(ref(db, 'users/' + uid), {
            name: name, 
            email: email
        })
        .then(() => {
            auth.onAuthStateChanged((cred) => {
                if (cred) {
                    location.href = './app.html'
                }
})

        })
    })
    .catch((err) => {
        console.log(err.message); 
        errorText.textContent = err.message; 
    })
})

//? this will redirect you to the app if you're loged in already 
//? so you don't have to navigate from sign up to login to app 
