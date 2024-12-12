import axios from "axios";
import { UsePokemons } from "../../../hooks/pokemons/UsePokemons";
import { useState } from "react";
import './PokemonList.css'
import PokemonModal from "../pokemonModal/PokemonModal.jsx"

const PokemonList =() =>{
    const{loading, error, data:pokemons} = UsePokemons();
        // tipo "UseContext" (usando apenas o método que ele faz e não propriamente ele, por conta que são poucas propriedades), sendo usando para chamar propriedades (props) sem precisar expandir muito o código
    const[selectedPokemon, setSelectedPokemon] = useState(null);
    const[modalVisible, setModalVisible] = useState(false);
    
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
                    </tr>
                </thead>
                <tbody>
                    {pokemons.map((pokemon)=>(
                        <tr
                        key={pokemon.name}
                        onClick={()=>fetchPokemonDetails(extractIdFromUrl(pokemon.url))}
                        // Extrai pela URL por conta que a API só mostra o ID pela URL
                        style={{cursor:'pointer'}}
                        >
                            <td>{extractIdFromUrl(pokemon.url)}</td>
                            <td>{pokemon.name}</td>
                        </tr>
                    ))}
                </tbody>
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
