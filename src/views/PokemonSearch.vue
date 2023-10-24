<template>
    <div class="flex flex-col justify-between pt-6  h-screen ">
        <div class=" w-[80%] md:w-1/2 2xl:w-1/3 mx-auto md:px-6">
            <!-- Tab Contents -->
            <div>
                <div
                v-for="(tab, index) in tabs"
                :key="index"
                :id="'tab-' + (index + 1)"
                :class="{ hidden: activeTab !== index }"
                >
                    <div class="relative drop-shadow-[0_2px_10px_rgba(0,0,0,.04)]">
                    <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none flex flex-col px-2 justify-center items-center">
                        <img class="w-4 h-4 " src="/icons/search.png" alt="">
                    </div>
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        class="text-md rounded block w-full pl-10 p-2.5 focus:outline-none" 
                        placeholder="Search"
                    >
                    </div>
                    <div class="h-[70vh] 2xl:[80vh] overflow-auto mt-4">
                        <PokemonList 
                            :favoritesIsSelected="activeTab === 1 ? true : false" 
                            :filteredPokemons="filteredPokemons" 
                            v-if="filteredPokemons.length"
                            @pokemon-selected="handlePokemonSelected"
                        />   
                        <EmptyList v-else />
                    </div>
                </div>
            </div>
        </div>
      <!-- Tabs -->
      <div v-if="filteredPokemons.length" class="py-3 w-full border-b mt-4 bg-white flex justify-center drop-shadow-[0_.5px_4px_rgba(0,0,0,.05)]">
          <ul class="grid grid-cols-2 gap-3 w-[80%] md:w-1/2 2xl:w-1/3 mx-auto md:px-6 ">
            <li
              v-for="(tab, index) in tabs"
              :key="index"
              @click="changeTab(index)"
              :class="{'flex justify-center items-center w-full': true,
                'btn-primary': activeTab === index,
                'bg-unselected btn-primary': activeTab !== index,
              }"
            >
            <img class="w-5 h-5 " :src="tabs[index].icon" alt="">
            <span class="pl-3">{{ tabs[index].name }}</span>
            
            </li>
          </ul>
      </div>
    </div>
    <CustomModal ref="modal" :data="currentPokemon" />
  </template>
<script>
import { isProxy, toRaw } from 'vue';
import PokemonList from '../components/pokemonList.vue';
import EmptyList from '../components/EmtyList.vue';
import CustomModal from '../components/extra/CustomModal.vue';

export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { name: 'All', icon: '/icons/list.png' },
        { name: 'Favorites', icon: '/icons/star.png' },
      ],
      searchQuery: '',
      favoritesSelected: false,
      favorites: [],
      currentPokemon: null,
    };
  },
  created() {
    const storedActiveTab = localStorage.getItem('activeTab');
    if (storedActiveTab !== null) {
      this.activeTab = parseInt(storedActiveTab);
    }
  },
  mounted() {
    this.loadFavorites();
  },
  methods: {
    changeTab(index) {
      this.loadFavorites();
      this.activeTab = index;
      localStorage.setItem('activeTab', index);
    },
    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('myFavorites') || "");
    },
    async handlePokemonSelected(data) {
      try {
          this.$emit("is-loading",true)
          await this.$store.dispatch('LoadPokemonDetail', `${this.$CONFIG.API_URL}${data.name}`);
        } finally {
          this.currentPokemon = isProxy(this.$store.state.currentPokemon) ? toRaw(this.$store.state.currentPokemon) : this.$store.state.currentPokemon;
          this.currentPokemon.isFavorite = data.isFavorite;
          this.$emit("is-error",this.$store.state.error)
          this.$emit("is-loading",false)
          this.$refs.modal.onToggle();
        } 
    }
  },
  components: {
    PokemonList,
    EmptyList,
    CustomModal
  },
  computed: {
    filteredPokemons() {
      return this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    pokemons() {
      let pokemons = isProxy(this.$store.state.pokemons)
        ? toRaw(this.$store.state.pokemons)
        : this.$store.state.pokemons;
      return pokemons;
    },
  },
};
</script>
  
  