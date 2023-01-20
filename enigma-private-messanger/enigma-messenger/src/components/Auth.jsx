import React from 'react'
import { app, db, auth } from './Firebase'
import '../tailwind.css'; 
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { set, child, ref } from 'firebase/database'; 

export let userSignedIn = false; 
const Auth = () => {
    const [logInPage, setLogInPage]= useState(false); 
    const [regPage, setRegPage]= useState(false); 

    auth.onAuthStateChanged((cred) => {
        if (cred) {
            userSignedIn = true; 
            console.log(userSignedIn); 
        } else {
            userSignedIn = false; 
        }
    })
    
return (
    <div className='h-[60vh] w-[75vw] relative flex justify-center items-center gap-4 flex-col'>
        <button className='text-white p-1 bg-blue-500 rounded-md' onClick={() => {
            setLogInPage(true); 
        }}>Log In</button>
        <button className='text-white p-1 bg-blue-500 rounded-md' onClick={() => {
            setRegPage(true); 
        }}>Register</button>

        {
            logInPage ? <>
                <form className=' loginForm absolute z-10 h-[60%] w-[85%] bg-blue-500 flex flex-col gap-2 justify-center items-center'>
                    <h1 className='text-white text-center font-bold'>Log In To Use Enigma</h1>
                    <label className='text-white font-bold'>Email:</label>
                    <input className='logEmailInput rounded-md p-[.5vh]' type='email' required placeholder='Email@domain.com'/>
                    <label className='text-white font-bold'>Password:</label>
                    <input className='logPassInput rounded-md p-[.5vh]' type='password' required placeholder='*******'/>
                    <button type='submit' onClick={(e) => {
                        e.preventDefault(); 
                        let logEmailInput = document.querySelector('.logEmailInput'); 
                        let logPassInput = document.querySelector('.logPassInput'); 
                        let email = logEmailInput.value; 
                        let password = logPassInput.value; 
                        signInWithEmailAndPassword(auth, email, password)
                        .catch((err) => {
                            console.log(err.message); 
                        })
                        setLogInPage(false)

                    }} className='text-black p-1 bg-white rounded-md'>Log In</button>
                    <button onClick={() => {
                        setLogInPage(false)
                    }}>Close</button>
                </form>
            </>: null
        }
        {
            regPage ? <>
            <form className=' loginForm absolute z-10 h-[80%] w-[85%] bg-blue-500 flex flex-col gap-2 justify-center items-center'>
                    <h1 className='text-white text-center font-bold'>Register To Use Enigma</h1>
                    <label className='text-white font-bold'>First Name:</label>
                    <input className='regFirstInput rounded-md p-[.5vh]' type='text' required placeholder='John'/>
                    <label className='text-white font-bold'>Email:</label>
                    <input className='regEmailInput rounded-md p-[.5vh]' type='email' required placeholder='Email@domain.com'/>
                    <label className='text-white font-bold'>Password:</label>
                    <input className='regPassInput rounded-md p-[.5vh]' type='password' required placeholder='*******'/>
                    <button type='submit' onClick={(e) => {
                        e.preventDefault(); 
                        let regFirstInput = document.querySelector('.regFirstInput'); 
                        let regEmailInput = document.querySelector('.regEmailInput'); 
                        let regPassInput = document.querySelector('.regPassInput'); 
                        let first = regFirstInput.value; 
                        let email = regEmailInput.value; 
                        let password = regPassInput.value; 
                        createUserWithEmailAndPassword(auth, email, password) 
                        auth.onAuthStateChanged((cred) => {
                            let uid = cred.uid; 
                            set(ref(db, `users/${uid}/`), {
                                first: first, 
                                email: email
                            })
                            
                        })
                        setRegPage(false)

                    }} className='text-black p-1 bg-white rounded-md'>Log In</button>
                    <button onClick={() => {
                        setRegPage(false)
                    }}>Close</button>
                </form>
            </>:null
        }
    </div>
    )
}

export default Auth