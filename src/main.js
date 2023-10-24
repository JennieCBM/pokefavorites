import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store';
import './assets/tailwind.css';

const app = createApp(App).use(store).use(router);

axios.get('/config.json').then(response => {
  app.config.globalProperties.$CONFIG = response.data;
  app.mount('#app');
});