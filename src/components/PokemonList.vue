<template>
    <div v-if="filteredPokemonList.length">
      <ul>
        <li v-for="pokemon in filteredPokemonList" :key="pokemon.id" ref="childRef">
          <PokemonItem 
          :name="pokemon.name" 
          :favoritesIsSelected="favoritesIsSelected"
          @click-toggle="toggleFavorite" 
          @pokemon-selected="(name) => $emit('pokemon-selected', name)"
          />
        </li>
      </ul>
    </div>
    <div class="w-full flex flex-col justify-center items-center py-6" v-else>
      <span class="title">There is nothing here.</span>
      <div class="w-36 py-6">
        <img src="/img/pikachuSearching.png" alt=""> 
      </div>
      <span class="subtitle text-center">
        Select your favorites Pokémons to see them here.
      </span>
    </div>
  </template>
  
  <script>
  import PokemonItem from './PokemonItem.vue';
  export default {
    props: {
        filteredPokemons: Array,
        favoritesIsSelected: Boolean
    },
    data() {
      return {
        searchQuery: "",
      };
    },
    components: {
      PokemonItem
    },
    computed: {
      filteredPokemonList(){
        if(this.favoritesIsSelected){
          let tempArr = localStorage.getItem('myFavorites') ? JSON.parse(localStorage.getItem('myFavorites')) : [];
          let newArr = this.filteredPokemons.filter((pokemon) => { 
            return tempArr.includes(pokemon.name)});
          return newArr
        }else{
          return this.filteredPokemons
        }
      }
    },
  };
  </script>