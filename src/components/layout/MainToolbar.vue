<template>
  <v-app-bar
    color="white"
    class="elevation-2"
    max-height="92px"
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
    <GuestToolbar
      @onSigninClick="signin"
      @onSignupClick="signup"
      v-if="$vuetify.breakpoint.mdAndUp"
    />
    <!-- <UserToolbar /> -->
  </v-app-bar>
</template>

<script>
import GuestToolbar from "@/components/layout/GuestToolbar.vue";
// import UserToolbar from "@/components/layout/UserToolbar.vue";
export default {
  components: {
    GuestToolbar,
    //   UserToolbar
  },
  methods: {
    signin(data) {
      this.$emit("signin", data);
    },
    signup(data) {
      this.$emit("signup", data);
    },
  },
  computed: {
    getBarHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return "92px";
      else return "68px";
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
