<template>
  <v-dialog
    v-model="dialog"
    width="480px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title
        ><div style="color: #797979">Quên mật khẩu</div>
        <v-spacer />
        <v-icon>mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-8">
        <v-form ref="form">
          <div class="text-subtitle-1">
            Nhập mã OTP được gửi tới điện thoại bạn
            <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập mã OTP tại đây"
            name="login"
            v-model="identifier"
            @keyup.enter="submit"
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
          >Xác nhận
        </v-btn>
        <v-btn
          depressed
          x-large
          plain
          class="primary--text text-subtitle-1 font-weight-bold btn-text mt-4"
          style="width: 100%"
          >Gửi lại
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
// import { mapActions } from "vuex";
export default {
  data: () => ({
    email: "",
    done: false,
    dialog: false,
    identifier: "",
  }),
  methods: {
    // ...mapActions("auth", ["forgotPassword"]),
    async submit() {
      if (this.$refs.form.validate()) {
        await this.forgotPassword(this.email);
        this.done = true;
      }
    },
  },
};
</script>
