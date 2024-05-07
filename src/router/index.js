import { createRouter, createWebHistory } from 'vue-router';
import KnightsList from '../components/KnightsList.vue';
import KnightForm from '../components/KnightForm.vue';
import KnightsFilter from '../components/KnightsFilter.vue';

const routes = [
  { path: '/', component: KnightsList },
  { path: '/add-knight', component: KnightForm },
  { path: '/edit-knight/:id', component: KnightForm },
  { path: '/filter-knights', component: KnightsFilter }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
