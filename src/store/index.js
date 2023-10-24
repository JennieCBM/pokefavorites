import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    pokemons: [],
    currentPokemon: null,
    nextUrl: null,
    error: false
  },
  getters: {
    GetPokemons (state) {
      return state.pokemons;
    },
    GetPokemon: (state) => (id) => {
      return state.pokemons.find(Pokemon => Pokemon.id == id);
    },
    GetNextUrl(state) {
      return state.nextUrl;
    }
  },
  mutations: {
    SetPokemons (state, newPokemons) {
      state.pokemons = newPokemons
    },
    SetCurrentPokemon (state, pokemonDetail) {
      state.currentPokemon = pokemonDetail;
    },
    SetError (state, value) {
      state.error = value;
    },
    SetNextUrl (state, value) {
      state.nextUrl = value;
  }
  },
  actions: {
    LoadPokemons: async ({commit, state}, url) => {
      try {
        const pokemonListRes = await axios.get(url);
        if (pokemonListRes?.data?.results) {
            commit('SetNextUrl', pokemonListRes.data.next);
            commit('SetPokemons',pokemonListRes.data.results);
            commit('SetError', false);
        }
        
      } catch (_error) {
        commit('SetError', true)
      }
    },
    LoadPokemonDetail: async ({commit, state}, url) => {
      try {
        const pokemonDetail = await axios.get(url);
        if (pokemonDetail?.data) {
          const pokemonArtImage =
          pokemonDetail.data.sprites?.other["official-artwork"]?.front_default || "";
          const pokemonTypes = pokemonDetail?.data?.types?.map(type=>type.type.name) || [];
          commit('SetCurrentPokemon',{
            name: pokemonDetail.data.name,
            image: pokemonArtImage,
            height: pokemonDetail.data.height,
            weight: pokemonDetail?.data?.weight,
            types : pokemonTypes
          });
        }       
      } catch (error) {
        commit('SetError', true)
      }
    }
  }
})