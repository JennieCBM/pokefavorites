import axios from 'axios';

export const LoadPokemons = async ({commit, state}, url) => {
  console.log("here")
    let pokemonNameList = [...state.Pokemons];

    try {
      const pokemonListRes = await axios.get(url);
      if (pokemonListRes?.data?.results) {
          commit('SetNextUrl', pokemonListRes.data.next);
        for (const pokemon of pokemonListRes.data.results) {
          pokemonNameList = {
            name: pokemon?.name || '',
          };
          /* const pokemonUrlRes = await axios.get(pokemon.url);
  
          if (pokemonUrlRes.data) {
            const pokemonArtImage =
              pokemonUrlRes.data.sprites?.other["official-artwork"]?.front_default || "";
            const pokemonId =  pokemonUrlRes.data.id || 'No definido';
            const pokemonWeight =  pokemonUrlRes?.data?.weight || 'No definido';
            const pokemonTypes = pokemonUrlRes?.data?.types?.map(type=>type.type.name) || [];
            const pokemonMoves = pokemonUrlRes?.data?.moves?.map(move=> {
                return move.move.name
            })
            const urlDescription = pokemonUrlRes?.data?.species?.url || null;
            pokemonObj = {
              ...pokemonObj,
              image: pokemonArtImage,
              id: pokemonId,
              weight: pokemonWeight,
              types : pokemonTypes,
              urlDescription : urlDescription,
              moves: pokemonMoves
            };
          }
          
          if(!pokemonObj.image){
            return;
          }
          processedPokemons = [...processedPokemons, pokemonObj]; */

        }
      }
      commit('SetPokemons',pokemonNameList);
      commit('SetError', false);
    } catch (_error) {
      commit('SetError', true)
    }
  };
