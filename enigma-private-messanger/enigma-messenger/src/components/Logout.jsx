import React from 'react'
import { signOut } from 'firebase/auth'; 
import { auth } from './Firebase'; 

const Logout = () => {
  return (
    <div className='logoutCont'>
        <button onClick={() => {
            auth.signOut(); 
        }}>Log Out</button>

    </div>
  )
}

export default Logout