import Vue from 'vue';
import Vuex from 'vuex';

import jokes from './modules/jokes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api_url: process.env.VUE_APP_API_URL,
    preloader: false,
  },
  getters: {
    getPreloader(state) {
      return state.preloader;
    },
    getApiUrl(state) {
      return state.api_url;
    },
  },
  mutations: {
    setPreloader(state, status) {
      state.preloader = status;
    },
  },
  actions: {
  },
  modules: {
    jokes,
  },
});
