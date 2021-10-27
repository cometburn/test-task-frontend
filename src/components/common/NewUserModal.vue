<template>
  <b-modal id="new-user-modal" hide-footer>
    <template #modal-header>
      <h5 class="mb-0">{{ user.title }}</h5>
    </template>

    <template #default>
      <b-form class="mx-4" @submit.prevent.stop="onSubmit">
        <b-row class="no-gutters">
          <b-col md="auto" class="label-wrapper">
            <label for="input-title" class="mt-2">
              <i class="icon-user1" />
            </label>
          </b-col>
          <b-col>
            <b-form-input
              id="input-firstname"
              v-model="user.firstname"
              placeholder="Firstname"
              class="ml-2"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <hr />
        <b-row class="no-gutters">
          <b-col md="auto" class="label-wrapper">
            <label for="input-title" class="mt-2">
              <i class="icon-user1" />
            </label>
          </b-col>
          <b-col>
            <b-form-input
              id="input-lastname"
              v-model="user.lastname"
              placeholder="Lastname"
              class="ml-2"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <hr />
        <b-row class="no-gutters">
          <b-col md="auto" class="label-wrapper">
            <label for="input-title" class="mt-2">
              <i class="icon-envelop" />
            </label>
          </b-col>
          <b-col>
            <b-form-input
              id="input-email"
              v-model="user.email"
              placeholder="Email"
              class="ml-2"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <hr />
        <b-row class="no-gutters">
          <b-col md="auto" class="label-wrapper">
            <label for="input-title" class="mt-2">
              <i class="icon-key" />
            </label>
          </b-col>
          <b-col>
            <b-form-input
              id="input-password"
              v-model="user.password"
              placeholder="Password"
              class="ml-2"
              required
              type="password"
            ></b-form-input>
          </b-col>
        </b-row>
        <hr />
        <b-row class="no-gutters">
          <b-col>
            <b-form-checkbox
              id="input-admin"
              v-model="user.isAdmin"
              :unchecked-value="user.isCompleted"
              :checked="user.isCompleted"
            >
              <span class="ml-3"> Administrator</span>
            </b-form-checkbox>
          </b-col>
        </b-row>
        <hr />
        <b-row align-h="center" class="mt-4">
          <b-col cols="12" md="10">
            <b-button type="submit" size="lg" pill class="w-100 btn-black">
              Save
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="center" class="my-2">
          <b-col cols="12" md="10">
            <b-button
              size="lg"
              pill
              block
              variant="danger"
              @click="onDelete(user)"
            >
              Delete
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="12" md="10">
            <b-button
              size="lg"
              pill
              class="w-100 btn-transparent"
              @click="$bvModal.hide('new-user-modal')"
            >
              Cancel
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </template>
  </b-modal>
</template>

<script>
import helper from "../../utils/helper";
export default {
  props: {
    user: Object,
    onDelete: Function,
  },
  data() {
    return {
      helper: helper,
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.validated = true;

      this.user.submit();
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.label-wrapper {
  label {
    margin-bottom: 0;
    i {
      font-size: 20px;
    }
  }
}

.form-control {
  border-radius: 0;
  border: none;
  &:hover,
  &:focus,
  &.active {
    outline: none;
    box-shadow: none;
  }
}
</style>
