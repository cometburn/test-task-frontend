import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.js";
import task from "./task.js";
import location from "./location.js";
import users from "./users.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    task,
    location,
    users,
  },
  state: {
    authenticated: false,
    error: null,
    user: {
      accessLevel: null,
      accessToken: null,
      id: null,
      isAdmin: null,
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return !!state.user.id;
    },
    isUserAdmin: (state) => {
      return state.user.isAdmin;
    },
    getError: (state) => {
      return state.error;
    },
  },
  actions: {
    removeError({ commit }) {
      commit("setError", null);
    },
  },
  mutations: {
    setError(state, data) {
      state.error = data;
    },
  },
});
