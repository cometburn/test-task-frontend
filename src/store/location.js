import axios from "axios";
import api from "@/utils/api";
import AxiosConfig from "@/utils/axiosConfig";

const state = {
  checkInList: [],
};

const getters = {
  getCheckIns: (state) => {
    return state.checkInList;
  },
  getCurrentCheckIn: (state) => {
    return state.checkInList[0];
  },
  getPreviousCheckIns: (state) => {
    return state.checkInList.slice(1);
  },
};

const actions = {
  async fetchCheckIns({ commit }, user) {
    await axios
      .get(api.apiUrl + "checkins", user, AxiosConfig())
      .then((res) => {
        commit("setCheckIns", res.data);
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
  async addCheckIn({ commit }, payload) {
    await axios
      .post(api.apiUrl + "checkins/add", payload, AxiosConfig())
      .then((res) => {
        commit("addCheckIn", res.data);
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
  setCheckIns(state, data) {
    state.checkInList = data;
  },
  addCheckIn(state, data) {
    state.checkInList.unshift(data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
