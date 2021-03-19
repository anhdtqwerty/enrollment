<template>
  <v-dialog v-model="dialog" max-width="980px" persistent>
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
        <v-col cols="4">
          <v-card class="mr-6">
            <v-card-title class="subtitle">Tạo hồ sơ mới</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-4">
              <v-form ref="form" v-model="isValid">
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
                  placeholder="Nhập mã kích hoạt tại đây (Ví dụ: 12345678)"
                  v-model="activeCode"
                  name="login"
                  type="text"
                  color="primary"
                  :rules="codeRules"
                  @keyup.enter="submit"
                  outlined
                  validate-on-blur
                />
                <div class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    class="text-none btn px-6 py-3 text-center"
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
        <v-col cols="8">
          <v-card>
            <DocumentTable ref="documentTable" />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <DocumentTutorial
      :state="tutorialDialog"
      src="http://enroll-api.quanlylop.com/HuongDan.html"
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
  },
  watch: {
    documentDialog(documentDialog) {
      this.dialog = documentDialog;
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
    ...mapActions("activeCode", ["validate"]),
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
        await this.createCV({
          code: this.activeCode,
          userPhone: this.user.username,
        });
        await this.$refs.documentTable.refresh({
          _sort: "createdAt:DESC",
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
