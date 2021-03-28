<template>
  <v-app-bar
    app
    dense
    height="64px"
    class="elevation-2 white"
    :class="{ blue: isXsScreen, 'darken-4': isXsScreen }"
  >
    <v-app-bar-nav-icon
      dark
      class="d-flex d-sm-none"
      @click.stop="toggleDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="pl-0">
      <v-img
        class="d-flex d-sm-none "
        src="../../assets/logo.svg"
        height="32px"
        width="132px"
        contain
      ></v-img>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        class="text-none"
        :class="{ 'mr-4 btn-text': $vuetify.breakpoint.mdAndUp }"
        @click="onSignout"
        color="white"
        depressed
        light
        dense
        large
        >Đăng xuất</v-btn
      >
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters("auth", ["user", "role"]),
    isXsScreen() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  data() {
    return { drawer: true };
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    toggleDrawer: function() {
      this.drawer = !this.drawer;
      this.$emit("toggle-drawer", this.drawer);
    },
    onSignout() {
      this.signOut();
      this.$router.push("/admin/signin");
    },
  },
};
</script>

<style></style>
