<template>
  <v-app>
    <v-main>
      <PluginAlert />
      <PluginConfirmDialog />
      <PluginLoading />
      <div
        class="
          text-h5 text-center
          d-flex
          flex-column
          justify-center
          align-center
          pa-6
          mx-auto
        "
        style="height: 100%; max-width: 1200px"
        v-if="isMaintainMode"
      >
        <div>
          Lượng truy cập hệ thống sáng 17/06 cao dẫn đến việc ảnh hưởng tới quá
          trình cập nhật điểm của hệ thống.
        </div>
        <div class="mt-5">
          Hệ thống xin tạm đóng để chỉnh sửa thông tin học sinh. Nhà trường lùi
          hạn khai báo điểm học bạ của học sinh đến đêm nay 23:59 ngày 17/06 và
          lùi hạn công bố điểm chuẩn sang 12:00 ngày 08/06.
        </div>
        <div class="mt-5">
          Thông tin chi tiết:
          <a href="http://luongthevinh.com.vn/home/?p=3326"
            >http://luongthevinh.com.vn/home/?p=3326</a
          >
        </div>
        <img class="mt-10 mx-auto" width="320px" src="../../assets/logo.svg" />
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
