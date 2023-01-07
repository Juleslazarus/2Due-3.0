
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
                console.log(colToDisplay)
                let todoList = document.createElement('div'); 
                todoList.classList.add('todoList')
                let todoHeader = document.createElement('div'); 
                todoHeader.classList.add('todoHeader'); 
                let todoListTitle = document.createElement('h1'); 
                todoListTitle.classList.add('todoListTitle'); 
                todoListTitle.textContent = colToDisplay; 
                let closeTodoList = document.createElement('button'); 
                closeTodoList.classList.add('closeTodoList'); 
                closeTodoList.textContent = 'X'; 
                todoHeader.appendChild(todoListTitle); 
                todoHeader.appendChild(closeTodoList); 
                todoList.appendChild(todoHeader); 
                body.appendChild(todoList); 

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
            let collection = document.createElement('h1'); 
            collection.classList.add('collection'); 
            collection.textContent = colLabelInput.value 
            collectionsCont.appendChild(collection); 
            collection.addEventListener('click', (e) => {
                let colToDisplay = e.target.innerText; 
                console.log(colToDisplay)
                let todoList = document.createElement('div'); 
                todoList.classList.add('todoList')
                let todoHeader = document.createElement('div'); 
                todoHeader.classList.add('todoHeader'); 
                let todoListTitle = document.createElement('h1'); 
                todoListTitle.classList.add('todoListTitle'); 
                todoListTitle.textContent = colToDisplay; 
                let closeTodoList = document.createElement('button'); 
                closeTodoList.classList.add('closeTodoList'); 
                closeTodoList.textContent = 'X'; 
                todoHeader.appendChild(todoListTitle); 
                todoHeader.appendChild(closeTodoList); 
                todoList.appendChild(todoHeader); 
                body.appendChild(todoList); 

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