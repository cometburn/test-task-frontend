<template>
  <div class="mt-4">
    <b-row no-gutters>
      <b-col>
        <b-btn class="btn-transparent" variant="link" @click="onOpenModal">
          <span class="font-weight-bold">+ Add Task</span>
        </b-btn>
      </b-col>
    </b-row>
    <b-row no-gutters class="mt-2">
      <b-col>
        <task-list :headerText="'Incomplete'" :list="getIncompleteTasks" />
      </b-col>
    </b-row>
    <b-row no-gutters class="mt-4">
      <b-col>
        <task-list :headerText="'Completed'" :list="getCompletedTasks" />
      </b-col>
    </b-row>

    <NewTaskModal :task="objTask" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaskList from "../components/TaskList.vue";
import NewTaskModal from "../components/common/NewTaskModal";

export default {
  data() {
    return {
      timeOuts: [],
      objTask: {},
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async onSave() {
      await this.$store.dispatch("addTask", this.objTask);

      this.$bvModal.hide("new-task-modal");
    },
    onOpenModal() {
      this.objTask = {
        title: "New Task",
        task: "",
        desc: "",
        taskDate: "",
        taskTime: "",
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
