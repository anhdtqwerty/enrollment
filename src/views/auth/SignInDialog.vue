<template>
  <v-dialog v-model="dialog" width="480px">
    <v-card>
      <v-card-title
        ><div class="title--text">Đăng nhập</div>
        <v-spacer />
        <v-icon @click="cancel()" class="mr-n1">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-4 pb-2">
        <v-form ref="form">
          <div class="text-subtitle-1">
            Số điện thoại <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập số điện thoại tại đây (Ví dụ: 097372xxxx)"
            v-model="credentials.identifier"
            name="login"
            type="text"
            color="primary"
            @keyup.enter="submit"
            :rules="phoneRules"
            outlined
            validate-on-blur
          />
          <div class="text-subtitle-1">
            Mật khẩu <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập mật khẩu tại đây"
            v-model="credentials.password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
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
          class="white--text text-subtitle-1 text-none mt-6"
          style="width: 100%"
          :loading="loading"
          @click="submit()"
          >Đăng nhập
        </v-btn>
        <!-- <div class="d-flex justify-center py-4 mt-4">
          <router-link
            :to="'/forgot-password'"
            class="info--text text-subtitle-1 text-decoration-underline"
            >Quên mật khẩu?</router-link
          >
        </div> -->
        <v-btn
          plain
          color="primary"
          class="text-subtitle-1 font-weight-bold text-none mt-2"
          style="width: 100%"
          @click="register()"
          >Chưa có tài khoản? Đăng ký
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    state: Boolean,
  },
  watch: {
    signInDialog(signInDialog) {
      this.dialog = signInDialog;
    },
  },
  computed: {
    ...mapGetters("layout", ["signInDialog"]),
    ...mapGetters("auth", ["isAuthenticated", "user"]),
  },
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
      phoneRules: [this.$rules.required, this.$rules.phone],
      passwordRules: [this.$rules.required, this.$rules.minLength(4)],
    };
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    ...mapActions("layout", [
      "setSignInDialog",
      "setSignUpDialog",
      "setConfirmSignupDialog",
    ]),
    cancel() {
      this.$refs.form.reset();
      this.setSignInDialog(false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.signIn(this.credentials);
        if (this.user && this.isAuthenticated) this.setSignInDialog(false);
        if (this.user && this.isAuthenticated && !this.isConfirmedOTP)
          this.setConfirmSignupDialog(true);
        this.loading = false;
      }
    },
    register() {
      this.setSignInDialog(false);
      this.setSignUpDialog(true);
    },
  },
};
</script>
