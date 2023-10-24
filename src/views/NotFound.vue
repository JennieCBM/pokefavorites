<template>
    <div class="flex flex-col justify-center items-center h-screen">
      <div class="">
        <img src="/img/NotFound.png" alt="errorImage"/>
      </div>
        <div class="text-2xl bg-transparent font-bold">
            404 Not Found
        </div>
        <button class="btn-primary mt-12" @click="this.$router.push({ name: 'home' })">Go Home</button>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>

</style>