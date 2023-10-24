import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue';
import NotFound from '../views/NotFound.vue';
import PokemonSearch from '../views/PokemonSearch.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Welcome
    },
    {
      path: '/PokemonSearch',
      name: 'pokemonSearch',
      component: PokemonSearch,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/not-found',
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound,
    },
    
  ]
})

export default router
