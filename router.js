import Home from '@/components/views/home/HomeComponent.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
    { path: '/' , component:  Home},
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});