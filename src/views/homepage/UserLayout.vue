<template>
  <v-app>
    <v-main>
      <PluginAlert />
      <PluginConfirmDialog />
      <PluginLoading />
      <div
        class="
          text-h4 text-center
          d-flex
          flex-column
          justify-center
          align-center
          pa-5
        "
        style="height: 100%"
        v-if="isMaintainMode"
      >
        <div>
          Xin lỗi, trang Tuyển sinh đang tạm đóng để cập nhật lại Điểm thi và
          nâng cao chất lượng trải nghiệm cho quý phụ huynh.
        </div>
        <div class="mt-5">
          Mong quý phụ huynh thông cảm cho sự bất tiện này và quay lại sau. Xin
          cảm ơn!
        </div>
        <img class="mt-10 mx-auto" width="420px" src="../../assets/logo.svg" />
      </div>
      <MainToolbar v-if="!isMaintainMode" />
      <router-view v-if="!isMaintainMode"></router-view>
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
      isMaintainMode: true,
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
