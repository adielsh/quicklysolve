import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "board" */ '../views/HomeView.vue'),
  },
  {
    path: '/myprofile',
    name: 'myprofile',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/MyProfile.vue'),
  },
  {
    path: '/FirstView',
    name: 'FirstView',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/FirstView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },

  {
    path: '/board',
    name: 'board',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "board" */ '../views/BoardView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = store.state.currentUser;
  // const currentUser = true;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('home');
  else if (requiresAuth && currentUser && !currentUser.type) {
    next('firstConfig');
  } else next();
});

export default router;
