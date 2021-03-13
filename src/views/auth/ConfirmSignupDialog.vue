<template>
  <v-dialog
    v-model="dialog"
    width="480px"
    persistent
  >
    <v-card>
      <v-card-title
        ><div class="title--text">Xác nhận tài khoản</div>
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
          :loading="loading"
          :disabled="!isValid || countdownLockConfirm > 0"
          >{{ getConfirmCountdown }}
        </v-btn>
        <v-btn
          depressed
          x-large
          plain
          class="primary--text text-subtitle-1 font-weight-bold btn-text mt-4"
          style="width: 100%"
          @click="resendOTP()"
          :loading="loading"
          :disabled="countdownRegisterOTP > 0"
          >{{ getSendCountdown }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("layout", [
      "confirmSignupDialog",
      "countdownRegisterOTP",
      "countdownLockConfirm",
    ]),
    ...mapGetters("auth", [
      "isAuthenticated",
      "isConfirmedOTP",
      "user",
      "confirmFailTime",
    ]),
    getSendCountdown() {
      if (this.countdownRegisterOTP > 0) {
        const timeString = new Date(this.countdownRegisterOTP * 1000)
          .toISOString()
          .substr(14, 5);
        return `Gửi lại (${timeString})`;
      }
      return `Gửi lại`;
    },
    getConfirmCountdown() {
      if (this.countdownLockConfirm > 0) {
        const timeString = new Date(this.countdownLockConfirm * 1000)
          .toISOString()
          .substr(14, 5);
        return `Xác nhận (${timeString})`;
      }
      return `Xác nhận`;
    },
  },
  data: () => ({
    signupOTP: "",
    loading: false,
    dialog: false,
    isValid: true,
    timerSendCount: 0,
    timerSendEnabled: false,
    timerConfirmCount: 0,
    timerConfirmEnabled: false,
  }),
  methods: {
    ...mapActions("auth", [
      "confirmSignup",
      "requestOTP",
      "setConfirmFailTime",
    ]),
    ...mapActions("layout", [
      "setConfirmSignupDialog",
      "setCountdownRegisterOTP",
      "setCountdownLockConfirm",
    ]),
    cancel() {
      this.$refs.form.reset();
      this.setConfirmSignupDialog(false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$refs.form.reset();
        await this.confirmSignup({
          phone: this.user.username,
          otp: this.signupOTP,
        });
        if (this.isConfirmedOTP && this.isAuthenticated && this.user) {
          this.setConfirmSignupDialog(false);
          this.setConfirmFailTime(0);
        } else {
          this.setConfirmFailTime(this.confirmFailTime + 1);
          if (this.confirmFailTime >= 5) {
            this.timerConfirmEnabled = true;
            this.timerConfirmCount = 5 * 60;
          }
        }
        this.loading = false;
      }
    },
    async resendOTP() {
      if (this.timerSendCount == 0 && this.countdownRegisterOTP == 0) {
        this.loading = true;
        this.timerSendEnabled = true;
        this.timerSendCount = 60;
        await this.requestOTP({
          userId: this.user.id,
          phone: this.user.username,
        });
        this.loading = false;
      }
    },
  },
  watch: {
    confirmSignupDialog(confirmSignupDialog) {
      this.dialog = confirmSignupDialog;
    },
    timerSendCount: {
      handler(value) {
        if (value > 0 && this.timerSendEnabled) {
          setTimeout(() => {
            this.timerSendCount--;
            this.setCountdownRegisterOTP(this.timerSendCount);
          }, 1000);
        } else if (value == 0) this.timerSendEnabled = false;
      },
      immediate: false,
    },
    timerConfirmCount: {
      handler(value) {
        if (value > 0 && this.timerConfirmEnabled) {
          setTimeout(() => {
            this.timerConfirmCount--;
            this.setCountdownLockConfirm(this.timerConfirmCount);
          }, 1000);
        } else if (value == 0) {
          this.timerConfirmEnabled = false;
          this.setConfirmFailTime(0);
        }
      },
      immediate: false,
    },
  },
};
</script>
