<template>
  <v-dialog
    v-model="dialog"
    max-width="640px"
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
            Số điện thoại <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập số điện thoại tại đây"
            name="login"
            type="tel"
            color="primary"
            v-model="credentials.phone"
            @keyup.enter="submit"
            :rules="phoneRules"
            outlined
            validate-on-blur
          />
          <div class="text-subtitle-1">
            Email <span style="color: red">*</span>
          </div>
          <v-text-field
            placeholder="Nhập mật khẩu tại đây"
            v-model="credentials.email"
            type="email"
            :rules="emailRules"
            @keyup.enter="submit"
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
            color="primary"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
            @keyup.enter="submit"
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
          :disabled="!isValid"
          :loading="loading"
          @click="submit"
          >Đăng ký
        </v-btn>
        <v-btn
          plain
          color="primary"
          class="text-subtitle-1 font-weight-bold btn-text mt-6"
          style="width: 100%"
          >Đã có tài khoản? Đăng nhập
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    state: Boolean,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  data() {
    return {
      dialog: false,
      isValid: true,
      credentials: {
        email: "",
        phone: "",
        password: "",
      },
      confirmPassword: "",
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      password: "Password",
      phoneRules: [this.$rules.required, this.$rules.phone],
      passwordRules: [this.$rules.required, this.$rules.minLength(4)],
      confirmPasswordRules: [
        this.$rules.required,
        this.$rules.minLength(4),
        (v) =>
          (v && v === this.credentials.password) ||
          "Mật khẩu (nhập lại) không trùng khớp với mật khẩu.",
      ],
      emailRules: [this.$rules.required, this.$rules.email],
    };
  },
  methods: {
    ...mapActions("auth", ["signUp"]),
    ...mapGetters("auth", ["isAuthenticated", "user"]),
    cancel() {
      this.$refs.form.reset();
      this.$emit("onClose", false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.signUp(this.credentials);
        if (this.user && this.isAuthenticated) {
          this.$refs.form.reset();
          this.$emit("signupCheckOTP");
        }
        this.loading = false;
      }
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
