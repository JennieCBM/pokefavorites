export function GetPokemons (state) {
    return state.pokemons;
}
export const GetPokemon = (state) => (id) => {
    return state.pokemons.find(pokemon => pokemon.id == id);
}
export function GetNextUrl(state) {
    return state.netxUrl;
}