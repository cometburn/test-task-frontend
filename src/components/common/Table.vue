<template>
  <div>
    <b-table
      responsive
      hover
      fixed
      :items="list"
      :fields="fields"
      @row-clicked="rowClicked"
    >
      <!-- For User Tasks -->
      <template #cell(summary)="data">
        <span>{{ data.item.task }}</span>
        <p class="sub-text mb-0">{{ data.item.desc }}</p>
      </template>
      <template #cell(status)="data">
        {{ status(data.item.isCompleted) }}
      </template>
      <template #cell(dueDate)="data">
        <span>{{ extractDate(data.item.taskDate) }}</span>
        <p class="sub-text uppercase mb-0">
          {{ extractTime(`${data.item.taskDate} ${data.item.taskTime}`) }}
        </p>
      </template>
      <template #cell(actions)>
        <i class="icon-ellipsis" />
      </template>
      <!-- For User Locations -->
      <template #cell(location)="data">
        <span>{{ data.item.location }}</span>
      </template>
      <template #cell(coordinate)="data">
        <span class="mr-2">{{ convertLat(data.item.lat) }}</span>
        <span>{{ convertLong(data.item.long) }}</span>
      </template>
      <template #cell(checkin)="data">
        <span>{{ extractDate(data.item.createdAt) }}</span>
        <p class="sub-text uppercase mb-0">
          {{ extractTime(data.item.createdAt) }}
        </p>
      </template>
    </b-table>
  </div>
</template>

<script>
import helper from "../../utils/helper";
export default {
  props: ["list", "fields", "rowClicked"],
  data() {
    return {
      helper: helper,
    };
  },
  methods: {
    onUserDetails(item) {
      this.$router.push({ path: `/user/${item.id}`, params: item.id });
    },
    status(item) {
      return item ? "Completed" : "Incomplete";
    },
    convertLat(coor) {
      return helper.convertLat(coor);
    },
    convertLong(coor) {
      return helper.convertLong(coor);
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
