import Vue from 'vue';
import VueRouter from 'vue-router';
import TheJokesList from '../components/TheJokesList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'JokesList',
    component: TheJokesList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
