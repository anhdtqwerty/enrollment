<template>
  <v-app>
    <navigation-drawer
      class="d-print-none"
      :drawer="drawer"
    ></navigation-drawer>
    <plugin-confirm-dialog class="d-print-none" />
    <main-toolbar
      class="d-print-none"
      v-if="!simpleLayout"
      @toggle-drawer="toggleDrawer($event)"
    />
    <v-main class="d-print-none">
      <plugin-alert />
      <plugin-loading />
      <confirm ref="confirm" />
      <v-container
        id="container"
        fluid
        grid-list-xl
        class="overflow-auto pa-0"
        style="overflow-x: hidden; background-color: #fafafa"
        :style="{ height: `calc(100vh - 64px)` }"
      >
        <router-view style="max-width: 1200px; margin: auto"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PluginConfirmDialog from "@/components/plugin/PluginConfirmDialog";
import PluginAlert from "@/components/plugin/PluginAlert";
import PluginLoading from "@/components/plugin/PluginLoading";
import Confirm from "@/components/plugin/Confirm";
import MainToolbar from "./MainToolbar";
import NavigationDrawer from "./NavigationDrawer.vue";
export default {
  components: {
    MainToolbar,
    PluginConfirmDialog,
    PluginAlert,
    PluginLoading,
    Confirm,
    NavigationDrawer,
  },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["user", "isAuthenticated", "role"]),
    simpleLayout() {
      const { meta = {}, matched = [] } = this.$route;
      return (
        meta.auth === false ||
        matched.some((route) => route.meta.auth === false)
      );
    },
    isDesktop() {
      return true;
    },
  },
  methods: {
    ...mapActions("course", ["fetchCourses"]),
    ...mapActions("auth", ["setRole"]),
    toggleDrawer: function(updatedDrawer) {
      this.drawer = updatedDrawer;
    },
  },
  async created() {
    this.$loading.active = true;
    if (!this.user || !this.isAuthenticated || this.role.type !== "admin") {
      this.$alert.error(
        `Bạn cần phải đăng nhập tài khoản Admin để sử dụng chức năng này!`
      );
      this.$router.push("/admin/signin");
      this.$loading.active = false;
      return;
    }
    if (this.$route.path === "/admin") this.$router.push("/admin/dashboard");
    this.$loading.active = false;
  },
};
</script>
