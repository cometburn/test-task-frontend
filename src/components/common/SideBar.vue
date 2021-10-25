<template>
  <div class="nav-wrapper vh-100">
    <b-nav v-if="!isUserAdmin" vertical class="mt-4">
      <b-nav-item :active="isActiveLink('/task')" @click="gotoUrl('/task')">
        <i class="icon-task mx-3"></i>
        Task
      </b-nav-item>
      <b-nav-item
        :active="isActiveLink('/location')"
        @click="gotoUrl('/location')"
      >
        <i class="icon-pin mx-3"></i>
        Location
      </b-nav-item>
      <b-nav-item @click="onLogout">
        <i class="icon-logout mx-3"></i>
        Logout
      </b-nav-item>
    </b-nav>
    <b-nav v-else vertical class="mt-4">
      <div class="text-center text-secondary">
        <h5>Admin Panel</h5>
      </div>
      <b-nav-item
        :active="isActiveLink('/overview')"
        @click="gotoUrl('/overview')"
      >
        <i class="icon-task mx-3"></i>
        Overview
      </b-nav-item>
      <b-nav-item :active="isActiveLink('/users')" @click="gotoUrl('/users')">
        <i class="icon-task mx-3"></i>
        Users
      </b-nav-item>
      <b-nav-item @click="onLogout" class="text-white">
        <i class="icon-logout mx-3"></i>
        Logout
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    gotoUrl(url) {
      if (url !== this.$route.path) this.$router.push({ path: url });
    },
    isActiveLink(url) {
      return url === this.$route.path ? true : false;
    },
    onLogout() {
      this.$store.dispatch("authLogout");
      if (!this.isAuthenticated) {
        this.$router.push({ path: "/" });
      }
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isUserAdmin"]),
  },
};
</script>

<style lang="scss" scoped></style>
