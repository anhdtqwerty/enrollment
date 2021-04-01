<template>
  <v-app>
    <PluginAlert />
    <v-row class="d-flex align-center" no-gutters fill-height>
      <v-col xs="12" sm="12" md="6" v-if="$vuetify.breakpoint.mdAndUp">
        <v-img src="@/assets/homepage/home-bg.svg" class="bg-image"></v-img>
      </v-col>
      <v-col xs="12" sm="12" md="6" style="height: 100vh" class="">
        <div class="signin-col">
          <v-card width="90%" max-width="560px">
            <v-card-title
              ><div class="title--text">Đăng nhập</div>
              <v-spacer />
              <v-icon @click="cancel()" class="mr-n1">mdi-close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="py-6">
              <v-form ref="form" v-model="isValid">
                <div class="text-subtitle-1">
                  Tài khoản <span style="color: red">*</span>
                </div>
                <v-text-field
                  placeholder="Nhập tài khoản"
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
                <v-btn
                  depressed
                  x-large
                  color="primary"
                  :loading="loading"
                  @click="submit"
                  >Đăng nhập
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col xs="12" sm="12" md="6" v-if="$vuetify.breakpoint.smAndDown">
        <v-img src="@/assets/homepage/bg.jpg"></v-img>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import PluginAlert from "@/components/plugin/PluginAlert";

export default {
  components: { PluginAlert },
  watch: {
    signInDialog(signInDialog) {
      this.dialog = signInDialog;
    },
  },
  computed: {
    ...mapGetters("layout", ["signInDialog"]),
    ...mapGetters("auth", ["isAuthenticated", "user", "role"]),
  },
  async created() {
    this.$loading.active = true;
    if (this.user && this.isAuthenticated && this.user.role.type === "admin")
      this.$router.push("/admin");
  },
  data() {
    return {
      isValid: true,
      dialog: true,
      credentials: {
        identifier: "",
        password: "",
      },
      loading: false,
      showPassword: false,
      password: "Password",
      phoneRules: [this.$rules.required],
      passwordRules: [this.$rules.required, this.$rules.minLength(4)],
    };
  },
  methods: {
    ...mapActions("auth", ["signIn", "signOut"]),
    cancel() {
      this.$refs.form.reset();
      this.setSignInDialog(false);
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.signIn(this.credentials);
        if (
          !this.user ||
          !this.isAuthenticated ||
          this.user.role.type !== "admin"
        ) {
          this.$alert.error("Xin vui lòng đăng nhập bằng tài khoản Admin");
          this.signOut();
          this.loading = false;
          return;
        }
        this.$refs.form.reset();
        this.$router.push("/admin");
        this.loading = false;
      }
    },
    resetPassword() {
      this.setSignInDialog(false);
      if (this.isRequestingReset) this.setConfirmForgotPasswordDialog(true);
      else if (this.isConfirmedResetOTP) this.setNewPasswordDialog(true);
      else this.setForgotPasswordDialog(true);
    },
    register() {
      this.setSignInDialog(false);
      this.setSignUpDialog(true);
    },
  },
};
</script>

<style scoped>
.bg-image {
  position: absolute;
  object-fit: contain;
  width: 50%;
  height: 100%;
  top: 0px;
}
.menu-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
}
.mobile-menu-blog {
  width: calc(100% / 2 - 12px * 2);
  max-width: 276px;
}
.tablet-menu-blog {
  width: calc(680px / 3 - 12px * 2);
}
.desktop-menu-blog {
  width: calc(640px / 2 - 12px * 4);
  max-width: 220px;
}
.tablet-container {
  max-width: 680px;
}
.desktop-container {
  width: 100%;
  max-width: 600px;
  max-height: calc(100% - 80px - 52px - 12px * 2);
}
@media screen and (min-width: 600px) {
  div.v-card--link:hover {
    background: rgb(62, 62, 60, 0.1) !important;
  }
}
.signin-col {
  font-family: "Roboto", sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
