
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
    createColMenu.style.display = 'flex'; 
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
                            if (removePrompt === 'yes'){
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
                    if (todoText == '') {
                        alert('You Must Use The Input Field To Write Your 2due!')
                    } 
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
                    if (todoText === '') {
                        alert('You Must Use The Input Field To Write Your 2due!')
                    } else {
                        todoListInput.value === ''; //? sets the input to empty
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
                    }

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


//! //! //! //!==========================================================================================================

//? logic for creating and joining online collections:

//* choices menu dom elements: 
let choiceMenu = document.querySelector('.choiceMenu'); 
let createIcon = document.querySelector('#createIcon'); 
let joinIcon = document.querySelector('#joinIcon'); 
let closeChoices = document.querySelector('#closeChoices');

//* open the choices menu: 
let addSharedBtn = document.querySelector('.addSharedBtn')

//* create shared collection dom elements: 
let createSharedCol = document.querySelector('.createSharedCol'); 
let closeCSharedMenu = document.querySelector('#closeCreateMenu'); 
let createColName = document.querySelector('.createColName'); 
let createKeyInput = document.querySelector('.createKeyInput'); 
let createSharedBtn = document.querySelector('.createSharedBtn'); 
let sharedColCont = document.querySelector('.sharedColCont'); 

//* join shared collection dom elements: 
let joinSharedCol = document.querySelector('.joinSharedCol'); 
let closeJoinMenu = document.querySelector('#closeJoinMenu'); 
let joinColName = document.querySelector('.joinColName'); 
let joinKeyInput = document.querySelector('.joinKeyInput'); 
let joinSharedBtn = document.querySelector('.joinSharedBtn'); 
//?==== first we'll do the logic for creating a shared collection: ===============================
addSharedBtn.addEventListener('click', () => {
    choiceMenu.style.display = 'flex'; //! opens the choice menu
})
closeChoices.addEventListener('click', () => {
    choiceMenu.style.display = 'none'; //! closes the choice menu
})

createIcon.addEventListener('click', () => {
    createSharedCol.style.display = 'flex'
    choiceMenu.style.display = 'none'; 
    createColName.select(); 
})
closeCSharedMenu.addEventListener('click', () => {
    createSharedCol.style.display = 'none';
})
//* create the shared collection: ----------------------------
closeTodoList.addEventListener('click', () => {
    todoList.style.display = 'none'; 
    location.reload(); 
})
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    createSharedBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        let shareKey = createKeyInput.value; 
        let colLabel = createColName.value; 
        if (shareKey == '' && colLabel == '' ) {
            alert('You Cannot Create A Public Collection Without A Share Key Or Collection Name!')
        } else {
            //? for this collections logic ill only do the db creation
            //? and then ill have the page refresh and load it to the screen 
            //? with a get() function so i only have to make one logic tree 
            //? as opposed to one for live creation and db getting like 
            //? above with the private collections
            set(ref(db, `public_collections/${shareKey}/${colLabel}/`), {
                colLabel
            }),
            set(ref(db,`users/${uid}/public_collections_keys/${colLabel}/`), { 
                shareKey
            })
            .catch((err) => {
                console.log(err.message); 
            })
            //? this creates a copy of the key to the users db
            //? for access later
            location.reload(); 
        }
    })
})
//* get() from db to display and then the rest of the logic will 
//* sit here!: 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}/public_collections_keys/`)) //! 1
    .then((public_key_item) => {
        public_key_item.forEach((publicKeyNode) => { //! 2
            let key = publicKeyNode.val().shareKey; 
            let dbRef = ref(db); 
            get(child(dbRef, `public_collections/${key}/`))
            .then((public_collection_item) => { //! 3
                public_collection_item.forEach((publicCollectionNode) => {
                    
                    let sharedCollection = document.createElement('h1'); 
                    sharedCollection.classList.add('sharedCollection'); 
                    sharedCollection.textContent = publicCollectionNode.val().colLabel; 
                    if (sharedCollection == '') {
                        console.log('sharedCol not created');
                    }
                    else { 
                        sharedColCont.appendChild(sharedCollection); 
                        //? this is kind of complex but it works. grabs the key from the user @ 1
                        //? 2 sets each key as a variable and uses that variable to call the public collection
                        //? db item with that key
                        //? 3 grabs each collection from the public folder using their respective keys
                        sharedCollection.addEventListener('click', (e) => {
                            console.log(e.target.innerText); 
                            if (e.target.innerText == '')
                            {
                                sharedColCont.removeChild(sharedCollection)
                            }
                            else {
    
                                auth.onAuthStateChanged((cred) => { //! this will allow me to use get() to get all todos on todolist load 
                                    let uid = cred.uid;  
                                    let colLabel = e.target.innerText;
                                    let todoItem = todoListInput.value;  
                                    let dbRef = ref(db)
                                    todoList.style.display = 'inline-block'; 
                                    todoListTitle.textContent = `${colLabel}`;
                                    //? removes shared Col
                                    removeCol.addEventListener('click', () => {
                                        auth.onAuthStateChanged((cred) => {
                                            let uid = cred.uid
                                            get(child(dbRef, `users/${uid}/public_collections_keys/${colLabel}/`))
                                            .then((shareKey_item) => {
                                                let shareKey = shareKey_item.val().shareKey; 
                                                let removeSharedPrompt = prompt("Are You Sure You'd Like To Remove This Shared Collection?").toLowerCase
                                                if ( removeSharedPrompt = 'yes'){
                                                    remove(ref(db, `public_collections/${shareKey}`))
                                                    remove(ref(db, `users/${uid}/public_collections_keys/${colLabel}`))
                                                    closeTodoList.click();
                                                    console.log('db deleted'); 
                                                } 
                                            })
                                        })
                                    })

                                    //? get all the todos from the database 
                                    get(child(dbRef, `users/${uid}/public_collections_keys/${colLabel}/`))
                                    .then((shareKey_item) => {
                                        let todoListTitle = document.querySelector('.todoListTitle'); 
                                        let shareKey = shareKey_item.val().shareKey; 
                                        let shareKeyTitle = document.createElement('p'); 
                                        shareKeyTitle.classList.add('shareKeyTitle'); 
                                        shareKeyTitle.textContent = `Share Key: ${shareKey_item.val().shareKey}`
                                        todoListTitle.appendChild(shareKeyTitle); 
                                        
                                    })
                                    addTodoItem.addEventListener('click', () => {
                                        if (todoItem = '') { //? makes sure that the todo isnt empty. if you remove an empty todo it'll delete all todos
                                            alert('You Must Use The Input Field To Write Your 2due!')
                                        } else {
                                            get(child(dbRef, `users/${uid}/public_collections_keys/${colLabel}`))
                                            .then((shareKey_item) => {
                                                let todoItem = todoListInput.value; 
                                                let shareKey = shareKey_item.val().shareKey; 
                                                    set(ref(db, `public_collections/${shareKey}/todos/${todoItem}`), {
                                                        todoItem
                                                    })
                                                    .then(() => { //? creates todos
                                                        let todoItemCont = document.querySelector('.todoItemCont'); 
                                                        let todo = document.createElement('h1'); 
                                                        todo.classList.add('todo'); 
                                                        todo.textContent = todoItem; 
                                                        todoItemCont.appendChild(todo); 
                                                        todoListInput.value = ''; 
                                                        todo.addEventListener('click', (e) => { //? removes todos
                                                            let removeTodo = e.target.innerText; 
                                                            remove(ref(db, `users/${uid}/public_collections_keys/${colLabel}/${removeTodo}`))
                                                            remove(ref(db, `public_collections/${shareKey}/todos/${removeTodo}`))
                                                            todoItemCont.removeChild(todo);                                                 })
                                                            
                                                    })
                                                    
                                            })
                                        }
                                    })
                                })
                            }
                        })
                        
                    }

                })
            })
        })
    })
})
//? this concludes creating shared collections now we'll add joining the collections
//* this is for opening and closing the choice menu and join menu
joinIcon.addEventListener('click', () => {
    joinSharedCol.style.display = 'flex'; 
    choiceMenu.style.display = 'none'; 
    joinColName.select(); 
})
closeJoinMenu.addEventListener('click', () => {
    joinSharedCol.style.display = 'none'; 
})
//* this will set the join key 
joinSharedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let shareKey = joinKeyInput.value; 
    let colLabel = joinColName.value; 
    let dbRef = ref(db);
    auth.onAuthStateChanged((cred) => {
        let uid = cred.uid; 
        set(ref(db, `users/${uid}/public_collections_keys/join_keys/${colLabel}/` + shareKey), {
            shareKey
        })
        .then(() => {
            location.reload() //? this reloads the page so we can get the joined collection on page load and only have one path. 
        })
    })
})
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    joinSharedBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        let shareKey = joinKeyInput.value; 
        let colLabel = joinColName.value;  
        if (shareKey == '' && colLabel == '' ) {
            alert('You Cannot Join A Public Collection Without A Share Key or Collection Name!')
        } else {
            //? for this collections logic ill only do the db creation
            //? and then ill have the page refresh and load it to the screen 
            //? with a get() function so i only have to make one logic tree 
            //? as opposed to one for live creation and db getting like 
            //? above with the private collections
            set(ref(db,`users/${uid}/public_collections_keys/join_keys/${colLabel}/`), { 
                shareKey
            })
            .catch((err) => {
                console.log(err.message); 
            })
            //? this creates a copy of the key to the users db
            //? for access later
            location.reload(); 
        }
    })
})
//* get the shared collections: 
auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}/public_collection_keys/join_keys/`))
    .then((joinKey_item) => {
        joinKey_item.forEach((joinKey) => {
            let shareKey = joinKey.val().shareKey; //? used for grabbing the collection they joined from db/public_collections
            get(child(dbRef, `public_collections/${shareKey}/`))
            .then((publicCollection_item) => {
                publicCollection_item.forEach((publicCollectionNode) => {
                    let sharedColCont = document.querySelector('.sharedColCont'); 
                    sharedCollection = document.createElement('h1'); 
                    sharedCollection.classList.add('sharedCollection'); 
                    sharedCollection.textContent = publicCollectionNode.val().colLabel; 
                    sharedColCont.appendChild(sharedCollection)

                })
            })

        })
    })
})

//! //! //! //!============================================================================