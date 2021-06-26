<template>
  <v-card width="100%" class="elevation-0">
    <ExamResultGrade6
      ref="agreeForm"
      :documentStep="documentStep"
      :document="document"
      :systemTime="systemTime"
      :isAdminPreview="isAdminPreview"
      v-if="document.type === 'Khối 6'"
    />
    <ExamResultGrade10
      ref="grade10ExamResult"
      :documentStep="documentStep"
      :document="document"
      :systemTime="systemTime"
      :isAdminPreview="isAdminPreview"
      :isEditing="isEditing"
      v-if="document.type === 'Khối 10'"
    />
    <hr class="dashed" />
    <v-card-actions
      class="d-flex justify-end pt-6 px-0"
      v-if="document.status !== 'submitted' || isEditing"
    >
      <v-btn
        class="py-3 mr-6 text-none"
        color="primary"
        v-if="document.type === 'Khối 10' && !isAdminPreview"
        @click="saveDraft"
        outlined
        large
      >
        <v-icon> mdi-content-save </v-icon>
        <span class="ml-2">Lưu tạm thời</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="document.type === 'Khối 10' && !isAdminPreview"
        @click="completeGrade10"
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
      <!-- <v-btn
        :class="{
          'mt-6': $vuetify.breakpoint.mdAndUp,
          'mt-3': $vuetify.breakpoint.smAndDown,
        }"
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="
          document.type === 'Khối 6' &&
          document.ltvExamResult &&
          document.ltvExamResult.passExamType &&
          document.ltvExamResult.passExamType === 'pass'
        "
        @click="completeGrade6"
        large
      >
        <span>Đăng ký nhập học</span>
      </v-btn> -->
    </v-card-actions>
    <v-card-actions class="d-flex justify-end pt-6 px-0" v-else>
      <!-- TODO: Remove this button when close -->
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="document.type === 'Khối 10' && !isAdminPreview && !isEditing"
        @click="onEdit"
        large
      >
        <span>Chỉnh sửa</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ExamResultGrade6 from "@/modules/cv/ExamResultGrade6.vue";
import ExamResultGrade10 from "@/modules/cv/ExamResultGrade10.vue";
import moment from "moment";

export default {
  components: {
    ExamResultGrade6,
    ExamResultGrade10,
  },
  props: {
    document: Object,
    documentStep: Number,
    systemTime: Object,
    isAdminPreview: Boolean,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    reset() {
      this.$refs.agreeForm.reset();
    },
    onEdit() {
      this.$dialog.confirm({
        title: "Chỉnh sửa",
        okText: "Xác nhận",
        // topContent: `Phụ huynh lưu ý: Các thông tin này có thể được chỉnh sửa nhưng sẽ bị khóa vào ngày <span class="error--text">${this.closeFillInfoTime}</span>`,
        topContent: "",
        midContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục",
        botContent: "",
        cancelText: "Hủy",
        done: async () => {
          this.isEditing = true;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        },
      });
    },
    completeGrade10() {
      const grade10ExamResult = this.$refs.grade10ExamResult.getData();
      if (!this.$refs.grade10ExamResult.validate()) {
        this.$alert.error(
          "Xin vui lòng điền tất cả thông tin bắt buộc và tích vào ô đồng ý với nội quy của nhà trường"
        );
        return;
      }
      if (
        this.systemTime.checkDocumentSystemTime &&
        this.systemTime.checkDocumentSystemTime["close-fill-exam-result"]
      ) {
        this.$alert.error(
          `Hệ thống đã khóa chức năng khai báo điểm vào lúc ${moment(
            this.systemTime.documentSystemTime["close-fill-exam-result"],
            "DD/MM/YYYY HH:mm:ss"
          ).format("HH:mm")} ngày ${moment(
            this.systemTime.documentSystemTime["close-fill-exam-result"],
            "DD/MM/YYYY HH:mm:ss"
          ).format("DD/MM/YYYY")}`
        );
        return;
      }
      this.$dialog.confirm({
        title: "Hoàn thành",
        okText: "Xác nhận",
        midContent: "Quý phụ huynh vui lòng kiểm tra lại một cách kỹ lưỡng.",
        botContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục.",
        cancelText: "Kiểm tra lại",
        done: async () => {
          this.$loading.active = true;
          this.isEditing = false;
          this.$emit("completeStep", {
            ltvExamResult: grade10ExamResult.ltvExamResult,
            status: "submitted",
          });
        },
      });
    },
    completeGrade6() {
      if (!this.$refs.agreeForm.validate()) {
        this.$alert.error(
          "Xin vui đọc và tích vào ô đồng ý với nội quy của nhà trường"
        );
        return;
      }
      this.$dialog.confirm({
        title: "Hoàn thành",
        okText: "Xác nhận",
        topContent: `Sau khi hoàn thành, thông tin đã được khai báo sẽ <span class="error--text">KHÔNG ĐƯỢC CHỈNH SỬA</span>.`,
        midContent:
          "Quý phụ huynh vui lòng kiểm tra lại một cách kỹ lưỡng trước khi chuyển sang bước tiếp theo.",
        botContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục.",
        cancelText: "Kiểm tra lại",
        done: async () => {
          this.$loading.active = true;
          this.$emit("completeStep", {
            status: "submitted",
          });
        },
      });
    },
    saveDraft() {
      const grade10ExamResult = this.$refs.grade10ExamResult.getData();
      this.$loading.active = true;
      this.$emit("saveDraft", {
        ltvExamResult: grade10ExamResult.ltvExamResult,
      });
    },
    nextStep() {
      this.$loading.active = true;
      this.$emit("nextStep");
    },
  },
};
</script>

<style scoped>
.card-title {
  padding: 0 !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
}
.card-subtitle {
  padding: 0 !important;
  margin-top: 0 !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #3e3e3c;
}
hr.dashed {
  width: 100%;
  border: 1px dashed #e6e4eb;
}
</style>
