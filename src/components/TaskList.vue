<template>
  <section>
    <header class="font-weight-bold">{{ headerText }}</header>
    <b-row no-gutters>
      <b-col>
        <b-list-group>
          <b-list-group-item v-for="(item, index) in list" :key="index">
            <b-row class="row-hover">
              <b-col md="auto">
                <div
                  :class="`${
                    item.isCompleted ? 'check checked' : 'check unchecked'
                  } `"
                ></div>
                <input
                  :id="`${headerText.toLowerCase()}-${index}`"
                  :name="`${headerText.toLowerCase()}-${index}`"
                  class="d-none"
                  type="checkbox"
                  :checked="item.isCompleted"
                  @change="
                    onUpdate({
                      ...item,
                      isCompleted: !item.isCompleted,
                    })
                  "
                />
              </b-col>
              <b-col class="p-0">
                <label
                  :for="`${headerText.toLowerCase()}-${index}`"
                  class="hover"
                >
                  <p class="mb-0">{{ item.task }}</p>
                  <b-img
                    :src="require('@/assets/images/clock.png')"
                    class="task-clock"
                  />
                  <span class="sub-text">
                    {{ convertDate(`${item.taskDate} ${item.taskTime}`) }}
                  </span>
                </label>
              </b-col>
              <b-col md="auto">
                <b-btn
                  variant="outline-success"
                  class="mt-2 mr-1"
                  @click="onEdit(item)"
                >
                  <i class="icon-pencil" />
                </b-btn>
                <b-btn
                  variant="outline-danger"
                  class="mt-2"
                  @click="onDelete(item)"
                >
                  <i class="icon-bin" />
                </b-btn>
              </b-col>
            </b-row>
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
    onEdit: Function,
    onUpdate: Function,
    onDelete: Function,
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
  }
}
</style>
