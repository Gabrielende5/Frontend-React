import axios from "axios";
import { useState } from "react";
import './PokemonList.css'

import { UsePokemons } from "../../../hooks/pokemons/UsePokemons";
import PokemonModal from "../pokemonModal/PokemonModal.jsx"
import usePokemonStore from "../../../store/UsePokemonStore.jsx";
import React from"react";

const PokemonList =() =>{
    const{loading, error, data:pokemons} = UsePokemons();
        // tipo "UseContext" (usando apenas o método que ele faz e não propriamente ele, por conta que são poucas propriedades), sendo usando para chamar propriedades (props) sem precisar expandir muito o código
    const[selectedPokemon, setSelectedPokemon] = useState(null);
    const[modalVisible, setModalVisible] = useState(false);
    const{selectedPokemons, togglePokemon} = usePokemonStore();
    
    if(loading){
        return<div>Loading...</div>;
    }
    if(error){
        return<div>Error:{error.message}</div>;
    }
    const extractIdFromUrl=(url)=>{
        const urlParts=url.split('/');
        return urlParts[urlParts.length - 2];
    }
    
    const fetchPokemonDetails=async(id)=>{
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            setSelectedPokemon(response.data)
            setModalVisible(true)
        } catch(error){
            console.error("Erro ao buscar detalhes do Pokémon",error);
        }
    }
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>
                <tbody data-testid="pokemons-list">
                {pokemons && pokemons.length> 0 && pokemons.map((pokemon)=>{
                    const id = extractIdFromUrl (pokemon.url); 
                    const isSelected = selectedPokemons.some((p)=> p.id ===id);
                    return(<tr data-testid={`pokemon-${id}`} key={pokemon.id} style={{cursor:"pointer"}}><td>
                        {id}
                        </td> <td data-testid={`pokemon${id}-name`} onClick={() => fetchPokemonDetails(id)}>{pokemon.name}</td>
                        <td>
                        <input type="checkbox" checked={isSelected}onChange={(e) => {
                        e.stopPropagation(); 
                        togglePokemon({id,name:pokemon.name});
                    }}>
                        </input>
                        </td>
                        </tr>
                        );
                })}
                </tbody>
                {/* onClick={()=>fetchPokemonDetails(extractIdFromUrl(pokemon.url))}
                // Extrai pela URL por conta que a API só mostra o ID pela URL */}
            </table>
            {modalVisible&&(
                <PokemonModal
                pokemon={selectedPokemon}
                onClose={()=>setModalVisible(false)}></PokemonModal>
            )}
        </div>
    )

}
export default PokemonList;
