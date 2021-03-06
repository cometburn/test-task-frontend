import axios from "axios";
// import Cookies from "js-cookie";
import api from "@/utils/api";

const state = {};

const getters = {};

const actions = {
  async authLogin({ commit }, user) {
    await axios
      .post(api.apiUrl + "auth", user, {
        // Also important to set both options
        credentials: "include",
        mode: "cors",
      })
      .then((res) => {
        commit("setAuth", res.data);
        commit("setError", null);
      })
      .catch((err) => {
        commit("setError", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        });
      });
  },
  authLogout({ commit }) {
    commit("setAuth", false);
    commit("setError", null);
  },
};

const mutations = {
  setAuth(state, data) {
    this.state.user = data;

    // Cookies.set("test_task", data.refreshToken);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
