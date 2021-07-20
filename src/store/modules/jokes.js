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
      commit('setPreloader', true, { root: true });
      const apiUrl = `${rootGetters.getApiUrl}Any?amount=10&lang=en&type=single&format=json`;
      const response = await axios.get(apiUrl)
        .then((res) => {
          const dataJokes = res.data.jokes;
          commit('setJokes', dataJokes);
          commit('setLikes', JSON.parse(localStorage.getItem('likes')));
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
    async setLike({ getters, commit, dispatch }, id) {
      let likes = getters.getLikes;
      let del = false;
      if (likes) {
        const isLike = likes.indexOf(id);
        if (isLike !== -1) {
          del = true;
        }
        if (!del) {
          likes.push(id);
        } else {
          likes.splice(isLike, 1);
        }
      } else {
        likes = [id];
      }
      commit('setLikes', likes);
      await localStorage.setItem('likes', JSON.stringify(likes));
      if (!del) {
        await dispatch('setLikeJokes');
      } else {
        await dispatch('setLikeJokes', id);
      }
    },
    async setLikeJokes({ getters, state }, delId) {
      const likes = getters.getLikes;

      const jokes = getters.getJokes;
      if (likes && typeof delId !== 'number') {
        for (let i = 0; i < likes.length; i += 1) {
          for (let j = 0; j < jokes.length; j += 1) {
            const joke = jokes[j];
            if (joke.id === likes[i]) {
              jokes[j].like = true;
              state.jokes.splice(j, 1, jokes[j]);
            }
          }
        }
      } else if (typeof delId === 'number') {
        for (let j = 0; j < jokes.length; j += 1) {
          if (jokes[j].id === delId) {
            jokes[j].like = false;
            state.jokes.splice(j, 1, jokes[j]);
          }
        }
      }
    },
  },
};
