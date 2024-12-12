import React from "react";
import "../pokemonList/PokemonList.css"
import { AiFillCloseCircle } from "react-icons/ai";

export const PokemonModal = ({ pokemon, onClose }) => { // É um parametro por receber informações, propriedades (props) normalemnte envia informações
    if (!pokemon) return null;

    return (
        <> {/* --> isso seria uma div */}
            <div className="fundo pokemon">
                <div className="closeModal" onClick={onClose}>
                    <AiFillCloseCircle size={40} color="white" />
                </div>
                <div className="pokemon-info">
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Abilities:</p>
                    <div>
                        {pokemon.abilities.map((ability) => (
                            <span key={ability.ability.name}>{ability.ability.name}</span>
                        ))}
                    </div>
                    <p>Types:</p>
                    <div>
                        {pokemon.types.map((type) => (
                            <span key={type.type.name}>{type.type.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default PokemonModal;