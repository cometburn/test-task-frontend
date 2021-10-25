<template>
  <b-modal id="new-checkin-modal" hide-footer>
    <template #modal-header>
      <h5 class="mb-0">{{ location.title }}</h5>
    </template>

    <template #default>
      <b-form class="mx-4" @submit.prevent.stop="onSubmit">
        <b-row class="no-gutters">
          <b-col md="auto" class="label-wrapper">
            <label for="input-title" class="mt-2">
              <i class="icon-pin" />
            </label>
          </b-col>
          <b-col>
            <b-form-input
              id="input-title"
              v-model="location.location"
              placeholder="Location"
              class="ml-2"
              required
            ></b-form-input>
            <div>
              <span>{{ latitude }}</span>
              <span class="ml-2">{{ longitude }}</span>
            </div>
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
        <b-row align-h="center">
          <b-col cols="12" md="10">
            <b-button
              size="lg"
              pill
              class="w-100 btn-transparent"
              @click="$bvModal.hide('new-checkin-modal')"
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
  props: ["checkin"],
  data() {
    return {
      helper: helper,
      isCoorLoaded: false,
      location: {},
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        Object.assign(this.location, {
          ...this.checkin,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });

        // fetch location names
        // from google geolocations

        this.isCoorLoaded = true;
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    );
  },
  methods: {
    onSubmit() {
      Object.assign(this.checkin, this.location);
      this.checkin.submit();
    },
    isValidInput(obj) {
      return obj.length > 0 ? true : false;
    },
  },
  computed: {
    latitude() {
      return !this.helper.isEmpty(this.location.lat) && this.isCoorLoaded
        ? this.helper.convertLat(this.location.lat)
        : "";
    },
    longitude() {
      return !this.helper.isEmpty(this.location.long) && this.isCoorLoaded
        ? this.helper.convertLong(this.location.long)
        : "";
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
