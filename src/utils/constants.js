const user = {
  userListTable: [
    {
      key: "user",
      label: "User Details",
      sortable: true,
      sortByFormatted: true,
      formatter: (value, key, item) => {
        return item.firstname + " " + item.lastname;
      },
    },
    {
      key: "taskCount",
      label: "Total Task",
      thClass: "text-center",
      tdClass: "text-center",
      sortable: true,
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
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      thClass: "text-center",
      tdClass: "text-center",
      sortable: true,
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
