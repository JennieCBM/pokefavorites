<template>
    <div class="flex flex-col justify-center items-center">
      <div class="title mt-12">Uh-oh!</div>
      <div class="subtitle mt-6">You look lost on your journey!</div>
      <button class="btn-primary mt-6" @click="this.$router.push({ name: 'home' })">Go back home</button>
    </div>
  </template>
  
  <script>
  </script>