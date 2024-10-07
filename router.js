import NotFoundView from '@/components/NotFoundView.vue';
import AccessDeniedComponent from '@/components/views/AccessDenied.vue';
import DashboardComponent from '@/components/views/dashboard/Dashboard.vue';
import Home from '@/components/views/home/Home.vue';
import { store } from '@/store';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not found',
    component: NotFoundView
  },
  {
    path: '/access-denied',
    name: 'Access denied',
    component: AccessDeniedComponent
  }
];


export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  
  const publicPages = ['/', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.getters.userRole;
  const adminRole = 'ADMIN';
  
  if (authRequired && !isAuthenticated) {
    next('/');
  } else if (isAuthenticated && publicPages.includes(to.path)) {
    next('/dashboard');
  } else if (authRequired && !(userRole === adminRole) && to.path !== '/access-denied') {
    next('/access-denied');
  } else {
    next();
  }
});