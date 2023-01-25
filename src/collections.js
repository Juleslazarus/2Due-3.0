
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
let colColorInput = document.querySelector('.colColorInput'); 
let colLabel = colLabelInput.value; 
let removeCol = document.querySelector('.removeCol'); 
let tealColSelect = document.querySelector('.tealCol'); 
let burgandyColSelect = document.querySelector('.burgandyCol'); 
let slateGrayColSelect = document.querySelector('.slateGrayCol'); 
let seaGreenColSelect = document.querySelector('.seaGreenCol'); 
let mauveColSelect = document.querySelector('.mauveCol'); 
let roseGoldColSelect = document.querySelector('.roseGoldCol'); 
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

//? logic for selecting the shared col style: 
let sharedColInput = document.querySelector('.sharedColInput'); 

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
let todoInput = document.querySelector('.todoInput'); 
let addTodoItem = document.querySelector('.addTodoItem'); 
let todoCont = document.querySelector('todoCont'); 

addColBtn.addEventListener('click', openCreateMenu); 
closeColMenu.addEventListener('click', closeCreateMenu); 

//  !function for setting collection to database: 


//? set collection: 
let colorPicked; 
tealColSelect.addEventListener('click', () => {
    colorPicked = 'tealCol'; 
    console.log(colorPicked)
    tealColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked
})
burgandyColSelect.addEventListener('click', () => {
    colorPicked = 'burgandyCol'; 
    burgandyColSelect.classList.remove('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})
slateGrayColSelect.addEventListener('click', () => {
    colorPicked = 'slateGrayCol'; 
    slateGrayColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})
seaGreenColSelect.addEventListener('click', () => {
    colorPicked = 'seaGreenCol'; 
    seaGreenColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked

})
mauveColSelect.addEventListener('click', () => {
    colorPicked = 'mauveCol'; 
    mauveColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})
roseGoldColSelect.addEventListener('click', () => {
    colorPicked = 'roseGoldCol'; 
    roseGoldColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})
if (!colorPicked) {
    colorPicked = 'defaultCol'
}
createColBtn.addEventListener('click',(e) => {
    e.preventDefault(); 

    auth.onAuthStateChanged(cred => {
        let dbRef = ref(db); 
        let uid = cred.uid; 
        let colLabelInput = document.querySelector('.colLabelInput'); 
        let colColorInput = document.querySelector('.colColorInput'); 
        let colColor = colColorInput.value; 
        let colLabel = colLabelInput.value; 
            set(ref(db, `users/${uid}/collections/${colLabel}/`), {
                colLabel: colLabel, 
                style: colColor
            })
            .then(() => {
                location.reload(); 
            })
        })
})

auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    
    get(child(dbRef, `users/${uid}/collections/`))
    .then((collection_item) => {
        collection_item.forEach((collectionNode) => {
            let collection = document.createElement('h1'); 
            collection.classList.add(`${collectionNode.val().style}`)
            collection.textContent = collectionNode.val().colLabel; 
            collectionsCont.appendChild(collection); 
            collection.addEventListener('click', (e) => {
                let colLabel = e.target.textContent;
                removeCol.addEventListener('click', () => {
                    let removePrompt = prompt("Are you sure you'd like to delete this collection?")
                    if (removePrompt == 'yes') {
                        remove(ref(db, `users/${uid}/collections/${colLabel}/`))
                        location.reload(); 
                    } else {
                        null
                    }
                }) 
                let style = collectionNode.val().style
                todoList.style.display = 'inline-block';
                todoListTitle.textContent = colLabel;
                todoList    .classList.add(`${style}`); 
                get(child(dbRef, `users/${uid}/collections/${colLabel}/todos/`))
                .then((todo_Item) => {
                    todo_Item.forEach((todoNode) => {
                        let todoCont = document.querySelector('.todoCont');
                        let todoInput = document.querySelector('.todoInput'); 
                        let todo = document.createElement('h1'); 
                        todo.classList.add('todo'); 
                        todo.textContent = todoNode.val().todoText; 
                        todoCont.appendChild(todo);  
                        todoInput.value = ''; 
                        todo.addEventListener('click', (e) => {
                            e.preventDefault(); 
                            let removeTodo = e.target.textContent; 
                            remove(ref(db, `users/${uid}/quickTodos/${removeTodo}`))
                            todoCont.removeChild(todo); 
                            console.log(removeTodo); 
                        })
                    })
                    
                })
                addTodoItem.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    let todoText = todoInput.value; 
                    if(todoText == '' ) {
                        alert("You must use the input field to name the todo")
                    } else {

                        set(ref(db, `users/${uid}/collections/${colLabel}/todos/${todoText}`), {
                            todoText: todoText
                        })
                        .then(() => {
                            get(child(dbRef, `users/${uid}/collections/${colLabel}/`))
                            .then((colStyle) => {
                                let todoCont = document.querySelector('.todoCont');
                                let todoInput = document.querySelector('.todoInput'); 
                                let todo = document.createElement('h1'); 
                                todo.classList.add('todo'); 
                                todo.textContent = todoText; 
                                todoCont.appendChild(todo);  
                                todoInput.value = ''; 
                                todo.addEventListener('click', (e) => {
                                    e.preventDefault(); 
                                    let removeTodo = e.target.textContent; 
                                    remove(ref(db, `users/${uid}/quickTodos/${removeTodo}`))
                                    todoCont.removeChild(todo); 
                                    console.log(removeTodo); 
                                })
    
                            })
    
                        })
                    }
                })
            })
        })
    })
})



