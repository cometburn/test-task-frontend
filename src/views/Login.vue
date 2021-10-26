<template>
  <b-row align-h="center">
    <b-col cols="12" md="3" class="d-flex align-items-center vh-100">
      <b-form ref="formLogin" @submit.stop.prevent="onSubmit">
        <b-row>
          <b-col cols="12">
            <h1 class="text-center mb-5">Log In</h1>
          </b-col>
          <b-col cols="12">
            <b-alert :show="hasError" variant="danger">
              {{ errorMsg }}
            </b-alert>
          </b-col>
          <b-col cols="12" class="mb-3">
            <b-form-input
              v-model="credentials.email"
              placeholder="Email"
              size="lg"
            ></b-form-input>
          </b-col>
          <b-col cols="12" class="mb-3">
            <b-form-input
              id="input-password"
              type="password"
              v-model="credentials.password"
              placeholder="Password"
              size="lg"
            >
              <b-icon-eye></b-icon-eye>
            </b-form-input>
          </b-col>
          <b-col cols="12">
            <b-button type="submit" size="lg" pill class="w-100 btn-black">
              Log In
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
import helper from "@/utils/helper";

export default {
  data() {
    return {
      helper: helper,
      credentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("authLogin", this.credentials);
      if (this.isAuthenticated) {
        this.$router.push({ path: this.isUserAdmin ? "/users" : "/task" });
      }
    },
    redirectUser() {
      const user = this.getUser;
      if (user.accessLevel >= 500) {
        this.$router.push({ path: "/admin" });
      } else {
        this.$router.push({
          path: !user.has_default_password ? "/user" : "/user/change-password",
        });
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  },
  computed: {
    ...mapGetters(["getError", "isAuthenticated", "isUserAdmin"]),
    hasError() {
      return !helper.isEmpty(this.getError);
    },
    errorMsg() {
      return !helper.isEmpty(this.getError) ? this.getError.statusText : null;
    },
  },
};
</script>
<style lang="scss">
.test {
}
</style>
