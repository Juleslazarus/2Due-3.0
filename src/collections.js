
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, get, ref, remove, update, child, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 
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
//? listener to make sure user is still signed in: 
auth.onAuthStateChanged((cred) => {
    if (!cred) {
        alert('Your Session Has Expired Or You Have Logged Out Please Log Back In To Continue'); 
        location.href = './login.html'
    }
})

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

let returnPage = document.querySelector('#returnPage'); 
let addColBtn = document.querySelector('.addColBtn'); 
let closeColMenu = document.querySelector('.closeColMenu')
let createColMenu = document.querySelector('.createColMenu'); 
let createColBtn = document.querySelector('.createColBtn'); 
let colLabelInput = document.querySelector('.colLabelInput'); 
let colLabel = colLabelInput.value; 
let removeCol = document.querySelector('.removeCol'); 
//? logic for returning to app page: 
returnPage.addEventListener('click', () => {
    auth.onAuthStateChanged((cred) => {
        if(cred) {
            location.href = './app.html'; 
        } else {
            alert('Your session has expired or you have logged out. please log back in to continue.')
            location.href = './login.html'; 
        }
    })
})

//? functions to open and close create collection menu
function closeCreateMenu() {
    createColMenu.style.display = 'none'; 
}
function openCreateMenu() {
    createColMenu.style.display = 'inline-block'; 
    colLabelInput.select()
}
//? append all collections from database here: 
let collectionsCont = document.querySelector('.collectionsCont'); 

//? body element to append the collection todo 
let body = document.querySelector('body'); 

let todoList = document.querySelector('.todoList'); 
let todoHeader = document.querySelector('.todoHeader'); 
let todoListTitle = document.querySelector('.todoListTitle'); 
let closeTodoList = document.querySelector('.closeTodoList'); 
let todoInputCont = document.querySelector('todoInputCont'); 
let todoListInput = document.querySelector('.todoListInput'); 
let addTodoItem = document.querySelector('.addTodoItem'); 
let todoItemCont = document.querySelector('todoItemCont'); 

addColBtn.addEventListener('click', openCreateMenu); 
closeColMenu.addEventListener('click', closeCreateMenu); 

//!
//! function for creating collections to the database: 
//!
function createCollection() {
    auth.onAuthStateChanged((cred) => {
        colLabel = colLabelInput.value; 
        console.log(cred.uid); 
        let uid = cred.uid; 
        set(ref(db, `users/${uid}/collections/${colLabel}`), {
            colLabel
        })

        //!
        //? this then() will display the collections: 
        //!
        .then(() => {
            let collection = document.createElement('h1'); 
            collection.classList.add('collection'); 
            collection.textContent = colLabel; 
            collectionsCont.appendChild(collection); 

            //!
            //? next we need to add the logic for opening the collection: 
            //!
            collection.addEventListener('click', () => {
                todoList.style.display = 'inline-block'; //? displays the todo list designated to that collection 
                todoListTitle.textContent = colLabel;//? sets the title coherent with the collection title
                //? next is the logic that closes the todo list: 
                closeTodoList.addEventListener('click', () => {
                    todoList.style.display = 'none'; 
                    location.reload()
                })
                removeCol.addEventListener('click', () => {
                            let removePrompt = prompt("Are You Sure You'd Like To Remove This Collection?").tolowerCase
                            if (removePrompt == 'yes'){
                                console.log(removePrompt); 
                                remove(ref(db, `users/${uid}/collections/` + colLabel))
                                .then(() => {
                                    closeTodoList.click(); 
                                    location.reload()
                                })
                            }
                        })
                //? next is the logic to add todo items to the database: 
                addTodoItem.addEventListener('click', () => {
                    let todoItemCont = document.querySelector('.todoItemCont'); 
                    let todoText = todoListInput.value; 
                    todoListInput.value = ''; //? sets the input to empty
                    set(ref(db, `users/${uid}/collections/${colLabel}/todos/` + todoText), {
                        todoText
                    })
                    //? next is the logic for appending the todo items to the todo list container: 
                    let todo = document.createElement('h1'); 
                    todo.classList.add('todo'); 
                    todo.textContent = todoText; 
                    todoItemCont.appendChild(todo); 

                    //? next we have to add the logic for removing todo items. this has to stay nested inside this event listener 
                    //? where the todo scope is. 
                    todo.addEventListener('click', (e) => {
                        let removeTodo = e.target.innerText
                        remove(ref(db, `users/${uid}/collections/${colLabel}/todos/${removeTodo}`))
                        todoItemCont.removeChild(todo); 
                    })

                    //! this ends the needed functions of the app!
                })
            })

        })

    }) 
}