closeTodoList.addEventListener('click', () => {
    todoList.style.display = 'none'; 
    location.reload(); 
})
//!
//! function for getting realtime collections to the database: 
//!

//! shareddCols

let addSharedBtn = document.querySelector('.addSharedBtn'); 
let createSharedCol = document.querySelector('.createSharedCol'); 
let closeSharedCreateMenu = document.querySelector('#closeCreateMenu'); 
let createColInput = document.querySelector('.createColInput'); 
let createKeyInput = document.querySelector('.createKeyInput'); 
let createSharedBtn = document.querySelector('.createSharedBtn'); 

addSharedBtn.addEventListener('click', () => {
    createSharedCol.style.display = 'flex'
})
closeSharedCreateMenu.addEventListener("click", () => {
    createSharedCol.style.display = 'none'; 
})

let sharedtealColSelect = document.querySelector('.sharedtealCol'); 
let sharedburgandyColSelect = document.querySelector('.sharedburgandyCol'); 
let sharedslateGrayColSelect = document.querySelector('.sharedslateGrayCol'); 
let sharedseaGreenColSelect = document.querySelector('.sharedseaGreenCol'); 
let sharedmauveColSelect = document.querySelector('.sharedmauveCol'); 
let sharedroseGoldColSelect = document.querySelector('.sharedroseGoldCol'); 

