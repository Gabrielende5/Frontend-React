import React, { useEffect, useRef, useState } from 'react'
import { BsSignpostSplit } from 'react-icons/bs';

function Chat([socket]) { // tudo que estiver recebendo do backend é o socket, seja username, message e etc
   const bottomRef = useRef(null);
   const messageRef = useRef(null);
   const [messageList, setMessageList] = useState([]);
   const [inputValue, setInputValue] = useState('');

   useEffect(() => { // Só funciona quando tiver mudança no socket, ou seja, receber mensagem
    socket.on("receive_message",(data)=>{
        setMessageList((current)=> [...current,data]); // "current" -> mensagem atual, sendo trazida para o setMessageList

    });
    return()=>{
        socket.off("receive_message");
    }
   },[socket])

   useEffect(()=>{
    scrollDown()

   }, [messageList])

   const handleSubmit = () =>{ // Botão de enviar
    if(!messageList.current){
        return;
    } 

    const newMessage = messageRef.current.value;

    if(!newMessage.trim()){ // verifia se é uma mensagem vazia
        return;
    }
    socket.emit("message",newMessage);
    clearInput(); 
    focusInput();
   }

   const clearInput = () =>{
    if(messageRef.current){
        messageRef.current.value='';
        setInputValue("");
        }
    }
    
    const focusInput = () =>{
        if(messageRef.current){
            messageRef.current.focus();
        }
   }
   const scrollDown =() =>{
        if(bottomRef.current){
            bottomRef.current.scrollIntoView({behavior:'smooth'});
        }
   }

   const getEnterKey = (e) =>{
    if(e.key=== 'Enter'){
        handleSubmit();
    }
   }

   
  return (
    <div>
      <div className='chat-container'>
        <div className='chat-bow'>
            <div className='chat-header'>Bate Papo</div>
            <div className='chat-messages'>
                {messageList.map((message,index) =>{
                    <div key={index} className='chat-message'>
                        <strong>{message.author}</strong>
                        <div>{message.text}</div>
                    </div>
                })}
            </div>
            <div ref={bottomRef}></div>
            <div className='chat-input-container'>
                <input ref={messageRef} placeholder='Digite uma menssagem' onKeyDown={(e) =>getEnterKey(e)} className='chat-input' value={inputValue} onChange={(e) => setInputValue(e.target.value)}  type="text" />
                <button className='chat-button' onClick={()=>handleSubmit()}>Enviar mensagem</button>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Chat
