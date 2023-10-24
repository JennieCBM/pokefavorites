<template>
  <div>
    <Loader v-if="loading"/>
    <RouterView @start="handleStart" @is-loading="setIsLoading" @is-error="setIsError"/>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Loader from './components/extra/loader.vue';
import { isProxy, toRaw } from 'vue'
export default {
  data() {
    return {
        errorDetected: false,
        loading: false,
        pokemons: null
    }
  },
  mounted(){
    if(this.$route.name !== 'home' && !this.pokemons){
      this.getPokemons();
    }
  },
  methods: {
    async handleStart() {
      await this.getPokemons();
      if(this.pokemons.length){
        this.$router.push({ name: 'pokemonSearch'});
      } 
    },
    async getPokemons() {
      try {
          this.loading = true;
          await this.$store.dispatch('LoadPokemons', `${this.$CONFIG.API_URL}?offset=0&limit=60'`);
        } finally {
          this.errorDetected = this.$store.state.error;
          this.loading = false; 
          this.pokemons = isProxy(this.$store.state.pokemons) ? toRaw(this.$store.state.pokemons) : this.$store.state.pokemons;        
        }      
    },
    setIsLoading(value) {
      this.loading = value;
    },
    setIsError(value) {
      this.errorDetected = value;
    }
  },
  components: {
    Loader
  },
  watch: {
    errorDetected(a,b){
      if(a){
        this.$router.push({ name: 'NotFound' });
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>