import axios from "axios";
import api from "@/utils/api";
import AxiosConfig from "@/utils/axiosConfig";
import eventbus from "@/utils/eventbus";
import helper from "@/utils/helper";

const state = {
  taskList: {
    completed: [],
    incomplete: [],
    forAlarm: [],
    timeOuts: [],
  },
};

const getters = {
  getForAlarmTasks: (state) => {
    return state.taskList.forAlarm;
  },
  getCompletedTasks: (state) => {
    return state.taskList.completed;
  },
  getIncompleteTasks: (state) => {
    return state.taskList.incomplete;
  },
};

const actions = {
  async fetchTasks({ commit }, user) {
    await axios
      .get(api.apiUrl + "tasks", user, AxiosConfig())
      .then((res) => {
        commit("setTasks", res.data);
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
  async addTask({ commit }, payload) {
    await axios
      .post(api.apiUrl + "tasks/add", payload, AxiosConfig())
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
  async updateTask({ commit }, payload) {
    await axios
      .put(api.apiUrl + "tasks/update/" + payload.id, payload, AxiosConfig())
      .then((res) => {
        console.log("payload.forEdit", payload.forEdit);
        commit(payload.forEdit ? "editTask" : "updateTask", res.data);
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
  async deleteTask({ commit }, payload) {
    await axios
      .delete(api.apiUrl + "tasks/delete/" + payload.id, payload, AxiosConfig())
      .then(() => {
        commit("deleteTask", payload);
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
  setTasks(state, data) {
    state.taskList.completed = data
      .filter((o) => o.isCompleted)
      .sort((a, b) => {
        return new Date(b.taskDate) - new Date(a.taskDate);
      });

    state.taskList.incomplete = data
      .filter((o) => !o.isCompleted)
      .sort((a, b) => {
        return new Date(b.taskDate) - new Date(a.taskDate);
      })
      .reverse();

    state.taskList.forAlarm = data.filter(
      (o) =>
        !o.isCompleted &&
        new Date(o.taskDate).toLocaleDateString() ===
          new Date().toLocaleDateString() &&
        helper.compareDateTimetoCurrent(new Date(`${o.taskDate} ${o.taskTime}`))
    );

    // clear previous timeouts
    for (let obj of state.taskList.timeOuts) {
      clearTimeout(obj);
    }

    for (let obj of state.taskList.forAlarm) {
      const objDate = new Date(`${obj.taskDate} ${obj.taskTime}`);
      const millsUntilTime = helper.getMillsUntilTime(objDate);

      state.taskList.timeOuts[obj.id] = setTimeout(() => {
        eventbus.$emit("evnt-toast", obj);
      }, millsUntilTime);
    }

    // timeouts creating undefined contents so filter it
    state.taskList.timeOuts = state.taskList.timeOuts.filter((element) => {
      return element !== undefined;
    });
  },
  addTask(state, data) {
    const objDate = new Date(`${data.taskDate} ${data.taskTime}`);
    const millsUntilTime = helper.getMillsUntilTime(objDate);

    state.taskList.incomplete.unshift(data);

    // check if task is today and > than current time
    // then add a timeout
    if (
      new Date(data.taskDate).toLocaleDateString() ===
        new Date().toLocaleDateString() &&
      helper.compareDateTimetoCurrent(objDate)
    ) {
      state.taskList.forAlarm.push(data);

      state.taskList.timeOuts[data.id] = setTimeout(() => {
        eventbus.$emit("evnt-toast", data);
      }, millsUntilTime);
    }
  },
  editTask(state, data) {
    console.log(data);
    const id = data.isCompleted ? "complete" : "incomplete";

    console.log("id", id);

    const idx = state.taskList[id].findIndex((o) => o.id === data.id);
    state.taskList[id].splice(idx, 1, data);
  },
  updateTask(state, data) {
    console.log(data.isCompleted);
    if (data.isCompleted) {
      const idx = state.taskList.incomplete.findIndex((o) => o.id === data.id);
      state.taskList.incomplete.splice(idx, 1);
      state.taskList.completed.unshift(data);
    } else {
      const idx = state.taskList.completed.findIndex((o) => o.id === data.id);
      state.taskList.completed.splice(idx, 1);
      state.taskList.incomplete.unshift(data);

      // add timeout
      const objDate = new Date(`${data.taskDate} ${data.taskTime}`);
      const millsUntilTime = helper.getMillsUntilTime(objDate);

      const forAlarm =
        new Date(data.taskDate).toLocaleDateString() ===
          new Date().toLocaleDateString() &&
        helper.compareDateTimetoCurrent(
          new Date(`${data.taskDate} ${data.taskTime}`)
        );

      // add timeout if time is today and
      // greater than current time
      if (millsUntilTime > 0 && forAlarm) {
        state.taskList.timeOuts[data.id] = setTimeout(() => {
          eventbus.$emit("evnt-toast", data);
        }, millsUntilTime);
      }
    }
  },
  deleteTask(state, data) {
    if (data.isCompleted) {
      let idx = state.taskList.completed.findIndex((o) => o.id === data.id);
      state.taskList.completed.splice(idx, 1);

      idx = state.taskList.forAlarm.findIndex((o) => o.id === data.id);
      state.taskList.forAlarm.splice(idx, 1);
    } else {
      const idx = state.taskList.incomplete.findIndex((o) => o.id === data.id);
      state.taskList.incomplete.splice(idx, 1);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
