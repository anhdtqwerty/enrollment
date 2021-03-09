<template>
  <v-app>
    <v-main>
      <MainToolbar @signin="toggleSignin" @signup="toggleSignup" />
      <router-view></router-view>
      <SignInDialog :state="signinDialog" @onClose="toggleSignin" />
      <ForgotPasswordDialog />
      <ConfirmForgotPasswordDialog />
      <NewPasswordDialog />
      <SignUpDialog
        :state="signupDialog"
        @onClose="toggleSignup"
        @signupCheckOTP="onSignupOTPCheck"
      />
      <ConfirmSignupDialog
        :state="confirmSignupDialog"
        @onClose="toggleConfirmSignup"
      />
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
  },
  data: () => ({
    signinDialog: false,
    signupDialog: false,
    confirmSignupDialog: false,
  }),
  methods: {
    toggleSignin(data) {
      this.signinDialog = data;
    },
    toggleSignup(data) {
      this.signupDialog = data;
    },
    toggleConfirmSignup(data) {
      this.confirmSignupDialog = data;
    },
    onSignupOTPCheck() {
      this.signupDialog = false;
      this.confirmSignupDialog = true;
    },
  },
};
</script>
