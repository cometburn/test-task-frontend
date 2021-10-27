<template>
  <div>
    <b-table
      responsive
      hover
      sort-icon-left
      :items="list"
      :fields="fields"
      @row-clicked="onUserDetails"
    >
      <template #cell(user)="data">
        {{ data.item.firstname }} {{ data.item.lastname }}
      </template>
      <template #cell(taskCount)="data">
        {{ data.item.taskCount ? data.item.taskCount : 0 }}
      </template>
      <template #cell(lastUpdate)="data">
        <span class="d-block">
          {{ extractDate(data.item.updatedAt) }}
        </span>
        <span class="d-block uppercase sub-text">
          {{ extractTime(data.item.updatedAt) }}
        </span>
      </template>
      <template #cell(actions)="data">
        <b-btn
          variant="link"
          class="btn-transparent"
          @click="onEdit(data.item)"
        >
          <i class="icon-ellipsis" />
        </b-btn>
      </template>
    </b-table>
  </div>
</template>

<script>
import constants from "../utils/constants";
export default {
  props: {
    list: Array,
    onEdit: Function,
    onUpdate: Function,
    onDelete: Function,
  },
  data() {
    return {
      fields: constants.user.userListTable,
    };
  },
  methods: {
    onUserDetails(item) {
      this.$router.push({ path: `/user/${item.id}`, params: item.id });
    },
    extractDate(date) {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    extractTime(date) {
      return new Date(date).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
};
</script>

<style></style>
