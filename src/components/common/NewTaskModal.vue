<template>
  <b-modal id="new-task-modal" size="lg" hide-footer>
    <template #modal-header>
      <h5 class="mb-0">{{ task.title }}</h5>
    </template>

    <template #default>
      <b-form
        class="mx-4"
        :validated="validated"
        @submit.prevent.stop="onSubmit"
      >
        <b-row class="no-gutters">
          <b-col md="auto" class="label-wrapper">
            <label for="input-title" class="mt-2">
              <i class="icon-summary" />
            </label>
          </b-col>
          <b-col>
            <b-form-input
              id="input-title"
              v-model="task.task"
              placeholder="Summary"
              class="ml-2"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <hr />
        <b-row class="no-gutters">
          <b-col md="auto" class="label-wrapper">
            <label for="input-title" class="mt-2">
              <i class="icon-desc" />
            </label>
          </b-col>
          <b-col>
            <b-form-textarea
              id="input-desc"
              v-model="task.desc"
              placeholder="Description"
              class="ml-2"
              required
            ></b-form-textarea>
            <!-- <b-form-invalid-feedback id="input-desc" class="ml-3 mt-0">
              Description required.
            </b-form-invalid-feedback> -->
          </b-col>
        </b-row>
        <hr />
        <b-row class="">
          <b-col>
            <b-form-datepicker
              id="date-picker"
              v-model="task.taskDate"
              today-button
              reset-button
              close-button
              locale="en"
              class="date-picker ml-n2"
              required
              :state="(canSubmit = isValidInput(task.taskDate))"
            ></b-form-datepicker>
            <!-- <b-form-invalid-feedback id="date-picker" class="ml-4 mt-0">
              Date required.
            </b-form-invalid-feedback> -->
          </b-col>
          <b-col>
            <b-form-timepicker
              id="time-picker"
              v-model="task.taskTime"
              locale="en"
              required
              :state="(canSubmit = isValidInput(task.taskTime))"
            ></b-form-timepicker>
            <!-- <b-form-invalid-feedback id="date-picker" class="ml-4 mt-0">
              Date required.
            </b-form-invalid-feedback> -->
          </b-col>
        </b-row>
        <hr />
        <b-row align-h="center" class="mt-4">
          <b-col cols="12" md="6">
            <b-button type="submit" size="lg" pill class="w-100 btn-black">
              Save
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="center" class="my-2">
          <b-col cols="12" md="6">
            <b-button
              size="lg"
              pill
              block
              variant="danger"
              @click="onDelete(task)"
            >
              Delete
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="12" md="6">
            <b-button
              size="lg"
              pill
              class="w-100 btn-transparent"
              @click="$bvModal.hide('new-task-modal')"
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
export default {
  props: {
    task: Object,
    onDelete: Function,
  },
  data() {
    return {
      test: "",
      validated: false,
      canSubmit: true,
    };
  },
  methods: {
    onSubmit() {
      this.validated = true;

      if (this.canSubmit) {
        this.task.submit();
      }
    },
    isValidInput(obj) {
      return obj.length > 0 ? true : false;
    },
  },
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
