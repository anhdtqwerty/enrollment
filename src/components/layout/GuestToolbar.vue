<template>
  <div>
    <v-btn
      color="black"
      class="text-none"
      :class="{ 'mr-4 btn-text': $vuetify.breakpoint.mdAndUp }"
      @click="onSigninClick"
      x-large
      plain
      >Đăng nhập</v-btn
    >
    <v-btn
      color="primary"
      class="text-none"
      :class="{ 'mr-4 btn-text': $vuetify.breakpoint.mdAndUp }"
      @click="onSignupClick"
      x-large
      outlined
      >Đăng ký ngay</v-btn
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("layout", [
      "setSignUpDialog",
      "setSignInDialog",
      "setAllDialogClose",
    ]),
    onSigninClick() {
      this.setAllDialogClose();
      this.setSignInDialog(true);
    },
    onSignupClick() {
      this.setAllDialogClose();
      this.setSignUpDialog(true);
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
