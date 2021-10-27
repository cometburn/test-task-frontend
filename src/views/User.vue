<template>
  <section class="mt-4">
    <header>
      <h5>Users</h5>
    </header>
    <b-row>
      <b-col class="text-right">
        <b-btn
          variant="link"
          size="sm"
          class="btn-transparent"
          @click="onOpenModal({})"
        >
          <i class="icon-cross"></i> Add User
        </b-btn>
        <b-btn variant="link" size="sm" class="btn-transparent">
          <i class="icon-cross"></i> Add Task
        </b-btn>
        <b-btn variant="link" size="sm" class="btn-transparent">
          <i class="icon-cross"></i> Add Location
        </b-btn>
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
            <UserList :list="getUsers" :onEdit="onOpenModal" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <NewUserModal :user="objUser" :onDelete="onDeleteUser" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import helper from "../utils/helper";
import UserList from "../components/UserList";
import NewUserModal from "../components/common/NewUserModal.vue";
export default {
  data() {
    return {
      helper: helper,
      objUser: {},
      isAddTask: null,
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async onDeleteUser(item) {
      await this.$store.dispatch("deleteUser", item);
      this.$bvModal.hide("new-user-modal");
    },
    async onSave() {
      await this.$store.dispatch(
        this.isAdd ? "addUser" : "updateUser",
        this.objUser
      );

      this.$bvModal.hide("new-user-modal");
    },
    onOpenModal(item) {
      if (!helper.isEmpty(item)) {
        this.isAdd = false;
        this.objUser = {
          ...item,
          forEdit: true,
          title: "Edit User",
        };
      } else {
        this.isAdd = true;
        this.objUser = {
          title: "New User",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          isAdmin: false,
        };
      }

      this.objUser = {
        ...this.objUser,
        submit: this.onSave,
      };

      this.$bvModal.show("new-user-modal");
    },
    async fetchTasks() {
      await this.$store.dispatch("fetchUsers");
    },
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  components: {
    UserList,
    NewUserModal,
  },
};
</script>

<style></style>
