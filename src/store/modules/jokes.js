import axios from 'axios';

export default {
  namespaced: true,
  state: {
    search: '',
    jokes: [],
    likes: null,
  },
  getters: {
    getJokes(state) {
      return state.jokes;
    },
    getSearch(state) {
      return state.search.toLowerCase();
    },
    getLikes(state) {
      if (state.likes) {
        return JSON.parse(state.likes);
      }
      return state.likes;
    },
  },
  mutations: {
    setJokes(state, data) {
      state.jokes = data;
    },
    setSearch(state, data) {
      state.search = data;
    },
    setLikes(state, data) {
      state.likes = data;
    },
  },
  actions: {
    async getJokes(
      {
        commit,
        rootGetters,
        dispatch,
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
          dispatch('getLikes');
          dispatch('setLikeJokes');
          return res.data;
        })
        .catch((error) => {
          console.log(error, 'error');
          return error;
        });
      commit('setPreloader', false, { root: true });
      return response;
    },
    getLikes({ commit, getters }) {
      commit('setLikes', localStorage.getItem('likes'));
      return getters.getLikes;
    },
    async setLike({ dispatch }, id) {
      let likes = await dispatch('getLikes');
      console.log(likes, 'likes');
      if (likes) {
        likes.push(id);
      } else {
        likes = [id];
      }
      await localStorage.setItem('likes', JSON.stringify(likes));
      await dispatch('getLikes');
      await dispatch('setLikeJokes');
    },
    setLikeJokes({ getters, commit }) {
      const jokes = getters.getJokes;
      const likes = getters.getLikes;

      if (likes) {
        for (let i = 0; i < likes.length; i += 1) {
          for (let j = 0; j < jokes.length; j += 1) {
            const joke = jokes[j];
            if (joke.id === likes[i]) {
              joke.like = true;
            }
          }
          // console.log(i, 'i', jokes);
        }
      }
      commit('setJokes', jokes);
      console.log(jokes, getters.getJokes, 'geets');
      console.log(jokes, likes, 'kpo');
    },
  },
};
