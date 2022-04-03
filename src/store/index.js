import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentUser: null,
    isLogin: false,
    appTitle: 'qs',
    tags: [],
  },
  getters: {},
  mutations: {
    SET_TAG(state, tag) {
      state.tags.push(tag);
    },
    SET_LOGGEDIN(state, currentUser) {
      state.currentUser = currentUser;
      state.isLogin = !!currentUser;
    },
  },
  actions: {},
  modules: {},
});
