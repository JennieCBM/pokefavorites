<template>
    <div id="app">
      <transition name="fade">
        <div v-if="isModalVisible">
            <div
                @click="onToggle"
                class="absolute bg-black opacity-70 inset-0 z-0"
            >
            </div>
          <div class="absolute top-0 flex flex-col justify-center items-center w-full h-full">
              <div
                class="w-[80%] md:w-full max-w-lg  mx-auto my-auto rounded shadow-lg bg-white "
              >
                <div class="">
                  <div class="relative text-center flex-auto justify-center leading-6">
                    <div class="rounded-t bg-[url('/img/BgDetail.png')] bg-center flex justify-center items-center">
                        <img :src="data.image" alt="" class="w-48" @load="onImgLoad">
                        <button
                          @click="onToggle"
                          class="absolute top-3 right-3"
                        >
                          <img src="/icons/close.png" alt="close" class="w-4 h-4">
                        </button>
                    </div>
                </div>
                <div class="px-4 pt-4">
                    <div class="pb-2 pt-1 border-b">Name: {{ data?.name }}</div>
                    <div class="pb-2 pt-1 border-b">Weight: {{ data?.weight }}</div>
                    <div class="pb-2 pt-1 border-b">Height: {{ data?.height }}</div>
                    <div class="pb-2 pt-1 border-b">Type: {{ data?.types.join(", ") }}</div>
                </div>
                <div class="p-4 mt-2 space-x-4 flex justify-between items-center relative">
                    <button
                    class="btn-primary"
                    @click="copy"
                    ref="copy_input" 
                    >
                    Share to my friends
                    </button>
                    <div v-if="data.isFavorite">
                        <img src="/icons/active_star.png" alt="" class="w-6 h-6" />
                     </div>
                    <div class="absolute bottom-20 left-[40%]" v-show="showTooltip">
                      <div class="bubble bubble-bottom-left relative text-sm bg-gray-800 px-3 py-2 text-white text-center rounded-full">
                        Copied!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        data: Object,
        openModal: Boolean
    },
    data() {
      return {
        isOpen: false,
        showTooltip: false
      };
    }, 
    computed: {
      isModalVisible() {
        return this.isOpen;
      }
    }, 
    methods: {
      onToggle() {
        this.isOpen = !this.isOpen;
      },
      async copy() {
        let objToCopy = [
          `name: ${this.data.name}`,
          `weight: ${this.data.weight}`,
          `height: ${this.data.height}`,
          `types: ${this.data.types.join("/ ")}`
      ];
        objToCopy = objToCopy.join(',');
        
          try {
            await navigator.clipboard.writeText(objToCopy);
              this.showTooltip = true;
              const show = () => this.showTooltip = false;
              setTimeout(show, 3000);
              clearTimeout(show);
          } catch(e) {
              console.log(e)
          }
        }
    }
  };
  </script>
  <style>

  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 500ms ease-out;
  }
  .bubble {
    z-index: 1
}

.bubble-bottom-left:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: .5rem solid #1f2937;
  border-right: .5rem solid transparent;
  border-top: 1.5rem solid #1f2937;
  border-bottom: 1rem solid transparent;
  left: 1em;
  bottom: -1rem;
  z-index: -1;
}
  </style>