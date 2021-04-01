<template>
  <v-app>
    <v-main>
      <PluginAlert />
      <PluginConfirmDialog />
      <PluginLoading />
      <MainToolbar />
      <router-view></router-view>
      <DocumentDialog />
      <SignInDialog />
      <ForgotPasswordDialog />
      <ConfirmForgotPasswordDialog />
      <NewPasswordDialog />
      <SignUpDialog />
      <ConfirmSignupDialog />
      <div id="notice" v-if="isDevelopmentBuild">
        <div class="error--text text-subtitle-1">
          Development Build. v{{ version }}
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MainToolbar from "@/components/layout/MainToolbar.vue";
import SignInDialog from "@/views/auth/SignInDialog.vue";
import ForgotPasswordDialog from "@/views/auth/ForgotPasswordDialog.vue";
import ConfirmForgotPasswordDialog from "@/views/auth/ConfirmForgotPasswordDialog.vue";
import NewPasswordDialog from "@/views/auth/NewPasswordDialog.vue";
import SignUpDialog from "@/views/auth/SignUpDialog.vue";
import ConfirmSignupDialog from "@/views/auth/ConfirmSignupDialog.vue";
import DocumentDialog from "@/views/document/DocumentDialog.vue";
import PluginConfirmDialog from "@/components/plugin/PluginConfirmDialog";
import PluginAlert from "@/components/plugin/PluginAlert";
import PluginLoading from "@/components/plugin/PluginLoading";
export default {
  name: "App",
  components: {
    MainToolbar,
    SignInDialog,
    ForgotPasswordDialog,
    ConfirmForgotPasswordDialog,
    NewPasswordDialog,
    SignUpDialog,
    ConfirmSignupDialog,
    DocumentDialog,
    PluginAlert,
    PluginConfirmDialog,
    PluginLoading,
  },
  data() {
    return {
      isDevelopmentBuild: true,
      version: "0.1",
    };
  },
  created() {
    this.version = process.env.VUE_APP_API_VERSION;
    this.isDevelopmentBuild = process.env.NODE_ENV === "development";
  },
};
</script>
<style>
.container.fill-height > .row {
  flex: 1 1 100%;
  max-width: calc(100%) !important;
}

.v-card--link:focus:before {
  opacity: 0 !important;
}
#notice {
  position: absolute;
  bottom: 12px;
  left: 12px;
}
</style>
