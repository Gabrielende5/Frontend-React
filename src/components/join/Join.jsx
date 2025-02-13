import React, { useRef } from 'react'
import {io} from 'socket.io-client'
import "./Join.css"



function Join({setChatVisibility, setSocket}) {
    const usernameRef=useRef(null);

    const handleSubmit= async()=> {
        const username = usernameRef.current?.value;
        if(!username?.trim()){
            return;
        }
        const socket = io('http://localhost:8080'); // Conecta na porta 8080
        socket.emit("set_username",username);
        setSocket(socket);
        setChatVisibility(true);
    }
    return (
    <div className='join-container'>
        <h2 className='join-title'> Chat em tempo real</h2>
        <div className='join-input-container'>
            <input type="text" placeholder='Seu nome' ref={usernameRef} className='join-input' />

        </div>
        <button className='join-button' onClick={handleSubmit}> Entrar </button>

    </div>
  )
}

export default Join
