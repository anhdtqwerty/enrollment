<template>
  <v-app-bar
    color="white"
    class="elevation-2"
    max-height="80px"
    :height="getBarHeight"
    app
    dark
  >
    <div
      class="d-flex justify-start align-center"
      :class="{
        'px-4 md-height': $vuetify.breakpoint.mdAndUp,
      }"
    >
      <v-img
        alt="Vuetify Logo"
        class="mr-2"
        contain
        src="@/assets/homepage/logo.svg"
        transition="scale-transition"
        :width="getImgHeight"
      />
      <div
        class="accent--text ml-1"
        :class="{
          'desktop-title': $vuetify.breakpoint.mdAndUp,
          'mobile-title': $vuetify.breakpoint.smAndDown,
        }"
        id="school-title"
      >
        LƯƠNG THẾ VINH
      </div>
    </div>
    <v-spacer></v-spacer>
    <GuestToolbar
      :isOpen="
        systemTime.checkSystemTime['open-document'] || ENV === 'development'
      "
      v-if="$vuetify.breakpoint.smAndUp && isGuestBar"
    />
    <UserToolbar
      :isOpen="
        systemTime.checkSystemTime['open-document'] || ENV === 'development'
      "
      v-if="$vuetify.breakpoint.smAndUp && !isGuestBar"
    />
  </v-app-bar>
</template>

<script>
import GuestToolbar from "@/components/layout/GuestToolbar.vue";
import UserToolbar from "@/components/layout/UserToolbar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    GuestToolbar,
    UserToolbar,
  },
  data() {
    return {
      ENV: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user", "isConfirmedOTP"]),
    ...mapGetters("cv", ["systemTime"]),
    getImgHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return "56px";
      else return "42px";
    },
    getBarHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return "80px";
      else return "68px";
    },
    isGuestBar() {
      if (this.isAuthenticated && this.user) return false;
      return true;
    },
  },
  async created() {
    this.$loading.active = true;
    await this.checkSystemTime();
    this.ENV = process.env.NODE_ENV;
    this.$loading.active = false;
  },
  methods: {
    ...mapActions("cv", ["checkSystemTime"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");
#school-title {
  font-family: "Roboto Condensed", sans-serif;
  font-style: normal;
  font-weight: bold;
  line-height: 21px;
}
.desktop-title {
  font-size: 21px;
}
.mobile-title {
  font-size: 18px;
}
</style>
