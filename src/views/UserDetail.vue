<template>
  <section class="mt-4">
    <header>
      <h5>
        <i
          class="icon-arrow-left mr-2 hover"
          @click="$router.push('/users')"
        ></i>
        <span>{{ getName }}</span>
      </h5>
    </header>
    <b-row>
      <b-col class="text-right">
        <b-btn size="sm" class="btn-transparent"> + Add Task </b-btn>
        <b-btn size="sm" class="btn-transparent"> + Add Location </b-btn>
      </b-col>
    </b-row>
    <b-row no-gutters class="card">
      <b-col>
        <b-tabs content-class="mt-3">
          <b-tab title="All Tasks" active @click="onChangeTab('tasks')">
            <b-row>
              <b-col>
                <Table
                  :fields="setFields"
                  :list="getUserTasks"
                  :rowClicked="() => {}"
                />
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="All Locations" @click="onChangeTab('locations')">
            <b-row>
              <b-col>
                <Table
                  :fields="setFields"
                  :list="getUserLocations"
                  :rowClicked="onShowMap"
                />
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import helper from "../utils/helper";
import constants from "../utils/constants";
import Table from "../components/common/Table.vue";
export default {
  components: {
    Table,
  },
  data() {
    return {
      helper: helper,
      constants: constants,
      fields: [],
      isActiveTabTasks: true,
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    onShowMap(item) {
      window.open(
        `https://www.google.com/maps/place/${item.lat}+${item.long}/`,
        "_blank"
      );
    },
    async onSave() {
      await this.$store.dispatch("addTask", this.objTask);

      this.$bvModal.hide("new-task-modal");
    },
    onChangeTab(item) {
      this.isActiveTabTasks = item === "tasks" ? true : false;

      if (item === "tasks") this.fetchTasks();
      else this.fetchLocations();
    },
    async fetchTasks() {
      await this.$store.dispatch("fetchUserTasks", {
        id: this.$route.params.id,
      });
    },
    async fetchLocations() {
      await this.$store.dispatch("fetchUserLocations", {
        id: this.$route.params.id,
      });
    },
    async fetchUser() {
      await this.$store.dispatch("fetchUserDetail", {
        id: this.$route.params.id,
      });

      this.fetchTasks();
    },
  },
  computed: {
    ...mapGetters(["getUserDetail", "getUserTasks", "getUserLocations"]),
    getName() {
      return !helper.isEmpty(this.getUserDetail)
        ? `${this.getUserDetail.firstname} ${this.getUserDetail.lastname}`
        : "";
    },
    setFields() {
      return this.isActiveTabTasks
        ? this.constants.user.userTaskTable
        : this.constants.user.userLocationTable;
    },
  },
};
</script>

<style></style>
