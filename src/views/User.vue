<template>
  <section class="mt-4">
    <header>
      <h5>Users</h5>
    </header>
    <b-row>
      <b-col class="text-right">
        <b-btn size="sm" class="btn-transparent"> + Add Task </b-btn>
        <b-btn size="sm" class="btn-transparent"> + Add Location </b-btn>
      </b-col>
    </b-row>
    <b-row no-gutters class="card">
      <b-col>
        <b-row>
          <b-col>
            <h6 class="m-4">All Users</h6>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <UserList :list="getUsers" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import UserList from "../components/UserList";
export default {
  components: {
    UserList,
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async onSave() {
      await this.$store.dispatch("addTask", this.objTask);

      this.$bvModal.hide("new-task-modal");
    },
    async fetchTasks() {
      await this.$store.dispatch("fetchUsers");
    },
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
};
</script>

<style></style>
