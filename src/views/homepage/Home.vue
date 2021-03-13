<template>
  <v-container class="overflow-auto pa-0" fluid fill-height>
    <v-row class="d-flex align-center" no-gutters>
      <v-col xs="12" sm="12" md="6" v-if="$vuetify.breakpoint.mdAndUp">
        <v-img src="@/assets/homepage/home-bg.svg" class="bg-image"></v-img>
      </v-col>
      <v-col
        xs="12"
        sm="12"
        md="6"
        :class="{ 'mt-6 mb-4': $vuetify.breakpoint.smAndDown }"
      >
        <div
          v-if="$vuetify.breakpoint.smAndDown"
          style="width: 100%"
          class="d-flex justify-end pr-5"
        >
          <GuestToolbar />
        </div>
        <v-row
          v-for="n in 3"
          :key="n"
          class="justify-space-around"
          :class="{ 'mt-6': $vuetify.breakpoint.smAndDown }"
          no-gutters
        >
          <v-col
            xs="0"
            sm="0"
            md="2"
            v-if="$vuetify.breakpoint.mdAndUp"
          ></v-col>
          <v-col class="d-flex justify-center" xs="12" sm="12" md="4">
            <v-card class="elevation-0" @click="getBtnEvent(n, 0)">
              <v-img
                :src="getImageSrc(n, 0)"
                class="mx-auto"
                :width="getImgHeight"
              ></v-img>
              <v-card-title class="justify-center menu-title">{{
                menu[(n - 1) * 2].title
              }}</v-card-title>
            </v-card>
          </v-col>
          <v-col class="d-flex justify-center" xs="12" sm="12" md="4">
            <v-card class="elevation-0" @click="getBtnEvent(n, 1)">
              <v-img
                :src="getImageSrc(n, 1)"
                class="mx-auto"
                :width="getImgHeight"
              ></v-img>
              <v-card-title class="justify-center menu-title">{{
                menu[(n - 1) * 2 + 1].title
              }}</v-card-title>
            </v-card>
          </v-col>
          <v-col
            xs="0"
            sm="0"
            md="2"
            v-if="$vuetify.breakpoint.mdAndUp"
          ></v-col>
        </v-row>
        <div v-if="$vuetify.breakpoint.mdAndUp" style="height: 52px"></div>
        <Footer />
      </v-col>
      <v-col xs="12" sm="12" md="6" v-if="$vuetify.breakpoint.smAndDown">
        <v-img src="@/assets/homepage/home-bg.svg"></v-img>
      </v-col>
    </v-row>
    <EnrollDialog :state="enrollDialog" @closeEnroll="toggleEnrollDialog" />
    <FacilityDialog
      :state="facilityDialog"
      @closeFacility="toggleFacilityDialog"
    />
  </v-container>
</template>

<script>
import GuestToolbar from "@/components/layout/GuestToolbar.vue";
import Footer from "./Footer.vue";
import EnrollDialog from "@/views/enroll/EnrollDialog.vue";
import FacilityDialog from "@/views/facility/FacilityDialog.vue";
export default {
  components: {
    GuestToolbar,
    Footer,
    EnrollDialog,
    FacilityDialog,
  },
  name: "Home",
  computed: {
    getImgHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return "150px";
      else return "100px";
    },
  },
  methods: {
    getImageSrc(n, index) {
      return this.menu[(n - 1) * 2 + index].src;
    },
    getBtnEvent(n, index) {
      switch ((n - 1) * 2 + index) {
        case 0:
          this.enrollDialog = true;
          break;
        case 4:
          this.facilityDialog = true;
          break;
        default:
          break;
      }
    },
    toggleEnrollDialog(data) {
      this.enrollDialog = data;
    },
    toggleFacilityDialog(data) {
      this.facilityDialog = data;
    },
  },
  data: () => ({
    enrollDialog: false,
    facilityDialog: false,
    menu: [
      {
        title: "Thông tin tuyển sinh",
        src: require("@/assets/homepage/Group-5.svg"),
      },
      {
        title: "Quản lý hồ sơ",
        src: require("@/assets/homepage/Group-2.svg"),
      },
      {
        title: "Giới thiệu chung",
        src: require("@/assets/homepage/Group-4.svg"),
      },
      {
        title: "Cơ cấu HĐQT",
        src: require("@/assets/homepage/Group-1.svg"),
      },
      {
        title: "Cơ sở vật chất",
        src: require("@/assets/homepage/Group-6.svg"),
      },
      {
        title: "Hoạt động từ thiện",
        src: require("@/assets/homepage/Group-3.svg"),
      },
    ],
  }),
};
</script>

<style scoped>
.bg-image {
  position: absolute;
  object-fit: cover;
  width: 50%;
  height: 100%;
  top: 0px;
}
.menu-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
}
</style>
