<template>
  <v-dialog v-model="dialog" max-width="980px">
    <v-card>
      <v-card-title
        ><div class="title--text">Cơ sở vật chất</div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions
        class="pa-0"
        :class="{
          'd-flex': $vuetify.breakpoint.mdAndUp,
          'd-flex flex-column pb-8': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-card
          class="d-flex flex-column align-center elevation-0"
          :class="{
            'mb-4': $vuetify.breakpoint.smAndDown,
            'desktop-btn py-8': $vuetify.breakpoint.mdAndUp,
          }"
          @click="toggleFacilityADialog(true)"
        >
          <v-img
            src="@/assets/facility/facility1.svg"
            class="d-flex align-end"
            :width="getImgWidth"
            :class="{
              'pl-8': $vuetify.breakpoint.mdAndUp,
              'text-center': $vuetify.breakpoint.smAndDown,
            }"
          >
            <div
              :class="{
                'facility-subtitle': $vuetify.breakpoint.smAndUp,
                'text-h6': $vuetify.breakpoint.xsOnly,
              }"
            >
              Cơ sở A
            </div>
            <div
              :class="{
                'facility-title': $vuetify.breakpoint.smAndUp,
                'text-h5 font-weight-bold': $vuetify.breakpoint.xsOnly,
              }"
            >
              Nam Trung Yên
            </div>
          </v-img>
          <div v-if="$vuetify.breakpoint.smAndUp" class="btn-overlay"></div>
        </v-card>
        <v-card
          class="d-flex flex-column align-center elevation-0"
          :class="{ 'desktop-btn py-8': $vuetify.breakpoint.mdAndUp }"
          @click="toggleFacility1Dialog(true)"
        >
          <v-img
            src="@/assets/facility/facilityA.svg"
            :width="getImgWidth"
            class="d-flex align-end"
            :class="{
              'text-end pr-8': $vuetify.breakpoint.mdAndUp,
              'text-center': $vuetify.breakpoint.smAndDown,
            }"
          >
            <div
              :class="{
                'facility-subtitle': $vuetify.breakpoint.smAndUp,
                'text-h6': $vuetify.breakpoint.xsOnly,
              }"
            >
              Cơ sở 1
            </div>
            <div
              :class="{
                'facility-title': $vuetify.breakpoint.smAndUp,
                'text-h5 font-weight-bold': $vuetify.breakpoint.xsOnly,
              }"
            >
              Tân Triều
            </div>
          </v-img>
          <div v-if="$vuetify.breakpoint.smAndUp" class="btn-overlay"></div>
        </v-card>
      </v-card-actions>
    </v-card>
    <FacilityTour
      title="Cơ sở A Nam Trung Yên"
      :iframeSrc="`${$baseUrl}cs-2/index.html`"
      :state="facilityADialog"
      @closeDialog="toggleFacilityADialog"
    />
    <FacilityTour
      title="Cơ sở 1 Tân Triều"
      :iframeSrc="`${$baseUrl}ltv-360/index.html`"
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
    dialog(dialog) {
      if (!dialog) this.$emit("closeFacility", false);
    },
  },
  computed: {
    getImgWidth() {
      if (this.$vuetify.breakpoint.smOnly) return 350;
      if (this.$vuetify.breakpoint.xsOnly) return 225;
      return "100%";
    },
  },
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
.desktop-btn {
  width: 50%;
  position: relative;
}
.btn-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(62, 62, 60, 0) !important;
}
.btn-overlay:hover {
  background: rgb(62, 62, 60, 0.1) !important;
}
</style>
