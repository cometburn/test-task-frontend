const user = {
  userListTable: [
    {
      key: "user",
      label: "User Details",
      class: "channel-title",
    },
    {
      key: "taskCount",
      label: "Total Task",
      thClass: "text-center",
      tdClass: "text-center",
    },
    {
      key: "lastUpdate",
      label: "Last Update",
    },
    {
      key: "actions",
      label: "",
      tdClass: "text-right v-align-center",
    },
  ],
  userTaskTable: [
    {
      key: "summary",
      label: "Task summary",
      class: "channel-title",
    },
    {
      key: "status",
      label: "Status",
      thClass: "text-center",
      tdClass: "text-center",
    },
    {
      key: "dueDate",
      label: "Due date",
    },
    {
      key: "actions",
      label: "",
      tdClass: "text-right v-align-center",
    },
  ],
  userLocationTable: [
    {
      key: "location",
      label: "Location",
      class: "channel-title",
    },
    {
      key: "coordinate",
      label: "Coordinate",
      thClass: "text-center",
      tdClass: "text-center",
    },
    {
      key: "checkin",
      label: "Check in date",
    },
    {
      key: "actions",
      label: "",
      tdClass: "text-right v-align-center",
    },
  ],
};

module.exports = {
  user,
};
