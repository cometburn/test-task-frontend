<template>
  <div class="mt-4">
    <b-row no-gutters>
      <b-col>
        <b-btn class="btn-transparent" variant="link" @click="onOpenModal">
          <span class="font-weight-bold">+ Check In</span>
        </b-btn>
      </b-col>
    </b-row>
    <b-row v-if="getCurrentCheckIn" no-gutters class="mt-2">
      <b-col>
        <section>
          <header class="font-weight-bold">Current Location</header>
          <b-row no-gutters>
            <b-col md="auto" class="mr-3">
              <b-img
                :src="require('@/assets/images/pin.png')"
                class="task-clock"
              />
            </b-col>
            <b-col>
              <div class="d-block">
                <span>{{ getCurrentCheckIn.location }}</span>
              </div>
              <span class="sub-text">
                {{ convertLat(getCurrentCheckIn.lat) }}
                {{ convertLong(getCurrentCheckIn.long) }}
              </span>
            </b-col>
          </b-row>
        </section>
      </b-col>
    </b-row>
    <b-row v-if="getPreviousCheckIns" no-gutters class="mt-4">
      <b-col>
        <section>
          <header class="font-weight-bold">Previous Location</header>
          <b-row no-gutters>
            <b-col>
              <b-list-group>
                <b-list-group-item
                  v-for="(item, index) in getPreviousCheckIns"
                  :key="index"
                >
                  <b-row no-gutters>
                    <b-col md="auto" class="mr-3">
                      <b-img
                        :src="require('@/assets/images/pin.png')"
                        class="task-clock"
                      />
                    </b-col>
                    <b-col>
                      <div class="d-block">
                        <span>{{ item.location }}</span>
                      </div>
                      <span class="sub-text">
                        {{ convertLat(item.lat) }} {{ convertLong(item.long) }}
                      </span>
                    </b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </section>
      </b-col>
    </b-row>

    <NewCheckInModal :checkin="objCheckIn" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import helper from "../utils/helper";
import NewCheckInModal from "../components/common/NewCheckInModal";

export default {
  data() {
    return {
      helper: helper,
      objCheckIn: {},
    };
  },
  mounted() {
    this.fetchCheckIns();
  },
  methods: {
    convertLat(coor) {
      return helper.convertLat(coor);
    },
    convertLong(coor) {
      return helper.convertLong(coor);
    },
    async onSave() {
      await this.$store.dispatch("addCheckIn", this.objCheckIn);

      this.$bvModal.hide("new-checkin-modal");
    },
    onOpenModal() {
      this.objCheckIn = {
        title: "Check In",
        location: "",
        lat: "",
        long: "",
        submit: this.onSave,
      };

      this.$bvModal.show("new-checkin-modal");
    },
    async fetchCheckIns() {
      await this.$store.dispatch("fetchCheckIns");
    },
  },
  computed: {
    ...mapGetters(["getCheckIns", "getCurrentCheckIn", "getPreviousCheckIns"]),
  },
  components: {
    NewCheckInModal,
  },
};
</script>

<style lang="scss" scoped>
.task-clock {
  height: 14px;
  width: 14px;
}

.sub-text {
  color: $lightgray;
  font-size: 14px;
}

.list-group {
  &-item {
    border: none;
    padding: 6px 0;
  }
}
</style>
