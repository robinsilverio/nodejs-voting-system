import NotFoundView from '@/components/views/NotFoundView.vue';
import AccessDeniedComponent from '@/components/views/AccessDenied.vue';
import DashboardComponent from '@/components/views/dashboard/Dashboard.vue';
import Home from '@/components/views/home/Home.vue';
import VoterView from '@/components/views/VoterView/VoterView.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import AvailableElections from '@/components/views/VoterView/related-components/AvailableElections.vue';
import Election from '@/components/views/VoterView/related-components/Election.vue';

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
    component: VoterView,
    children: [
      {
        path: 'available-elections',
        name: 'available-elections',
        component: AvailableElections
      },
      {
        path: 'election/:id',
        name: 'election',
        component: Election,
        props: true  // Passes the `id` parameter as a prop
      }
    ]
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

const pathByRole = {
  'ADMIN':  '/dashboard',
  'VOTER': '/voter-view/available-elections',
}


export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async(to, from, next) => {
  
  const publicPages = ['/'];
  const rolesAllowed = ['ADMIN', 'VOTER'];
  const authRequired = !publicPages.includes(to.path);
  const token = sessionStorage.getItem('authToken');

  if (token) {
    try {

      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/validate-jwt`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const userRole = response.data.role;

      // Redirect to dashboard if user tries to access the login/home page but is authenticated.
      if (to.path === '/' && rolesAllowed.includes(userRole)) {
        return next(pathByRole[userRole]);
      }
      if (to.path === '/dashboard' && userRole !== 'ADMIN') {
        return next('/access-denied');
      }
      if (to.path.startsWith('/voter-view') && userRole !== 'VOTER') {
        return next('/access-denied');
      }

      next(); // Allow access if everything is valid
    
    } catch (error) {
      sessionStorage.removeItem('authToken'); // Clear the token if validation fails
      return next('/'); // Redirect to home if token validation fails
    }
  } else {
    // Allow access to public pages
    next();
  }

  
});