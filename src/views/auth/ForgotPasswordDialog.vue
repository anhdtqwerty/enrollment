<template>
  <v-dialog v-model="dialog" width="480px">
    <v-card>
      <v-card-title
        ><div style="color: #797979">Quên mật khẩu</div>
        <v-spacer />
        <v-icon class="mr-n1" @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-8">
        <v-form ref="form">
          <div class="text-subtitle-1">
            Số điện thoại <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập số điện thoại tại đây"
            name="login"
            v-model="identifier"
            @keyup.enter="submit"
            :rules="phoneRules"
            type="text"
            color="primary"
            outlined
            validate-on-blur
          />
        </v-form>
        <v-btn
          depressed
          x-large
          block
          color="primary"
          class="white--text text-subtitle-1 btn-text text-none mt-6"
          style="width: 100%"
          :loading="loading"
          @click="submit()"
          >Tiếp theo
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("layout", ["forgotPasswordDialog"]),
    ...mapGetters("auth", ["isRequestingReset", "userPhone"]),
  },
  watch: {
    forgotPasswordDialog(forgotPasswordDialog) {
      this.dialog = forgotPasswordDialog;
    },
  },
  data() {
    return {
      isValid: true,
      loading: false,
      phoneRules: [this.$rules.required, this.$rules.phone],
      dialog: false,
      identifier: "",
    };
  },
  methods: {
    ...mapActions("auth", ["requestResetOTP"]),
    ...mapActions("layout", [
      "setForgotPasswordDialog",
      "setConfirmForgotPasswordDialog",
      "setSignInDialog",
    ]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.requestResetOTP({ userPhone: this.identifier });
        if (this.isRequestingReset && this.userPhone) {
          this.setForgotPasswordDialog(false);
          this.setConfirmForgotPasswordDialog(true);
        }
        this.loading = false;
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.setForgotPasswordDialog(false);
      this.setSignInDialog(true);
    },
  },
};
</script>
