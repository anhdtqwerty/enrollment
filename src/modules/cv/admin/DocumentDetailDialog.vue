<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card>
      <v-card-title class="admin white--text text-uppercase dialog-title">
        Chi tiết hồ sơ
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel" class="mr-n1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="py-6 d-flex flex-column align-center">
        <div class="document-title pb-6">
          Đăng ký vào {{ document.type || "Chưa có thông tin" }}
        </div>
        <div class="code-text admin--text py-3 px-4">
          Mã hồ sơ: {{ document.code || "Chưa có thông tin" }}
        </div>
      </v-card-text>
      <hr class="dashed" />
      <div>
        <Grade6DocumentDetail
          :systemTime="documentSystemTime"
          :document="document"
          v-if="document.type === 'Khối 6'"
        />
        <Grade10DocumentDetail
          :systemTime="documentSystemTime"
          :document="document"
          v-if="document.type === 'Khối 10'"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Grade6DocumentDetail from "./Grade6DocumentDetail.vue";
import Grade10DocumentDetail from "./Grade10DocumentDetail.vue";
export default {
  components: {
    Grade6DocumentDetail,
    Grade10DocumentDetail,
  },
  props: {
    state: Boolean,
    documentId: String,
  },
  data() {
    return {
      dialog: false,
      document: {},
      documentSystemTime: {},
    };
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
    documentId(newVal) {
      this.documentId = newVal;
      this.loadDocumentData();
    },
  },
  methods: {
    ...mapActions("cv", [
      "fetchCVs",
      "fetchCV",
      "updateCV",
      "checkDocumentSystemTime",
      "checkSystemTime",
      "setStep",
    ]),
    ...mapActions("upload", ["upload", "destroy"]),
    ...mapActions("activeCode", ["updateActiveCode", "fetchActiveCode"]),
    cancel() {
      this.setStep(1);
      this.$emit("closeDialog");
    },
    async loadDocumentData() {
      this.$loading.active = true;
      await this.fetchCV({
        id: this.documentId,
        parent: this.user.id,
      });
      this.document = this.CV(this.documentId);
      this.setStep(1);
      this.documentSystemTime = await this.checkDocumentSystemTime({
        grade: this.document.type,
      });
      this.$loading.active = false;
    },
  },
  computed: {
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cv", ["CVs", "CV", "step"]),
  },
};
</script>

<style scoped>
.document-title {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #3e3e3c;
}
.code-text {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  background: #bbdefb;
  border-radius: 4px;
}
hr.dashed {
  width: 100%;
  border: 1px dashed #e6e4eb;
}
</style>
