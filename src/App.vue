<template>
  <div id="app" :class="`${isUserAdmin ? 'app-admin' : ''}`">
    <b-container fluid :class="isAuthenticated ? 'authenticated' : ''">
      <b-row no-gutters>
        <b-col
          v-if="isAuthenticated"
          md="auto"
          :class="`${
            isUserAdmin ? 'sidebar-wrapper-admin' : 'sidebar-wrapper'
          }`"
        >
          <side-bar />
        </b-col>
        <b-col
          :class="
            isAuthenticated && isUserAdmin
              ? 'main-wrapper-admin ml-4'
              : 'main-wrapper ml-4'
          "
        >
          <main>
            <router-view />
          </main>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SideBar from "./components/common/SideBar";
export default {
  components: {
    SideBar,
  },
  data() {
    return {
      lastToastId: null,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isUserAdmin"]),
  },
  async mounted() {
    this.$bus.$on("evnt-toast", (obj) => {
      // filter creation of toast with same id
      if (this.lastToastId !== obj.id && this.$route.path !== "/") {
        this.createToast(obj);
        this.lastToastId = obj.id;
      }
    });
  },
  methods: {
    createToast(obj) {
      const h = this.$createElement;

      const vNodesTitle = h("b-row", { class: "no-gutters" }, [
        h("b-col", { class: "toast-content" }, [
          h("h6", { class: "font-weight-bold mb-0" }, obj.task),
          h("p", { class: "detail mb-0" }, obj.desc),
        ]),
        h(
          "b-col",
          {
            class: {
              "col-md-auto mt-2": true,
            },
          },
          [h("div", { class: "toast-icon" }, [h("i", { class: "icon-clock" })])]
        ),
      ]);

      let footer = h(
        "div",
        { class: ["toast-footer", "d-block", "text-right"] },
        [
          h("button", {
            type: "button",
            class: {
              btn: true,
              "btn-transparent": true,
              "btn-link": true,
              "btn-sm": true,
            },
            attrs: {
              id: "foo",
            },
            domProps: {
              innerHTML: "Skip",
            },
            on: {
              click: () => this.onCompleteTask(obj),
            },
          }),
          h("button", {
            type: "button",
            class: {
              btn: true,
              "btn-transparent": true,
              "btn-link": true,
              "btn-sm": true,
            },
            attrs: {
              id: "foo",
            },
            domProps: {
              innerHTML: "Remind Me Later",
            },
            on: {
              click: () => this.onRemindLater(obj),
            },
          }),
        ]
      );

      this.$bvToast.toast([footer], {
        id: `toast-${obj.id}`,
        title: [vNodesTitle],
        noCloseButton: true,
        noAutoHide: true,
      });
    },
    async onCompleteTask(obj) {
      const payload = {
        ...obj,
        isCompleted: true,
      };
      await this.$store.dispatch("updateTask", payload);

      this.lastToastId = null;
      this.$bvToast.hide(`toast-${obj.id}`);
    },
    async onRemindLater(obj) {
      const d1 = new Date(`${obj.taskDate} ${obj.taskTime}`);
      const d2 = new Date(d1);
      d2.setMinutes(d1.getMinutes() + 1);

      const payload = {
        ...obj,
        isCompleted: null,
        taskDate: d2.toLocaleDateString("fr-CA"),
        taskTime: d2.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      await this.$store.dispatch("updateTask", payload);

      this.lastToastId = null;
      this.$bvToast.hide(`toast-${obj.id}`);
    },
  },
};
</script>
<style lang="scss"></style>
