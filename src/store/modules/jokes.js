import axios from 'axios';

export default {
  namespaced: true,
  state: {
    search: '',
    jokes: [],
  },
  getters: {
    getJokes(state) {
      return state.jokes;
    },
    getSearch(state) {
      return state.search.toLowerCase();
    },
  },
  mutations: {
    setJokes(state, data) {
      state.jokes = data;
    },
    setSearch(state, data) {
      state.search = data;
    },
  },
  actions: {
    async getJokes(
      {
        commit,
        rootGetters,
      },
    ) {
      commit('setJokes', []);
      commit('setPreloader', true, { root: true });
      const apiUrl = `${rootGetters.getApiUrl}Any?amount=10&lang=en&type=single&format=json`;
      const response = await axios.get(apiUrl)
        .then((res) => {
          console.log(res.data);
          const dataQuotes = res.data.jokes;
          commit('setJokes', dataQuotes);
          return res.data;
        })
        .catch((error) => {
          console.log(error, 'error');
          return error;
        });
      commit('setPreloader', false, { root: true });
      return response;
    },
  },
};
