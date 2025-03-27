import React, { useEffect, useRef, useState } from 'react'
import{GiCardBurn} from "react-icons/gi"
import {PokemonCard} from"../pokemon/pokemonCard/PokemonCard"
import "./Chat.css"
import { type } from '@testing-library/user-event/dist/type';

export default function Chat({ socket }) { // tudo que estiver recebendo do backend é o socket, seja username, message e etc
    const bottomRef = useRef(null);
    const messageRef = useRef(null);
    const [messageList, setMessageList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showModal,setShowModal] = useState(false);


    useEffect(() => { // Só funciona quando tiver mudança no socket, ou seja, receber mensagem
        socket.on("receive_message", (data) => {
            setMessageList((current) => [...current, data]); // "current" -> mensagem atual, sendo trazida para o setMessageList
        });

        return () => {
            socket.off("receive_message");
        };
    }, [socket]);

    useEffect(() => {
        scrollDown();
    }, [messageList]);
    
    const mudarModal=()=>{ // Muda o Modal de false para true e de true para false
        setShowModal(!showModal);
    }

    const handleSubmit = () => { // Botão de enviar
        if (!messageRef.current) return;

        const newMessage = messageRef.current.value;

        if (!newMessage.trim()) return; // verifia se é uma mensagem vazia

        const messageData={text:newMessage, type:"text"}

        socket.emit("message", messageData);
        clearInput();
        focusInput();
    };

    const sendPokemonMessage =(pokemon)=>{
        const messageData ={
            text:`Você recebeu um ${pokemon.name}!`,
            type:"pokemon",
            pokemon,
            authorId:socket.id,
        }
        socket.emit("message",messageData);
        console.log(messageData)
        setShowModal(false)
    }


    const clearInput = () => {
        if (messageRef.current) {
            messageRef.current.value = "";
            setInputValue("");
        }
    };

    const focusInput = () => {
        if (messageRef.current) {
            messageRef.current.focus();
        }
    };

    const getEnterKey = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const scrollDown = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth", block:"end", inline:"nearest" });
        }
    };

    return (
        <div className="chat-container">
            {showModal ? (
                <PokemonCard onClose={()=> mudarModal()}
                sendPokemonMessage={sendPokemonMessage}/>
            ):null}
            <div className="chat-box">
                <div className="chat-header">Bate Papo</div>
                <div className="chat-messages">
                    {messageList.map((message, index) => (
                        <div className={`chat-message ${message.authorId === socket.id ? "own-message" : "other-message"}`} key={index}>
                            {message.type === "text"&&(
                                <div>
                                    <strong>{message.author}</strong>
                                    <div>{message.text}</div>
                                </div>
                            )}
                            {message.type==="pokemon"&&(
                                <div>
                                    <strong>{message.author}</strong>
                                    <div>
                                        <img src={message.pokemon.image} alt={message.pokemon.name}></img>
                                        <div>{message.pokemon.name}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <div className="chat-input-container">
                <GiCardBurn color="white" width={32} onClick={() => mudarModal()} />
                    <input
                        ref={messageRef}
                        placeholder="Mensagem"
                        onKeyDown={(e) => getEnterKey(e)}
                        className="chat-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="chat-button" onClick={() => handleSubmit()}>
                        Enviar Mensagem
                    </button>
                </div>
            </div>
        </div>
    );
}