
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, query, onValue , set, get, ref, remove, update, child, limitToLast, limitToFirst, orderByChild } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 
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

//? get user credentials 
auth.onAuthStateChanged((cred) => {
    if (!cred) {
        alert('Your Session Has Expired Or You Have Logged Out. Log Back In To Continue.')
        location.href = './login.html'
    }
})

//? user menu logic: 
let userBtn = document.querySelector('.userBtn'); 
let userMenu = document.querySelector('.userMenu'); 
let emailText = document.querySelector('.emailText'); 
let nameText = document.querySelector('.nameText'); 
let logOutBtn = document.querySelector('.logOutBtn'); 
let closeUserMenu = document.querySelector('.closeUserMenu'); 


//? add todos: 
let addTodo = document.querySelector('.addTodo'); 

userBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    userMenu.style.display = 'flex'; 
    auth.onAuthStateChanged((cred) => {
        let uid = cred.uid; 
        let dbRef = ref(db); 
        get(child(dbRef, `users/${uid}/`))
        .then((userNode) => {
            emailText.textContent = `Email: ${userNode.val().email}`
            nameText.textContent = `Name: ${userNode.val().name}`
        })
    })
})
closeUserMenu.addEventListener('click', (e) => {
    e.preventDefault(); 
    userMenu.style.display = 'none'; 
})


//? setting welcome text: 
let welcomeText = document.querySelector('.welcomeText'); 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}/`))
    .then((userNode) => {
        welcomeText.textContent = `Welcome: ${userNode.val().name}`
    })
})

// auth.onAuthStateChanged((cred) => {
//     let uid = cred.uid; 
//     const dbRef = ref(db, `users/${uid}/quickTodos/`)
//     onValue(dbRef, (snapshot) => {
//         let todoArr = []; 
//         snapshot.forEach(todo => {
//             todoArr.push({...todo.val().todoText})
//         })
//         setTodos(todosArr); 
//     })
// } )


// ? get quickTodos:
// auth.onAuthStateChanged((cred) => {
//     let uid = cred.uid; 
//     let dbRef = ref(db); 
//     get(child(dbRef, `users/${uid}/quickTodos/`))
//     .then((todo_item) => {
//         todo_item.forEach((todoNode) => {
//             let todoCont = document.querySelector('.todoCont'); 
//             let quickTodoInput = document.querySelector('.quickTodoInput'); 
//             let todo = document.createElement('h1'); 
//             todo.classList.add('todo'); 
//             todo.textContent = todoNode.val().todoText; 
//             todoCont.appendChild(todo); 
//             quickTodoInput.value = ''; 
//             todo.addEventListener('click', (e) => {
//                 e.preventDefault(); 
//                 let removeTodo = e.target.textContent; 
//                 remove(ref(db, `users/${uid}/quickTodos/${removeTodo}`))
//                 todoCont.removeChild(todo); 
//                 console.log(removeTodo); 
//             })
//         })
//     })
// })

auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}/quickTodos/`) )
    .then((todoItems) => {
        let todoCont = document.querySelector('.todoCont'); 
        todoCont.innerHTML = ''; 
        todoItems.forEach((todoNode) => {
            let todo = document.createElement('h1'); 
            todo.classList.add('todo'); 
            todo.textContent = todoNode.val().todoText; 
            todoCont.appendChild(todo); 
        })
    })
})

auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    addTodo.addEventListener('click', (e) => {
        e.preventDefault(); 
        let quickTodoInput = document.querySelector('.quickTodoInput'); 
        let todoText = quickTodoInput.value; 
        set(ref(db, `users/${uid}/quickTodos/${todoText}/`), {
            todoText: todoText, 
            created_at: Date()
        })
        .then(() => {//? append them to the dom
            let todoCont = document.querySelector('.todoCont'); 
            let todo = document.createElement('h1'); 
            todo.classList.add('todo'); 
            todo.textContent = todoText; 
            todoCont.appendChild(todo); 
            quickTodoInput.value = ''; 
            //!
            //? next is the remove todo ability: 
            todo.addEventListener('click', (e) => {
                e.preventDefault(); 
                let removeTodo = e.target.textContent; 
                remove(ref(db, `users/${uid}/quickTodos/${removeTodo}`))
                todoCont.removeChild(todo); 
                console.log(removeTodo); 
            })

        })
    })
})

//? realtime listener that can work for public collections or a messaging app


//? check if user is signed in: 

