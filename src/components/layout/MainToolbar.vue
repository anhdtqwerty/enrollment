<template>
  <v-app-bar color="white" class="elevation-2 px-4" height="92px" app dark>
    <div class="d-flex justify-start align-center">
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
    <GuestToolbar />
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
