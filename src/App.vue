<template>
  <v-app>
    <v-main>
      <MainToolbar />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MainToolbar from "@/components/layout/MainToolbar.vue";
export default {
  name: "App",

  components: { MainToolbar },

  data: () => ({
    //
  }),
};
</script>
