<template>
  <v-card-actions class="d-flex justify-end pt-6 px-0">
    <hr class="dashed" />
    <v-btn
      class="px-6 py-3 mr-6 text-none"
      color="primary"
      v-if="step === 1"
      :loading="loading"
      @click="saveDraft()"
      outlined
      large
    >
      <v-icon> mdi-content-save </v-icon>
      <span class="ml-2">Lưu tạm thời</span>
    </v-btn>
    <v-btn
      class="px-6 py-3 text-none elevation-0"
      color="primary"
      @click="completeStep"
      :loading="loading"
      large
    >
      <span>Hoàn thành</span>
    </v-btn>
  </v-card-actions>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    documentId: String,
    query: Object,
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV", "step"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
  },
  data() {
    return { loading: false };
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    async saveDraft() {
      if (!this.query) {
        this.$alert.error("Đã có lỗi xảy ra trong quá trình cập nhật hồ sơ");
        return;
      }
      if (this.query.department && this.query.department === "") {
        this.$alert.error("Xin vui lòng chọn cơ sở");
        return;
      }
      this.loading = true;
      await this.updateCV({
        id: this.documentId,
        ...this.query,
      });
      this.loading = false;
    },
    completeStep() {
      if (!this.query) {
        this.$alert.error("Đã có lỗi xảy ra trong quá trình cập nhật hồ sơ");
        return;
      }
      this.$dialog.confirm({
        title: "Hoàn thành",
        okText: "Xác nhận",
        cancelText: "Chọn lại",
        done: async () => {
          this.$emit("completeStep");
        },
      });
    },
  },
};
</script>

<style scoped>
hr.dashed {
  border-top: 1px dashed #e6e4eb;
}
</style>