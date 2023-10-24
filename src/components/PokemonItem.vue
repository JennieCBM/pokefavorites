<template>
  <div class="flex justify-between items-center text-md rounded block w-full pl-10 pr-6 p-2.5 bg-white capitalize font-semibold mb-2 cursor-pointer hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.08)] hover:border" @click="handleItemClick">
    <span>
      {{ name }}
    </span>
    <div
      class="rounded-full bg-gray-200 p-1 cursor-pointer hover:drop-shadow-[0_0px_10px_rgba(0,0,0,0.08)]"
      @click="toggleFavorite"
    >
      <img src="/icons/active_star.png" alt="" class="w-5 h-5" v-if="isFavorite" />
      <img src="/icons/gray_star.png" alt="" class="w-5 h-5" v-else />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    favoritesIsSelected: Boolean
  },
  data() {
    return {
      tempFav: [],
      isFavorite: false,
    };
  },
  mounted() {
    this.getIfFavorite();
  },
  methods: {
    toggleFavorite(e) {
      e.stopPropagation()
      let tempArr = JSON.parse(localStorage.getItem('myFavorites'));
      if (JSON.parse(localStorage.getItem('myFavorites')).includes(this.name)){
        tempArr = tempArr.filter((item) => item !== this.name);
      }else{
        tempArr.push(this.name);
      }
      localStorage.setItem('myFavorites', JSON.stringify(tempArr));
      this.getIfFavorite();
    },
    getIfFavorite() {
      this.isFavorite = JSON.parse(localStorage.getItem('myFavorites')).includes(this.name);
    },
    handleItemClick() {
      this.$emit("pokemon-selected", {name: this.name, isFavorite: this.isFavorite});
    }
  },
  watch: {
    favoritesIsSelected(a,b){
      this.getIfFavorite();

    }
  }
};
</script>
