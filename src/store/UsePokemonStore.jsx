import {create} from "zustand"
const usePokemonStore = create((set) => ({
    selectedPokemons: [], //lista de pokemons selecionados
    // função para adicionar um pokemon a lista
    togglePokemon: (pokemon) =>
        set((state) => {
            // Verifica se o pokemon selecionado ja esta dentro da lista
            const isSelected = state.selectedPokemons.some(
                (p) => p.id === pokemon.id

            )

            return {// se o pokemon ja havia sido selecionado, remove ele da lista se não add
                selectedPokemons: isSelected
                    ? state.selectedPokemons.filter((p) => p.id !== pokemon.id)
                    : [...state.selectedPokemons, pokemon],
            };
        }),
}));

export default usePokemonStore;