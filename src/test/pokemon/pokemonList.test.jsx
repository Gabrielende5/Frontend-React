import React, { act } from "react";
import { render,screen,fireEvent,waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import PokemonList from "../../components/pokemon/pokemonList/pokemonList";

import {setupServer} from  "msw/node"
import axios from "axios";
import { pokemonsListMock } from "../../mock/pokemon.mock";
import { pokemon1 } from "../../mock/pokemon1.mock";
import { rest } from "msw";

import preview from "jest-preview"


describe("PokemonList",()=>{
    const pokemonIdChoosed = 4 //ID do pokemon escolhido para o teste

    jest.mock("axios") //Mock (banco de dados falso) do axios para interceptar todas as chamadas HTTP

    const server = setupServer(
        rest.get("http://localhost:4444/pokemons",(req,res,ctx)=>{ // Pega todos os pokemons pelo get
            return res(ctx.json(pokemonListMock))
        }),
        rest.get(`http://pokeapi.co/api/v2/pokemon/${pokemonIdChoosed}`, (req,res,ctx)=>{ // Pega o pokemon escolhido no "pokemonIdChoosed" para abrir o card desse pokemon
            const{id}=req.params
            const pokemon={...pokemon1,id:parseInt(id)}
            return res(ctx.json(pokemon))
        })
    )
    beforeAll(()=> server.listen()) //Inicia o servidor antes dos teste
    afterEach(()=>{
        server.resetHandlers()
        jest.clearAllMocks() // Limpa todos os mocks para garantir o isolamento dos teste
    })
    afterAll(()=> server.close()) // Depois de tudo, fecha o servidor

    test("Checando se a lista de pokemons está correta", async()=>{
        axios.get.mockResolvedValueOnce({data: pokemonsListMock})
        render(<PokemonList/>)

        expect(screen.getByText(/Loading.../)).toBeInTheDocument()
        await waitFor(()=>{
            expect(screen.getByText(/Loading.../)).not.toBeInTheDocument() //Verifica se o "loading" some da tela depois de um tempo
            expect(screen.getByTestId(`pokemon-${pokemonGenerated.id}`)).toBeInTheDocument();
        })
        const pokemonList = screen.getByTestId("pokemon-list") //Mostra todos os pokemons na tela
        expect(pokemonList.children).toHaveLength(pokemonsListMock.results.length) // Verifica se todos os pokemons da lista estão na tela
    })
    test("Abre modal com detalhes do pokemon ao clicar",async()=>{
        axios.get.mockResolvedValueOnce({data:pokemonListMock})
        render(<PokemonList/>)
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
        await waitFor(()=>{
            expect(screen.getAllByTestId(`pokemon-${pokemonGenerated.id}`)).toBeInTheDocument()
        })
        axios.get.mockResolvedValueOnce({data:pokemonGenerated})

        const pokemonElement = screen.getByTestId(`pokemon-${pokemonGenerated.id}-name`)
        await act(async ()=>{
            fireEvent.click(pokemonElement)
        })
        await waitFor(()=>{ // Aguardando até que o modal seja exibido
            expect(screen.getByTestId("modal-pokemon")).toBeInTheDocument()
        }) 

            //Validando que o modal contém as informações corretas
        expect(screen.getByTestId(`pokemon-chosed-${pokemonGenerated.id}`)).toBeInTheDocument()
        expect(screen.getByText(pokemonGenerated.types[0].type.name)).toBeInTheDocument()
        expect(screen.getByText(pokemonGenerated.types[1].type.name)).toBeInTheDocument()
        await act(async()=>{ // Simulando o clique para fechar o modal
            fireEvent.click(screen.getByTestId("button-close-modal"))
        })

        await waitFor(()=>{ //Verificando se o modal foi fechado corretamente
            expect(screen.queryByTestId("modal-pokemon")).not.toBeInTheDocument()
        })
    })
})
