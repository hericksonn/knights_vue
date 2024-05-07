import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from './plugins/vuetify';

createApp(App)
  .use(router)
  .use(Vuetify)
  .mount('#app');
