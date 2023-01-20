import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, set, ref, child, remove, update } from 'firebase/database'; 


const firebaseConfig = {
    apiKey: "AIzaSyBc17m-T1aKiVrICgvHVBwmuSzxABtMQp8",
    authDomain: "enigma-messanger.firebaseapp.com",
    databaseURL: "https://enigma-messanger-default-rtdb.firebaseio.com",
    projectId: "enigma-messanger",
    storageBucket: "enigma-messanger.appspot.com",
    messagingSenderId: "561835252925",
    appId: "1:561835252925:web:4dcea79b0835be270e2bd4",
    measurementId: "G-GXDLVPBTRK"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 
export const auth = getAuth(app); 