import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentUser : null,
    isLogin : false
  },
  getters: {
  },
  mutations: {
    SET_LOGGEDIN(state,currentUser){
      state.currentUser = currentUser
      state.isLogin = !!currentUser;
   },
  },
  actions: {
  },
  modules: {
  }
})
