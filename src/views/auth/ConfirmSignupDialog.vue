<template>
  <v-dialog
    v-model="dialog"
    width="480px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    persistent
  >
    <v-card>
      <v-card-title
        ><div style="color: #797979">Đăng ký</div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-8">
        <v-form ref="form" v-model="isValid">
          <div class="text-subtitle-1">
            Nhập mã OTP được gửi tới điện thoại bạn
            <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập mã OTP tại đây"
            name="login"
            v-model="signupOTP"
            @keyup.enter="submit"
            :rules="[$rules.required, $rules.otp]"
            type="text"
            color="primary"
            outlined
            validate-on-blur
          />
        </v-form>
        <v-btn
          depressed
          x-large
          color="primary"
          class="white--text text-subtitle-1 btn-text mt-6"
          style="width: 100%"
          @click="submit()"
          :disabled="!isValid"
          >Xác nhận
        </v-btn>
        <v-btn
          depressed
          x-large
          plain
          class="primary--text text-subtitle-1 font-weight-bold btn-text mt-4"
          style="width: 100%"
          @click="resendOTP()"
          :disabled="countdownRegisterOTP > 0"
          >{{ getCountdownTime }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("layout", ["confirmSignupDialog", "countdownRegisterOTP"]),
    ...mapGetters("auth", ["isAuthenticated", "isConfirmedOTP", "user"]),
    getCountdownTime() {
      if (this.countdownRegisterOTP > 0)
        return `Gửi lại (${this.countdownRegisterOTP})`;
      return `Gửi lại`;
    },
  },
  data: () => ({
    signupOTP: "",
    loading: false,
    dialog: false,
    isValid: true,
    timerCount: 0,
    timerEnabled: false,
  }),
  methods: {
    ...mapActions("auth", ["confirmSignupOTP, requestOTP"]),
    ...mapActions("layout", [
      "setConfirmSignupDialog",
      "setCountdownRegisterOTP",
    ]),
    cancel() {
      this.$refs.form.reset();
      this.$emit("onClose", false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.confirmSignup({
          phone: this.user.username,
          otp: this.signupOTP,
        });
        if (this.isConfirmedOTP && this.isAuthenticated && this.user) {
          this.setConfirmSignupDialog(false);
        }
        this.loading = false;
      }
    },
    async resendOTP() {
      if (this.timerCount == 0 && this.countdownRegisterOTP == 0) {
        this.timerEnabled = true;
        this.timerCount = 60;
        await this.requestOTP({
          userId: this.user.id,
          phone: this.user.username,
        });
      }
    },
  },
  watch: {
    confirmSignupDialog(confirmSignupDialog) {
      this.dialog = confirmSignupDialog;
    },
    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
            this.setCountdownRegisterOTP(this.timerCount);
          }, 1000);
        } else if (value == 0) this.timerEnabled = false;
      },
      immediate: false,
    },
  },
};
</script>
