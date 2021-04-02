<template>
  <v-dialog v-model="dialog" max-width="980px">
    <v-card>
      <v-card-title
        ><div
          :class="{
            'text-subtitle-1 font-weight-bold title--text':
              $vuetify.breakpoint.smAndDown,
            'title--text': $vuetify.breakpoint.mdAndUp,
          }"
        >
          Quản lý hồ sơ
        </div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-row class="pa-6" style="background: #0084ff" no-gutters>
        <v-col cols="12" sm="12" xs="12" md="4">
          <v-card
            :class="{
              'mr-6': $vuetify.breakpoint.mdAndUp,
              'mb-6': $vuetify.breakpoint.smAndDown,
            }"
          >
            <v-card-title class="subtitle">Tạo hồ sơ mới</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-4" style="background: #f2f0f1">
              <v-form ref="form">
                <div class="text-subtitle-1 mb-2">
                  Mã kích hoạt
                  <span
                    ><v-icon
                      color="#FF1D30"
                      style="font-size: 14px"
                      @click="toggleTutorial(true)"
                      >mdi-help-circle-outline</v-icon
                    ></span
                  >
                </div>
                <v-text-field
                  placeholder="Nhập mã kích hoạt tại đây"
                  v-model="activeCode"
                  v-mask="'############'"
                  name="login"
                  type="text"
                  color="primary"
                  :rules="codeRules"
                  @keyup.enter="submit"
                  @keydown="onKeyDown"
                  outlined
                  validate-on-blur
                />
                <div class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    class="elevation-0 text-none btn px-6 py-3 text-center"
                    @click="onCreateDocument"
                    :loading="loading"
                    :disabled="!isValid"
                    large
                    >Xác nhận</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" xs="12" md="8">
          <v-card>
            <DocumentTable ref="documentTable" />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <DocumentTutorial
      :state="tutorialDialog"
      :src="`${$baseUrl}HuongDanTuyenSinh.html`"
      @closeDialog="toggleTutorial"
    />
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import DocumentTutorial from "./DocumentTutorial.vue";
import DocumentTable from "@/modules/cv/DocumentTable.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    DocumentTable,
    DocumentTutorial,
  },
  computed: {
    ...mapGetters("layout", ["documentDialog"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cv", ["systemTime"]),
  },
  watch: {
    documentDialog(documentDialog) {
      this.dialog = documentDialog;
    },
    dialog(dialog) {
      if (!dialog) this.setDocumentDialog(false);
    },
  },
  data() {
    return {
      isValid: false,
      dialog: false,
      loading: false,
      tutorialDialog: false,
      activeCode: "",
      codeRules: [this.$rules.required, this.$rules.activeCode],
    };
  },
  methods: {
    ...mapActions("layout", ["setDocumentDialog"]),
    ...mapActions("cv", ["createCV"]),
    ...mapActions("activeCode", [
      "validate",
      "updateActiveCode",
      "fetchActiveCode",
    ]),
    onKeyDown() {
      if (this.activeCode != "") this.isValid = true;
    },
    cancel() {
      this.setDocumentDialog(false);
    },
    toggleTutorial(data) {
      this.tutorialDialog = data;
    },
    async onCreateDocument() {
      this.loading = true;
      if (
        (await this.validate(this.activeCode)) &&
        this.user &&
        this.isAuthenticated
      ) {
        const existingActiveCode = await this.fetchActiveCode(this.activeCode);
        if (
          !this.systemTime.checkSystemTime["grade6-close-create"] &&
          existingActiveCode &&
          existingActiveCode.type === "Khối 6"
        ) {
          this.$alert.error(
            `Xin lỗi hệ thống tạo hồ sơ khối 6 đã đóng vào lúc ${this.systemTime.systemTime["grade6-close-create"]}`
          );
          return;
        }
        if (
          !this.systemTime.checkSystemTime["grade10-close-create"] &&
          existingActiveCode &&
          existingActiveCode.type === "Khối 10"
        ) {
          this.$alert.error(
            `Xin lỗi hệ thống tạo hồ sơ khối 10 đã đóng vào lúc ${this.systemTime.systemTime["grade10-close-create"]}`
          );
          return;
        }
        const newCV = await this.createCV({
          code: this.activeCode,
          userPhone: this.user.username,
        });
        await this.$refs.documentTable.refresh({
          _sort: "updatedAt:DESC",
          parent: this.user.id,
        });
        this.$refs.form.reset();
      }
      this.loading = false;
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
<style scoped>
.subtitle {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #797979;
}
.btn {
  border-radius: 4px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
</style>

<style>
.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: white !important;
}
</style>
