<template>
  <div class="mt-4">
    <b-row no-gutters>
      <b-col>
        <b-btn class="btn-transparent" variant="link" @click="onOpenModal({})">
          <span class="font-weight-bold">+ Add Task</span>
        </b-btn>
      </b-col>
    </b-row>
    <b-row v-if="getIncompleteTasks.length > 0" no-gutters class="mt-2">
      <b-col>
        <task-list
          :headerText="'Incomplete'"
          :list="getIncompleteTasks"
          :onUpdate="onUpdateTask"
          :onDelete="onDeleteTask"
          :onEdit="onOpenModal"
        />
      </b-col>
    </b-row>
    <b-row v-if="getCompletedTasks.length > 0" no-gutters class="mt-4">
      <b-col>
        <task-list
          :headerText="'Completed'"
          :list="getCompletedTasks"
          :onUpdate="onUpdateTask"
          :onEdit="onOpenModal"
        />
      </b-col>
    </b-row>

    <NewTaskModal :task="objTask" :onDelete="onDeleteTask" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import helper from "../utils/helper";
import TaskList from "../components/TaskList.vue";
import NewTaskModal from "../components/common/NewTaskModal";

export default {
  data() {
    return {
      helper: helper,
      timeOuts: [],
      objTask: {},
      isAddTask: null,
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async onUpdateTask(item) {
      await this.$store.dispatch("updateTask", item);
    },
    async onDeleteTask(item) {
      await this.$store.dispatch("deleteTask", item);
      this.$bvModal.hide("new-task-modal");
    },
    async onSave() {
      await this.$store.dispatch(
        this.isAdd ? "addTask" : "updateTask",
        this.objTask
      );

      this.$bvModal.hide("new-task-modal");
    },
    onOpenModal(item) {
      if (!helper.isEmpty(item)) {
        this.isAdd = false;
        this.objTask = {
          ...item,
          forEdit: true,
        };
      } else {
        this.isAdd = true;
        this.objTask = {
          title: "New Task",
          task: "",
          desc: "",
          taskDate: "",
          taskTime: "",
        };
      }

      this.objTask = {
        ...this.objTask,
        submit: this.onSave,
      };

      this.$bvModal.show("new-task-modal");
    },
    async fetchTasks() {
      await this.$store.dispatch("fetchTasks");
    },
  },
  computed: {
    ...mapGetters(["getCompletedTasks", "getIncompleteTasks"]),
  },
  components: {
    TaskList,
    NewTaskModal,
  },
};
</script>

<style></style>
