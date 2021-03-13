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
        width="40"
      />
      <div class="accent--text ml-1" id="school-title">LƯƠNG THẾ VINH</div>
    </div>
    <v-spacer></v-spacer>
    <GuestToolbar v-if="$vuetify.breakpoint.smAndUp && isGuestBar" />
    <UserToolbar v-if="$vuetify.breakpoint.smAndUp && !isGuestBar" />
  </v-app-bar>
</template>

<script>
import GuestToolbar from "@/components/layout/GuestToolbar.vue";
import UserToolbar from "@/components/layout/UserToolbar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    GuestToolbar,
    UserToolbar,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user", "isConfirmedOTP"]),
    getBarHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return "92px";
      else return "68px";
    },
    isGuestBar() {
      if (this.isAuthenticated && this.user && !this.isConfirmedOTP)
        return true;
      if (this.isAuthenticated && this.user && this.isConfirmedOTP)
        return false;
      return true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");
#school-title {
  font-family: "Roboto Condensed", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 22px;
}
</style>
