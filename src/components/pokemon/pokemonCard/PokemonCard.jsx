import React from 'react'
import usePokemonStore from '../../../store/UsePokemonStore'
import axios from 'axios';
import { TbSend2 } from 'react-icons/tb';
import { AiFillCloseCircle } from 'react-icons/ai';

export const PokemonCard = ({onClose,sendPokemonMessage}) => { // "({onClose,sendPokemonMessage})" está esperando receber essas funções
    const {selectedPokemons} = usePokemonStore();
    const handleSendPokemon = async (pokemon) => {
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`);
            sendPokemonMessage({
                id: pokemon.id,
                name: response.data.name,
                image:response.data.sprites.front_default
            });
            onClose();
        } catch (error){
            console.error("Erro ao encontrar os detalhes do Pokemon",error)
        }
    }
    return(
        <div className='fundo'>
            <div className='closeNidak' onClick={onClose}>
                <AiFillCloseCircle size={40} color='white'></AiFillCloseCircle>
            </div>
            <div className='pokemons-saved'>
                {selectedPokemons.map((pokemon) => (
                    <div key={pokemon.id}>
                        <span>{pokemon.name}</span>
                        <span className='send-button-pokemon' onClick={()=> handleSendPokemon(pokemon)}>
                            <TbSend2 size={24} color="white"></TbSend2>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}