//!
//? this section will be for displaying the collections on page start:
//!
auth.onAuthStateChanged((cred) => {
    let dbRef = ref(db); 
    let uid = cred.uid; 
    get(child(dbRef, `users/${uid}/collections/`))
    .then((collections_item) => {
        collections_item.forEach((collectionNode) => {
            let collectionsCont = document.querySelector(".collectionsCont"); 
            let collection = document.createElement('h1'); 
            collection.classList.add('collection'); 
            collection.textContent = collectionNode.val().colLabel; 
            collectionsCont.appendChild(collection); 
            collection.addEventListener('click', (e) => {
                colLabel = e.target.innerText; 
                todoList.style.display = 'inline-block'; //? displays the todo list designated to that collection 
                todoListTitle.textContent = colLabel;//? sets the title coherent with the collection title
                //? next is the logic that closes the todo list: 
                closeTodoList.addEventListener('click', () => {
                    todoList.style.display = 'none'; 
                    location.reload(); 
                })
                //? this will retrieve the todo items from the db 
                get(child(dbRef, `users/${uid}/collections/${colLabel}/todos/`))
                    .then((todo_item) => {
                        todo_item.forEach((todoNode) => {
                            let todoItemCont = document.querySelector('.todoItemCont')
                            let todo = document.createElement('h1'); 
                            todo.classList.add('todo'); 
                            todo.textContent = todoNode.val().todoText; 
                            todoItemCont.appendChild(todo); //! //? this will append the todo to the screen
                            
                            //? next we need to add the ability to remove a todo: 
                            todo.addEventListener('click', (e) => {
                                let removeTodo = e.target.innerText
                                remove(ref(db, `users/${uid}/collections/${colLabel}/todos/${removeTodo}`))
                                todoItemCont.removeChild(todo); 
                    })
                        })
                        removeCol.addEventListener('click', () => {
                            let removePrompt = prompt("Are You Sure You'd Like To Remove This Collection?").tolowerCase
                            if (removePrompt = 'yes'){
                                console.log(removePrompt); 
                                remove(ref(db, `users/${uid}/collections/` + colLabel))
                                .then(() => {
                                    closeTodoList.click(); 
                                    location.reload()
                                })
                            }
                        })
                    } )

                
                //? next is the logic to add todo items to the database: 
                addTodoItem.addEventListener('click', () => {
                    let todoItemCont = document.querySelector('.todoItemCont'); 
                    let todoText = todoListInput.value; 
                    todoListInput.value = ''; //? sets the input to empty
                    set(ref(db, `users/${uid}/collections/${colLabel}/todos/` + todoText), {
                        todoText
                    })
                    //? next is the logic for appending the todo items to the todo list container: 
                    let todo = document.createElement('h1'); 
                    todo.classList.add('todo'); 
                    todo.textContent = todoText; 
                    todoItemCont.appendChild(todo); 

                    //? next we have to add the logic for removing todo items. this has to stay nested inside this event listener 
                    //? where the todo scope is. 
                    todo.addEventListener('click', (e) => {
                        let removeTodo = e.target.innerText
                        remove(ref(db, `users/${uid}/collections/${colLabel}/todos/${removeTodo}`))
                        todoItemCont.removeChild(todo); 
                    })

                    //! this ends the needed functions of the app!
                })
            })

        })
    })
    
    
})

createColBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    createCollection(); 
    closeColMenu.click(); 
}); 


