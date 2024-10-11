import NotFoundView from '@/components/views/NotFoundView.vue';
import AccessDeniedComponent from '@/components/views/AccessDenied.vue';
import DashboardComponent from '@/components/views/dashboard/Dashboard.vue';
import Home from '@/components/views/home/Home.vue';
import VoterView from '@/components/views/VoterView/VoterView.vue';
import axios from 'axios';
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
    path: '/voter-view',
    name: 'VoterView',
    component: VoterView
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

router.beforeEach(async(to, from, next) => {
  
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const token = sessionStorage.getItem('authToken');

  if (token) {
    try {

      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/validate-jwt`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const userRole = response.data.role;

      // Redirect to dashboard if user tries to access the login/home page but is authenticated
      if (to.path === '/' && userRole) {
        return next('/dashboard');
      }

      // Allow access to the dashboard only if the user has the 'ADMIN' role
      if (to.path === '/dashboard' && userRole !== 'ADMIN') {
        return next('/access-denied');
      }

      next(); // Allow access if everything is valid
    
    } catch (error) {
      sessionStorage.removeItem('authToken'); // Clear the token if validation fails
      return next('/'); // Redirect to home if token validation fails
    }
  } else if (!token && authRequired) {
    // Redirect to home if the user is not authenticated and trying to access a protected route
    return next('/');
  } else {
    // Allow access to public pages
    next();
  }

  
});