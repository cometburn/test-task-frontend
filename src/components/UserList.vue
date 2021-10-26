<template>
  <div>
    <b-table
      responsive
      hover
      :items="list"
      :fields="fields"
      @row-clicked="onUserDetails"
    >
      <template #cell(user)="data">
        {{ data.item.firstname }} {{ data.item.lastname }}
      </template>
      <template #cell(taskCount)="data">
        {{ data.item.taskCount }}
      </template>
      <template #cell(lastUpdate)="data">
        <span class="d-block">
          {{ extractDate(data.item.updatedAt) }}
        </span>
        <span class="d-block uppercase sub-text">
          {{ extractTime(data.item.updatedAt) }}
        </span>
      </template>
      <template #cell(actions)>
        <i class="icon-ellipsis" />
      </template>
    </b-table>
  </div>
</template>

<script>
import constants from "../utils/constants";
export default {
  props: ["list"],
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
