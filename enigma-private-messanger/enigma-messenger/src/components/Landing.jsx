import React from 'react'
import '../tailwind.css'
import Auth from './Auth'
import { userSignedIn } from './Auth'; 
import Enigma from './Enigma';
import { useState } from 'react'; 

import {auth} from './Firebase'
import { onAuthStateChanged } from 'firebase/auth';

const Landing = () => {
    let [userLoggedIn, setUserLoggedIn] = useState(false); 
    auth.onAuthStateChanged((cred) => {
        if (cred) (
            setUserLoggedIn(true)
        ); else if (!cred) (
            setUserLoggedIn(false)
        )
    }) 
    return (
        <div className='h-[70vh] w-[75vw] rounded-md bg-gray-900'>
            {
                userSignedIn ? <Enigma/> : <Auth/>
            }
        </div>
    )
}

export default Landing