
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
//? log users name to the screen 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db);
    get(child(dbRef, `users/${uid}/`))
    .then((user_item) => {
        userText.textContent = user_item.val().name; 
    })
})
//? logic for opening the navMenu: 
let openNavMenu = document.querySelector('#openNavMenu'); 
let navMenu = document.querySelector('.navMenu'); 
let accountText = document.querySelector('.accountText'); 
let closeNavMenu = document.querySelector('#closeNavMenu'); 

openNavMenu.addEventListener('click', () => {
    auth.onAuthStateChanged((cred) => {
        let uid = cred.uid
        //? get users email
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
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}`))
    .then((userName) => {
        console.log(userName.val().name); 
    })
})

//!
//? quick todo logic
//!
let todoItemCont = document.querySelector('.todoItemCont'); 
let quickTodoInput = document.querySelector('.quickTodoInput'); 
let addQuickTodo = document.querySelector('#addQuickTodo'); 
//? set todos: 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    addQuickTodo.addEventListener('click', (e) => {
        e.preventDefault(); 
        let todoText = quickTodoInput.value; 
        set(ref(db, `users/${uid}/quickTodos/${todoText}/`), {
            todoText
        })
        .then(() => {//? append them to the dom
            let todo = document.createElement('h1'); 
            todo.classList.add('todo'); 
            todo.textContent = todoText; 
            todoItemCont.appendChild(todo); 
            quickTodoInput.value = ''; 
            //!
            //? next is the remove todo ability: 
            todo.addEventListener('click', (e) => {
                let removeTodo = e.target.innerText; 
                remove(ref(db, `users/${uid}/quickTodos/${removeTodo}`))
                todoItemCont.removeChild(todo); 
            })

        })
    })
})

//!
//? this is to load the todos on page start 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}/quickTodos/`))
    .then((todo_item) => {
        todo_item.forEach((todoNode) => {
            let todo = document.createElement('h1'); 
            todo.classList.add('todo'); 
            todo.textContent = todoNode.val().todoText; 
            todoItemCont.appendChild(todo); 
            todo.addEventListener('click', (e) => {
                let removeTodo = e.target.innerText; 
                remove(ref(db, `users/${uid}/quickTodos/${removeTodo}`))
                todoItemCont.removeChild(todo); 
            })
        })
    })
})

//? use enter to submit 
quickTodoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('addQuickTodo').click(); 
    }
})

//? colCounter for user ease: 
let colCounter = document.querySelector('.colCounter'); 
let colCount = 0; 
//? get collections count for colCounter: 
let dbRef = ref(db); 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    get(child(dbRef, `users/${uid}/collections/`))
    .then((collection_item) => {
        collection_item.forEach((collectionNode) => {
            colCount += 1; 
            colCounter.style.display = 'inline-block'
            colCounter.textContent = colCount; 
        })
    })
})