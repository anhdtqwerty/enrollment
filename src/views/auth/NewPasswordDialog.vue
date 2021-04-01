<template>
  <v-dialog v-model="dialog" width="480px">
    <v-card>
      <v-card-title
        ><div style="color: #797979">Đặt lại mật khẩu</div>
        <v-spacer />
        <v-icon class="mr-n1" @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-8">
        <v-form ref="form">
          <div class="text-subtitle-1">
            Mật khẩu <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập mật khẩu tại đây"
            v-model="newPassword"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showNewPassword ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append="showNewPassword = !showNewPassword"
            @keyup.enter="submit"
            color="primary"
            outlined
            validate-on-blur
          />
          <div class="text-subtitle-1">
            Mật khẩu (nhắc lại) <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập mật khẩu tại đây"
            v-model="confirmPassword"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            :rules="confirmPasswordRules"
            @click:append="showConfirmPassword = !showConfirmPassword"
            @keyup.enter="submit"
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
          >Xác nhận
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  watch: {
    newPasswordDialog(newPasswordDialog) {
      this.dialog = newPasswordDialog;
    },
  },
  computed: {
    ...mapGetters("layout", ["newPasswordDialog"]),
    ...mapGetters("auth", [
      "user",
      "userPhone",
      "isConfirmedResetOTP",
      "isRequestingReset",
      "isAuthenticated",
    ]),
  },
  data() {
    return {
      isValid: true,
      dialog: false,
      loading: false,
      showNewPassword: false,
      showConfirmPassword: false,
      newPassword: "",
      confirmPassword: "",
      passwordRules: [this.$rules.required, this.$rules.minLength(4)],
      confirmPasswordRules: [
        this.$rules.required,
        this.$rules.minLength(4),
        (v) =>
          (v && v === this.newPassword) ||
          "Mật khẩu (nhập lại) không trùng khớp với mật khẩu.",
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["changePassword"]),
    ...mapActions("layout", ["setNewPasswordDialog", "setSignInDialog"]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.changePassword({
          userPhone: this.userPhone,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmPassword,
        });
        if (
          !this.isRequestingReset &&
          !this.isConfirmedResetOTP
        ) {
          this.setNewPasswordDialog(false);
          this.setSignInDialog(true);
        }
        this.loading = false;
      }
    },
  },
};
</script>
