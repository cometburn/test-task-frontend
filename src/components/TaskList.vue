<template>
  <section>
    <header class="font-weight-bold">{{ headerText }}</header>
    <b-row no-gutters>
      <b-col>
        <b-list-group>
          <b-list-group-item v-for="(item, index) in list" :key="index">
            <b-form-checkbox
              :id="`${headerText.toLowerCase()}-${index}`"
              :name="`${headerText.toLowerCase()}-${index}`"
              :unchecked-value="item.isCompleted"
              :checked="item.isCompleted"
              disabled
            >
              {{ item.task }}
            </b-form-checkbox>

            <div class="ml-4">
              <b-img
                :src="require('@/assets/images/clock.png')"
                class="task-clock"
              />
              <span class="sub-text">
                {{ convertDate(`${item.taskDate} ${item.taskTime}`) }}
              </span>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import helper from "../utils/helper";
export default {
  props: {
    headerText: String,
    list: Array,
  },
  data() {
    return {
      helper: helper,
    };
  },
  methods: {
    convertDate(date) {
      return helper.formatTaskDate(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  &-item {
    border: none;
    padding: 6px 0;

    .task-clock {
      height: 14px;
      width: 14px;
    }

    .sub-text {
      color: $lightgray;
      font-size: 14px;
    }
  }
}
</style>