sharedtealColSelect.addEventListener('click', () => {
    colorPicked = 'tealCol'; 
    console.log(colorPicked)
    tealColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked
})
sharedburgandyColSelect.addEventListener('click', () => {
    colorPicked = 'burgandyCol'; 
    burgandyColSelect.classList.remove('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})
sharedslateGrayColSelect.addEventListener('click', () => {
    colorPicked = 'slateGrayCol'; 
    slateGrayColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})
sharedseaGreenColSelect.addEventListener('click', () => {
    colorPicked = 'seaGreenCol'; 
    seaGreenColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    sharedColInput.value = colorPicked

})
sharedmauveColSelect.addEventListener('click', () => {
    colorPicked = 'mauveCol'; 
    mauveColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected'); 
    roseGoldColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})
sharedroseGoldColSelect.addEventListener('click', () => {
    colorPicked = 'roseGoldCol'; 
    roseGoldColSelect.classList.remove('notSelected'); 
    burgandyColSelect.classList.add('notSelected'); 
    slateGrayColSelect.classList.add('notSelected'); 
    seaGreenColSelect.classList.add('notSelected'); 
    mauveColSelect.classList.add('notSelected'); 
    tealColSelect.classList.add('notSelected');
    console.log(colorPicked); 
    colColorInput.value = colorPicked
    sharedColInput.value = colorPicked

})

auth.onAuthStateChanged((cred) => {
    createSharedBtn.addEventListener('click', () => {
        let colColorInput = document.querySelector('.colColorInput')
        let createColInput = document.querySelector('.createColInput'); 
        let createKeyInput = document.querySelector('.createKeyInput'); 
        let color = colColorInput.value; 
        let colLabel = createColInput.value; 
        let colKey = createKeyInput.value; 
        let uid = cred.uid; 
        if (color == '' || colLabel == '' || colKey == '') {
            alert('You must fill out the form to create a shared collection')
        } else {
            set(ref(db, `users/${uid}/public_collections/${colLabel}/`), {
                colLabel: colLabel, 
                colKey: colKey, 
                style: color
            }),
            set(ref(db, `public_collections/${colKey}/`), {
                colLabel: colLabel, 
                style: color, 
                colKey: colKey
            })
            .then(() => {
                location.reload(); 
            })
        }
    })

})

//? get public collections!

auth.onAuthStateChanged((cred) => {
    let uid = cred.uid; 
    let dbRef = ref(db); 
    get(child(dbRef, `users/${uid}/public_collections/`)) //? grab the key from user to verify public collection exists
    .then((public_item) => {
        public_item.forEach(publicUserNode => {
            let colKey = publicUserNode.val().colKey; 
            //? now get the public collections using the col key we just got
            get(child(dbRef, `public_collections/${colKey}/`))
            .then(publicNode => {
                let collection = document.createElement('h1'); 
                collection.classList.add(`${publicNode.val().style}`)
                collection.textContent = publicNode.val().colLabel; 
                let sharedColCont = document.querySelector('.sharedColCont')
                sharedColCont.appendChild(collection); 
                collection.addEventListener('click', (e) => {
                    //? get todos from collection
                    let uid = cred.uid; 
                    let dbRef = ref(db); 
                    get(child(dbRef, `public_collections/${colKey}/todos`))
                    .then((todo_item) => {
                        todo_item.forEach((todoNode) => {
                            let todo = document.createElement("h1"); 
                            todo.classList.add('todo'); 
                            todo.textContent = todoNode.val().todoText; 
                            let todoCont = document.querySelector('.todoCont'); 
                            todoCont.appendChild(todo); 
                            todo.addEventListener('click', (e) => {
                                e.preventDefault(); 
                                let removeTodo = e.target.textContent; 
                                remove(ref(db, `public_collections/${colKey}/todos/${removeTodo}`))
                                todoCont.removeChild(todo); 
                                console.log(removeTodo); 
                            })
                        })
                    } )
                    //? open and style todolist 
                    let sharedKeyTitle = document.querySelector('.sharedKeyTitle'); 
                    todoList.style.display = 'inline-block'
                    todoList.classList.add(`${publicNode.val().style}`)
                    todoListTitle.textContent = e.target.textContent
                    sharedKeyTitle.textContent = "ShareKey: " + publicNode.val().colKey
                    //? add todos: 
                    addTodoItem.addEventListener('click', (e) => {
                        e.preventDefault(); 
                        let todoText = todoInput.value
                        if (todoText == '') {
                            alert('You must use the input field to create a todo!')
                        } else {
                            //? get users name to make it easy to read.
                            auth.onAuthStateChanged(cred => {
                                let uid = cred.uid; 
                                let dbRef = ref(db); 
                                get(child(dbRef, `users/${uid}/`))
                                .then((userNode)=> {
                                    let usersName = userNode.val().name; 
                                    let todoText = `${usersName}: ${todoInput.value} `
                                    set(ref(db, `public_collections/${colKey}/todos/${todoText}`), {
                                        todoText: todoText
                                    })
                                    .then(() => {
                                        let todoCont = document.querySelector('.todoCont'); 
                                        let todo = document.createElement('h1'); 
                                        todo.classList.add('todo'); 
                                        todo.textContent = todoText; 
                                        todoCont.appendChild(todo); 
                                        todoInput.value = ''; 
                                        todo.addEventListener('click', (e) => {
                                            e.preventDefault(); 
                                            let removeTodo = e.target.textContent; 
                                            remove(ref(db, `public_collections/${colKey}/todos/${removeTodo}`))
                                            todoCont.removeChild(todo); 
                                            console.log(removeTodo); 
                                        })
                                    })
                                })
                            })
                        }
                    })
                })
            })
        }) 
    })
})


// //! //! //! //!============================================================================
let colsPreloader = document.querySelector('.colsPreloader')
let initialColPreload = false; 
function removePreloader() {
    if (initialColPreload = true) {
        colsPreloader.style.display = 'none'
    } else {
        colsPreloader.style.opacity = '0';
        colsPreloader.style.height = '0vh' 
        colsPreloader.style.width = '0vw' 
        initialColPreload = true; 
    }
}


//? todoinput event listener to support 'enter' as submit. having a form with the input and button together for some reason
//? closes the todo list 

// todoInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//         document.getElementById('submit').click(); 
//     }
// })

//? preloader for the todos
let todoPreloader = document.querySelector('.todoPreloader')

function removeTodoPreloader() {
    todoPreloader.style.display = 'none'; 
}