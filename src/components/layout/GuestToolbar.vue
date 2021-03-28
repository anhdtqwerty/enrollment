<template>
  <div>
    <v-btn
      class="text-none"
      v-if="isOpen"
      :class="{ 'mr-4 btn-text': $vuetify.breakpoint.mdAndUp }"
      @click="onSigninClick"
      color="white"
      depressed
      light
      dense
      large
      >Đăng nhập</v-btn
    >
    <v-btn
      color="primary"
      class="text-none"
      v-if="isOpen"
      :class="{ 'mr-4 btn-text': $vuetify.breakpoint.mdAndUp }"
      @click="onSignupClick"
      outlined
      dense
      large
      >Đăng ký ngay</v-btn
    >
    <div
      class="info--text"
      v-if="!isOpen"
      :class="{ 'mr-4 btn-text': $vuetify.breakpoint.mdAndUp }"
    >
      Xin chào quý phụ huynh!
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    isOpen: Boolean,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user", "isConfirmedOTP"]),
  },
  methods: {
    ...mapActions("layout", [
      "setSignUpDialog",
      "setSignInDialog",
      "setAllDialogClose",
      "setConfirmSignupDialog",
    ]),
    onSigninClick() {
      this.setAllDialogClose();
      this.setSignInDialog(true);
    },
    onSignupClick() {
      this.setAllDialogClose();
      if (this.isAuthenticated && this.user && !this.isConfirmedOTP)
        this.setConfirmSignupDialog(true);
      else this.setSignUpDialog(true);
    },
  },
};
</script>
<style scoped>
.btn-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
</style>
