import axios from "axios";
import api from "@/utils/api";
import AxiosConfig from "@/utils/axiosConfig";

const state = {
  userList: [],
  userDetail: {},
  userTasks: [],
  userLocations: [],
};

const getters = {
  getUsers: (state) => {
    return state.userList;
  },
  getUserDetail: (state) => {
    return state.userDetail;
  },
  getUserTasks: (state) => {
    return state.userTasks;
  },
  getUserLocations: (state) => {
    return state.userLocations;
  },
};

const actions = {
  async fetchUsers({ commit }, payload) {
    await axios
      .get(api.apiUrl + "users", payload, AxiosConfig())
      .then((res) => {
        commit("setUsers", res.data);
        commit("setError", null);
      })
      .catch((err) => {
        console.log(err);
        commit("setError", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        });
        w;
      });
  },
  async fetchUserDetail({ commit }, payload) {
    await axios
      .get(api.apiUrl + "users/" + payload.id, AxiosConfig())
      .then((res) => {
        commit("setUserDetail", res.data);
        commit("setError", null);
      })
      .catch((err) => {
        console.log(err);
        commit("setError", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        });
      });
  },
  async fetchUserTasks({ commit }, payload) {
    await axios
      .get(api.apiUrl + `users/${payload.id}/tasks`, AxiosConfig())
      .then((res) => {
        commit("setUserTasks", res.data);
        commit("setError", null);
      })
      .catch((err) => {
        console.log(err);
        commit("setError", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        });
      });
  },
  async fetchUserLocations({ commit }, payload) {
    await axios
      .get(api.apiUrl + `users/${payload.id}/locations`, AxiosConfig())
      .then((res) => {
        commit("setUserLocations", res.data);
        commit("setError", null);
      })
      .catch((err) => {
        console.log(err);
        commit("setError", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        });
      });
  },
};

const mutations = {
  setUsers(state, data) {
    state.userList = data;
  },
  setUserDetail(state, data) {
    state.userDetail = data;
  },
  setUserTasks(state, data) {
    state.userTasks = data;
  },
  setUserLocations(state, data) {
    state.userLocations = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
