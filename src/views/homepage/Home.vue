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
          v-if="
            ($vuetify.breakpoint.xsOnly &&
              systemTime.checkSystemTime['open-document']) ||
              ($vuetify.breakpoint.xsOnly && isDevelopmentBuild)
          "
          style="width: 100%"
          class="d-flex justify-end pr-5"
        >
          <GuestToolbar
            v-if="isGuestBar"
            :isOpen="
              systemTime.checkSystemTime['open-document'] || isDevelopmentBuild
            "
          />
          <UserToolbar
            v-if="!isGuestBar"
            :isOpen="
              systemTime.checkSystemTime['open-document'] || isDevelopmentBuild
            "
          />
        </div>
        <v-row
          class="items-container d-flex justify-center align-center mx-auto py-3"
          :class="{
            'tablet-container': $vuetify.breakpoint.smOnly,
            'desktop-container': $vuetify.breakpoint.mdAndUp,
          }"
          no-gutters
        >
          <v-card
            v-for="n in 6"
            class="elevation-0 d-flex flex-column align-center py-3"
            :key="n"
            :class="{
              'mobile-menu-blog': $vuetify.breakpoint.xsOnly,
              'tablet-menu-blog': $vuetify.breakpoint.smOnly,
              'desktop-menu-blog': $vuetify.breakpoint.mdAndUp,
              'align-self-start': n === 4 || n === 6,
            }"
            style="background-color: transparent"
            @click="getBtnEvent(n)"
          >
            <v-img
              :src="getImageSrc(n)"
              class="mx-auto"
              :width="getImageSize"
              :height="getImageSize"
            ></v-img>
            <div
              class="justify-center menu-title text-center mt-2"
              :class="{
                'mobile-menu-titlex`': n === 5 || n === 6,
              }"
              v-html="menu[n - 1].mobile"
            ></div>
          </v-card>
        </v-row>
        <div v-if="$vuetify.breakpoint.mdAndUp" style="height: 52px"></div>
        <Footer />
      </v-col>
      <v-col xs="12" sm="12" md="6" v-if="$vuetify.breakpoint.smAndDown">
        <v-img src="@/assets/homepage/home-bg.svg" style="z-index: 10"></v-img>
      </v-col>
    </v-row>
    <EnrollDialog :state="enrollDialog" @closeEnroll="toggleEnrollDialog" />
    <FacilityDialog
      :state="facilityDialog"
      @closeFacility="toggleFacilityDialog"
    />
    <IntroDialog
      title="Giới thiệu chung"
      :state="introDialog"
      :src="`${$baseUrl}GTC.html`"
      @closeDialog="toggleIntroDialog(false)"
    />
    <IntroDialog
      title="Hoạt động ngoại khóa"
      :state="activityDialog"
      :src="`${$baseUrl}HoatDong.html`"
      @closeDialog="toggleActivityDialog(false)"
    />
    <IntroDialog
      title="Hướng dẫn khai Hồ sơ tuyển sinh"
      :state="tutorialDialog"
      :src="`${$baseUrl}HuongDanTuyenSinh.html`"
      @closeDialog="toggleTutorialDialog(false)"
    />
    <CountdownTimer
      :state="countdownDialog"
      :date="systemTime.systemTime['open-document']"
      @closeDialog="toggleCountdownDialog(false)"
    />
  </v-container>
</template>

