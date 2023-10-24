<template>
    <div class="flex flex-col justify-center items-center relative mt-[15vh]">
      <img class="pr-6" src="/img/Ellipse.png" alt="">
      <img class="absolute bottom-0 " src="/img/Pikachu.png" alt="">
    </div>
    <div class="w-[50%] m-auto text-center mt-[5vh]">
      <div class="text-2xl font-semibold">Welcome to Pokédex</div>
      <div class="text-xl mt-[5vh]">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</div>
      <div>
        <button class="btn-primary mt-[5vh]" @click="()=>$emit('start')">Get started</button>
      </div>
    </div>
</template>
<script>
import Loader from '../components/extra/loader.vue';
import { defineComponent } from 'vue';
</script>

