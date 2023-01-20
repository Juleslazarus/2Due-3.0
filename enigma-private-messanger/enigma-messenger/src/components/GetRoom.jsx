import { set, ref, child } from 'firebase/database';
import {db} from './Firebase'
import React from 'react'
import { useState } from 'react'

//? 
export let [roomInfo, setRoomInfo]=useState('asdf'); 
const GetRoom = () => {
    let [roomFound, setRoomFound]=useState(false); 
    let [getRoomMenu, setRoomMenu]=useState(false); 
  return (
    <div className='getRoomCont'>
        <button onClick={(e) => {
            e.preventDefault(); 
            setRoomMenu(true); 
        }} className='openRoomMenu absolute top-[40%] left-[45%] bg-blue-500 rounded-md p-2 text-2xl text-white'>+ Room</button>

        {
            setRoomMenu ? <form>
                <input className='roomKeyInput' type='text' placeholder='join room with room key'/>
                <button onClick={(e) => {
                    e.preventDefault(); 
                    set()
                }} className='setRoomBtn'></button>
            </form>:null
        }
    </div> 
  )
}

export default GetRoom