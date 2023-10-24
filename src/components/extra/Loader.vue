<template>
    <div class="w-full h-screen bg-gray-200 flex flex-col justify-center items-center z-10">
        <div class="pb-2 font-semibold tracking-widest">
            Loading, please wait...
        </div>
        <div class="flex ">
            <div class="circle mx-1 w-12">
                <img src="/img/Loader.png" alt="" >
            </div>
            <div class="circle mx-1 w-12">
                <img src="/img/Loader.png" alt="" >
            </div>
            <div class="circle mx-1 w-12">
                <img src="/img/Loader.png" alt="" >
            </div>
        </div>        
    </div>
</template>
<script>
</script>
<style>
.circle {
  display: inline-block;
  animation-name: bounce;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
}
.circle:nth-child(1){
    animation-delay: 1s;
}
.circle:nth-child(2){
    animation-delay: 1.1s;
}
.circle:nth-child(3){
    animation-delay: 1.2s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(3rem);
  }
  60% {
    transform: translateY(0);
  }
  80%{
    transform: translateY(0);
  }
}

</style>
