import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import Chat from "../../components/chat/Chat"

import io from "socket.io-client";
import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import { Server } from "socket.io";
import {createServer} from "http"
import { GiJesterHat } from "react-icons/gi";

global.setImmediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args)); // Resumidamente, é para que o programa não fique testando infinitamente

const mock = new MockAdapter(axios.default)

Element.prototype.scrollIntoView = jest.fn()

jest.setTimeout(10000)

describe("Testando o componente chat",()=>{
    let ioServer,socket
    beforeAll((done)=> { // Tem a função de criar o servidor do chat antes de testar o chat, se abrisse o chat fora do beforeall poderia ter a chance de dar problema por conta de não ir para o encadeamento (ordem de cima para baixo)
        const httpServer = createServer()
        ioServer = new Server(httpServer)

        httpServer.listen(() =>{
            const{port} = httpServer.address()
            socket = io(`http://localhost:${port}`)
            done()
        })
    })
    afterAll((done)=>{
        if(socket){
            socket.close()
        }
        if(ioServer){
            ioServer.close()
        }
        done()
    })
    test("Vamos testar a comunicação axios e socket.io",async()=>{
        mock.onGet("/api/some-endpoint").reply(200,{data:"some data"})
        render(<Chat socket={socket}></Chat>)

        fireEvent.change(screen.getByTestId("message-input"),{target:{value:"Hello, World!"}}) // Em vez de declarar uma variável chamada input e colocar o valor "screen.getByTestId("message-input")", se coloca de uma vez, seria como retornar 1+1 ao invés de declarar uma variável a = 1+1 e retornar a
        fireEvent.click(screen.getByTestId("send-button"))
    })
})