<script>
import GuestToolbar from "@/components/layout/GuestToolbar.vue";
import UserToolbar from "@/components/layout/UserToolbar.vue";
import Footer from "./Footer.vue";
import EnrollDialog from "@/views/enroll/EnrollDialog.vue";
import FacilityDialog from "@/views/facility/FacilityDialog.vue";
import CountdownTimer from "@/components/basic/CountdownTimer.vue";
import IntroDialog from "./IntroDialog.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    IntroDialog,
    CountdownTimer,
    GuestToolbar,
    UserToolbar,
    Footer,
    EnrollDialog,
    FacilityDialog,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user", "isConfirmedOTP"]),
    ...mapGetters("cv", ["systemTime"]),
    isGuestBar() {
      if (this.isAuthenticated && this.user) return false;
      return true;
    },
    getImageSize() {
      if (this.$vuetify.breakpoint.smAndDown) return 100;
      const maxSize = (768 - 80 - 52 - 48) / 3 - 12 * 2 - 24 - 24;
      let imageSize = (this.window.height - 80 - 52 - 48) / 3 - 12 * 2 - 24;
      if (imageSize >= maxSize) imageSize = maxSize;
      return imageSize;
    },
    isDevelopmentBuild() {
      return process.env.NODE_ENV === "development";
    },
  },
  name: "Home",
  methods: {
    ...mapActions("layout", [
      "setDocumentDialog",
      "setConfirmSignupDialog",
      "setSignInDialog",
    ]),
    ...mapActions("cv", ["checkSystemTime"]),
    getImageSrc(n) {
      return this.menu[n - 1].src;
    },
    getBtnEvent(n) {
      switch (n - 1) {
        case 0:
          this.enrollDialog = true;
          break;
        case 1:
          this.tutorialDialog = true;
          break;
        case 2:
          this.onDocumentClick();
          break;
        case 3:
          this.introDialog = true;
          break;
        case 4:
          this.facilityDialog = true;
          break;
        case 5:
          this.activityDialog = true;
          break;
        default:
          break;
      }
    },
    onDocumentClick() {
      if (!this.systemTime.checkSystemTime["open-document"]) {
        if (
          this.user &&
          this.isAuthenticated &&
          !this.isConfirmedOTP &&
          process.env.NODE_ENV === "development"
        )
          this.setConfirmSignupDialog(true);
        else if (
          this.user &&
          this.isAuthenticated &&
          this.user.role.type === "admin"
        )
          this.setDocumentDialog(true);
        else if (
          process.env.NODE_ENV === "development" &&
          this.user &&
          this.isAuthenticated
        )
          this.setDocumentDialog(true);
        else this.toggleCountdownDialog(true);
      } else if (this.user && this.isAuthenticated && this.isConfirmedOTP)
        this.setDocumentDialog(true);
      else if (this.user && this.isAuthenticated && !this.isConfirmedOTP)
        this.setConfirmSignupDialog(true);
      else this.setSignInDialog(true);
    },
    toggleCountdownDialog(data) {
      this.countdownDialog = data;
    },
    toggleEnrollDialog(data) {
      this.enrollDialog = data;
    },
    toggleActivityDialog(data) {
      this.activityDialog = data;
    },
    toggleTutorialDialog(data) {
      this.tutorialDialog = data;
    },
    toggleIntroDialog(data) {
      this.introDialog = data;
    },
    toggleFacilityDialog(data) {
      this.facilityDialog = data;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
  async created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  data: () => ({
    isMaintainMode: true, //TODO: turn this down when fix bug done
    activityDialog: false,
    enrollDialog: false,
    facilityDialog: false,
    countdownDialog: false,
    introDialog: false,
    tutorialDialog: false,
    window: {
      width: 0,
      height: 0,
    },
    menu: [
      {
        title: "Thông tin tuyển sinh",
        src: require("@/assets/homepage/Group-5.svg"),
        mobile: "Thông tin tuyển sinh",
      },
      {
        title: "Hướng dẫn tuyển sinh",
        src: require("@/assets/homepage/Group-1.svg"),
        mobile: "Hướng dẫn tuyển sinh",
      },
      {
        title: "Hồ sơ tuyển sinh",
        src: require("@/assets/homepage/Group-2.svg"),
        mobile: "Hồ sơ tuyển sinh",
      },
      {
        title: "Giới thiệu chung",
        src: require("@/assets/homepage/Group-4.svg"),
        mobile: "Giới thiệu chung",
      },
      {
        title: "Tham quan Cơ sở Nhà trường",
        src: require("@/assets/homepage/Group-6.svg"),
        mobile:
          "<span class='item-mobile-title'>Tham quan <br/> Cơ sở Nhà trường</span>" +
          "<span class='item-desktop-title'>Tham quan Cơ sở Nhà trường</span>",
      },
      {
        title: "Hoạt động ngoại khóa",
        src: require("@/assets/homepage/Group-3.svg"),
        mobile: "Hoạt động ngoại khóa",
      },
    ],
  }),
};
</script>
<style>
.item-mobile-title {
  display: none;
}
.item-desktop-title {
  display: block;
}
@media screen and (min-width: 600px) {
  div.v-card--link:hover {
    background: rgb(116, 160, 246, 0.15) !important;
  }
}
@media screen and (max-width: 960px) {
  .item-mobile-title {
    display: block;
  }
  .item-desktop-title {
    display: none;
  }
}
</style>
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
.mobile-menu-title {
  height: 48px;
}
.mobile-menu-blog {
  width: calc(100% / 2 - 12px * 2);
  max-width: 276px;
}
.tablet-menu-blog {
  width: calc(720px / 3 - 12px * 2);
}
.desktop-menu-blog {
  width: calc(640px / 2 - 12px * 4);
  max-width: 220px;
}
.tablet-container {
  max-width: 720px;
}
.desktop-container {
  width: 100%;
  max-width: 600px;
  max-height: calc(100% - 80px - 52px - 12px * 2);
}
.mobile-menu-title {
  height: 48px;
}
.items-container {
  background-image: url("../../assets/watermark.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-size: calc(100% - 48px) calc(100% - 48px);
}
</style>
