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
        :class="{ 'pt-6': $vuetify.breakpoint.xsOnly }"
      >
        <div
          v-if="$vuetify.breakpoint.xsOnly"
          style="width: 100%"
          class="d-flex justify-end pr-5"
        >
          <GuestToolbar />
        </div>
        <v-row
          class="d-flex justify-center align-center mx-auto py-3"
          :class="{
            'tablet-container': $vuetify.breakpoint.smOnly,
            'desktop-container': $vuetify.breakpoint.mdAndUp,
          }"
          no-gutters
        >
          <v-card
            v-for="n in 6"
            :key="n"
            class="elevation-0 d-flex flex-column align-center py-3"
            :class="{
              'mobile-menu-blog': $vuetify.breakpoint.xsOnly,
              'tablet-menu-blog': $vuetify.breakpoint.smOnly,
              'desktop-menu-blog': $vuetify.breakpoint.mdAndUp,
            }"
            @click="getBtnEvent(n)"
          >
            <v-img
              :src="getImageSrc(n)"
              class="mx-auto"
              :class="{
                'desktop-img': $vuetify.breakpoint.mdAndUp,
                'mobile-img': $vuetify.breakpoint.smAndDown,
              }"
            ></v-img>
            <div class="justify-center menu-title mt-2">
              {{ menu[n - 1].title }}
            </div>
          </v-card>
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
  methods: {
    getImageSrc(n) {
      return this.menu[n - 1].src;
    },
    getBtnEvent(n) {
      switch (n - 1) {
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
    window: {
      width: 0,
      height: 0,
    },
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
  object-fit: contain;
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
.mobile-menu-blog {
  width: calc(100% / 2 - 12px * 2);
  max-width: 276px;
}
.tablet-menu-blog {
  width: calc(720px / 3 - 12px * 2);
}
.desktop-menu-blog {
  width: calc(700px / 2 - 12px * 2);
  max-width: 240px;
}
.tablet-container {
  max-width: 700px;
}
.desktop-container {
  width: 100%;
  max-width: 700px;
}
.mobile-img {
  width: 100px;
}
.desktop-img {
  width: 100px;
}
</style>
