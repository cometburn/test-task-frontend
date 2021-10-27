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
        commit("setError", {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        });
      });
  },
  async addUser({ commit }, payload) {
    await axios
      .post(api.apiUrl + "users/", payload, AxiosConfig())
      .then((res) => {
        commit("addTask", res.data);
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
  async updateUser({ commit }, payload) {
    await axios
      .put(api.apiUrl + "users/" + payload.id, payload, AxiosConfig())
      .then((res) => {
        commit("updateUser", res.data);
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
  async deleteUser({ commit }, payload) {
    await axios
      .delete(api.apiUrl + "users/" + payload.id, payload, AxiosConfig())
      .then(() => {
        commit("deleteUser", payload);
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
  addTask(state, data) {
    state.userList.push(data);
  },
  updateUser(state, data) {
    const idx = state.userList.findIndex((o) => o.id === data.id);
    state.userList.splice(idx, 1, data);
  },
  deleteUser(state, data) {
    const idx = state.userList.findIndex((o) => o.id === data.id);
    state.userList.splice(idx, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
