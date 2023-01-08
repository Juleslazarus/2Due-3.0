
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

let returnPage = document.querySelector('#returnPage'); 
let addColBtn = document.querySelector('.addColBtn'); 
let closeColMenu = document.querySelector('.closeColMenu')
let createColMenu = document.querySelector('.createColMenu'); 
let createColBtn = document.querySelector('.createColBtn'); 
let colLabelInput = document.querySelector('.colLabelInput'); 
let colLabel = colLabelInput.value; 


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
//? database listener 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db);
    get(child(dbRef, `users/${uid}/collections`))
    .then((collection_item) => {
        collection_item.forEach((collectionNode) => {
            let colArr = []; 
            colArr.push(collectionNode.val().colLabel) //? sets the response from the data base to an array for each node
            let collection = document.createElement('h1'); 
            collection.classList.add('collection'); 
            collection.textContent = colArr[0]; //? creates DOM element using the db response from above
            collectionsCont.appendChild(collection)
            // console.log(colArr[0]);
            collection.addEventListener('click', (e) => {
                let colToDisplay = e.target.innerText; 
                todoList.style.display = 'inline-block';
                todoListTitle.textContent = colToDisplay; 

                get(child(dbRef, `users/${uid}/collections/${colToDisplay}/todos/`))
                .then((todo_item) => {
                    todo_item.forEach((todoNode) => {
                        let todoItemCont = document.querySelector('.todoItemCont')
                        console.log(todoNode.val().todoItem); 
                        let getTodoItem = document.createElement('h1'); 
                        getTodoItem.classList.add('todo'); 
                        getTodoItem.textContent = todoNode.val().todoItem; 
                        todoItemCont.appendChild(getTodoItem); 
                        getTodoItem.addEventListener('click', (e) => {
                            let removeTodoItem = e.target.innerText; 
                            remove(ref(db, `users/${uid}/collections/${colToDisplay}/todos/${removeTodoItem}/   `))
                            todoItemCont.removeChild(getTodoItem); 
                        })
                    })
                })

                addTodoItem.addEventListener('click', () => {
                    let todoListInput = document.querySelector('.todoListInput')
                    let todoItem = todoListInput.value;
                    console.log(todoItem); 
                    set(ref(db, `users/${uid}/collections/${colToDisplay}/todos/` + todoItem), {
                        todoItem
                    })
                    .then(() => {
                        let todoItemCont = document.querySelector('.todoItemCont'); 
                        let todoListInput = document.querySelector('.todoListInput'); 
                        let todo = document.createElement('h1'); 
                        todo.classList.add('todo'); 
                        todo.textContent = todoListInput.value; 
                        todoItemCont.appendChild(todo); 
                        todoListInput.value = ''; 
                        todo.addEventListener('click', (e) => {
                            console.log(e.target.innerText); 
                            let removeTodo = e.target.innerText; 
                            remove(ref(db, `users/${uid}/collections/todos/todoItem/${removeTodo}`))
                            todoItemCont.removeChild(todo); 
                            
                        })
                    })
                })
                    
                //? closeTodoListBtn
                closeTodoList.addEventListener('click', () => {
                    todoList.style.display = 'none'; 
                })
            })
            })
        })
        .catch((err) => {
            errorText.textContent = err.message; 
        })
    })


returnPage.addEventListener('click', () => {
    auth.onAuthStateChanged((cred) => {
        if (cred) {
            location.href = './app.html'
        } else {
            alert('Your Session Has Expired Or You Have Logged Out. Log Back In To Continue'); 
            location.href = './login.html'; 
        }
    })
})

//? display users name as hero Text
let userText = document.querySelector('.userText'); 

auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db, 'users/' + uid) 
    get(dbRef)
    .then((user_name) => {
        userText.textContent = user_name.val().name + "'s" + " Collections"; 
    })
})

//? these buttons open and close the menu that creates collections
addColBtn.addEventListener('click', openCreateMenu)
closeColMenu.addEventListener('click', closeCreateMenu)

//? the process that creates the collections and then displays them. this will also include the section that 
//? creates users ability to post to dos
createColBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.onAuthStateChanged((cred) => {
        let uid = cred.uid; 
        let colLabel = colLabelInput.value; 
        let refUserDB = ref(db, 'users/' + uid); 
        set(ref(db, `users/${uid}/collections/` + colLabel), {
            colLabel
        })
            //? this will be the label that displays on the collections.html page and it will hold the 
            //? the todos that are relevant to the collection ie school: do homework. 
        .then(() => {
            todoList.style.display = 'inline-block'; 
                //? closeTodoListBtn
                closeTodoList.addEventListener('click', () => {
                    todoList.style.display = 'none'; 
                })
                0
            })
            closeColMenu.click();
        })
    })
})


let logoutBtn = document.querySelector('.logoutBtn'); 

logoutBtn.addEventListener('click', () => {
    auth.signOut() 
    .then(() => {
    })  
})

