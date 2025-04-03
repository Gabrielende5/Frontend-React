import React from "react"
import {render,screen,fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import {io} from "socket.io-client"
import Join from "../../components/join/Join"

describe("Testando componente join",()=>{
    it("Vamos testar se tudo está aparecendo na tela",()=> { // O "it" é a mesma coisa que "test"
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn()

        render(<Join setChatVisibility={setChatVisibility} setSocket={setSocket}></Join>)
        expect(screen.getByText("Chat em tempo real")).toBeInTheDocument()
        expect(screen.getByTestId("name-input")).toBeInTheDocument()
        expect(screen.getByTestId("submit-button")).toBeInTheDocument()
    });
    it("Vamos testar se as mudanças de valor no input estão sendo capturadas e as funções estão sendo chamadas",()=>{
        const setChatVisibility = jest.fn();
        const setSocket = jest.fn()
        
        render(<Join setChatVisibility={setChatVisibility} setSocket={setSocket}></Join>)
        
        const input = screen.getByTestId("name-input")
        fireEvent.change(input,{target:{value:"TestUser"}})

        const button = screen.getByTestId("submit-button")
        fireEvent.click(button)
        expect(setChatVisibility).toHaveBeenCalledWith(true)
            // O With é quando quer saber se tem alguma coisa dentro
        expect(setSocket).toHaveBeenCalled()
            // Apenas Called por conta que quer saber se mudou ou não
    })
    
})