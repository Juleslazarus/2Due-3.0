import React from 'react'
import Logout from './Logout'
import '../tailwind.css'
import { db, auth } from './Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { set, get, ref, child } from 'firebase/database'
import GetRoom from './GetRoom'


const Enigma = () => {
  
  return (
    <div className='h-[100%] w-[100%] z-15 flex flex-col items-center relative '>
        <GetRoom/>
        <div className='messagesCont h-[90%] w-[100%] bg-blue'>
          
        </div>
        <form className='sendMsgForm w-[90%] h-[10%] flex gap-2 justify-center'>
          <input className='msgInput p-[1vh] w-[90%] rounded-md text-lg'/>
          <button type='submit' onClick={(e) => {
            e.preventDefault(); 
            auth.onAuthStateChanged(cred => {
              if(cred) {
                let dbRef = ref(db); 
                let uid = cred.uid
                get(child(dbRef, `users/${uid}/`))
                .then((user_item) => {
                  let user_first_name = user_item.val().first; 
                  let msgInput = document.querySelector('.msgInput')
                  let message = `${user_first_name} ${msgInput.value}`; 
                  set(ref(db, `messages/${msgRoom}/${message}/`), {
                    user: uid, 
                    message: message
                  })
                })
              }
            })
          }} className='sendMsgBtn text-3xl p-1 w-[10%] rounded-md bg-blue-500'>+</button>
        </form>
        <Logout/>
    </div>
  )
}

export default Enigma