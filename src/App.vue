<template>
  <v-app>
    <v-main>
      <PluginAlert />
      <PluginConfirmDialog />
      <MainToolbar />
      <router-view></router-view>
      <SignInDialog />
      <ForgotPasswordDialog />
      <ConfirmForgotPasswordDialog />
      <NewPasswordDialog />
      <SignUpDialog />
      <ConfirmSignupDialog />
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
import PluginConfirmDialog from "@/components/plugin/PluginConfirmDialog";
import PluginAlert from "@/components/plugin/PluginAlert";
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
    PluginAlert,
    PluginConfirmDialog,
  },
  data: () => ({
    signinDialog: false,
    signupDialog: false,
    confirmSignupDialog: false,
  }),
  methods: {},
};
</script>
<style>
.container.fill-height > .row {
  flex: 1 1 100%;
  max-width: calc(100%) !important;
}
</style>
