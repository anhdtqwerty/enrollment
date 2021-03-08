<template>
  <v-dialog
    v-model="dialog"
    width="480px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title
        ><div style="color: #797979">Đăng nhập</div>
        <v-spacer />
        <v-icon>mdi-close</v-icon>
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
            v-model="credentials.identifier"
            @keyup.enter="submit"
            type="text"
            color="primary"
            outlined
            validate-on-blur
          />
          <div class="text-subtitle-1">
            Mật khẩu <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập mật khẩu tại đây"
            v-model="credentials.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
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
          >Đăng nhập
        </v-btn>
        <div class="d-flex justify-center py-4 mt-4">
          <router-link
            :to="'/forgot-password'"
            class="info--text text-subtitle-1 text-decoration-underline"
            >Quên mật khẩu?</router-link
          >
        </div>
        <v-btn
          plain
          color="primary"
          class="text-subtitle-1 font-weight-bold btn-text mb-2"
          style="width: 100%"
          >Chưa có tài khoản? Đăng ký
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      credentials: {
        identifier: "",
        password: "",
      },
      loading: false,
      showPassword: false,
      password: "Password",
      rules: {
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
  methods: {
    // ...mapActions("auth", ["signIn"]),
    // async submit() {
    //   if (this.$refs.form.validate()) {
    //     this.loading = true;
    //     await this.signIn(this.credentials);
    //     this.loading = false;
    //   }
    // },
  },
};
</script>
