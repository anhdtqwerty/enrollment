<template>
  <v-dialog v-model="dialog" max-width="980px" persistent>
    <v-card>
      <v-card-title
        ><div class="title--text">Cơ sở vật chất</div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions
        :class="{
          'd-flex justify-space-around py-8 px-4': $vuetify.breakpoint.mdAndUp,
          'd-flex flex-column py-4': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-card
          class="d-flex flex-column align-center elevation-0"
          :class="{ 'mb-10': $vuetify.breakpoint.smAndDown }"
          @click="toggleFacilityADialog(true)"
        >
          <v-img
            src="@/assets/facility/facilityA.svg"
            width="450px"
            class="d-flex align-end"
            :class="{ 'text-center': $vuetify.breakpoint.smAndDown }"
          >
            <div class="facility-subtitle">Cơ sở A</div>
            <div class="facility-title">Nam Trung Yên</div>
          </v-img>
        </v-card>
        <v-card
          class="d-flex flex-column align-center elevation-0"
          @click="toggleFacility1Dialog(true)"
        >
          <v-img
            src="@/assets/facility/facility1.svg"
            width="450px"
            class="d-flex align-end"
            :class="{
              'text-end': $vuetify.breakpoint.mdAndUp,
              'text-center': $vuetify.breakpoint.smAndDown,
            }"
          >
            <div class="facility-subtitle">Cơ sở 1</div>
            <div class="facility-title">Tân Triều</div>
          </v-img>
        </v-card>
      </v-card-actions>
    </v-card>
    <FacilityTour
      title="Cơ sở A Nam Trung Yên"
      iframeSrc="https://d23d1hjjvbs4dk.cloudfront.net"
      :state="facilityADialog"
      @closeDialog="toggleFacilityADialog"
    />
    <FacilityTour
      title="Cơ sở 1 Tân Triều"
      iframeSrc="https://d5b3fkasxbwpk.cloudfront.net"
      :state="facility1Dialog"
      @closeDialog="toggleFacility1Dialog"
    />
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import FacilityTour from "./FacilityTour.vue";
export default {
  components: {
    FacilityTour,
  },
  props: {
    state: Boolean,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  computed: {},
  data() {
    return {
      dialog: false,
      facility1Dialog: false,
      facilityADialog: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("closeFacility", false);
    },
    toggleFacility1Dialog(data) {
      this.facility1Dialog = data;
    },
    toggleFacilityADialog(data) {
      this.facilityADialog = data;
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.facility-subtitle {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
}
.facility-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
}
</style>
