<template>
  <v-card width="100%" class="elevation-0">
    <ExamResultGrade6
      ref="agreeForm"
      :documentStep="documentStep"
      :document="document"
      v-if="document.type === 'Khối 6'"
    />
    <ExamResultGrade10
      ref="agreeForm"
      :documentStep="documentStep"
      :document="document"
      v-if="document.type === 'Khối 10'"
    />
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-end pt-6 px-0">
      <v-btn
        class="px-6 py-3 mr-6 text-none"
        color="primary"
        v-if="document.type === 'Khối 10'"
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
        v-if="document.type === 'Khối 10'"
        @click="completeGrade10"
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="
          document.type === 'Khối 6' &&
            document.ltvExamResult &&
            document.ltvExamResult.passExam
        "
        @click="completeGrade6"
        large
      >
        <span>Đăng ký nhập học</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ExamResultGrade6 from "@/modules/cv/ExamResultGrade6.vue";
import ExamResultGrade10 from "@/modules/cv/ExamResultGrade10.vue";

export default {
  components: {
    ExamResultGrade6,
    ExamResultGrade10,
  },
  props: {
    document: Object,
    documentStep: Number,
  },
  methods: {
    reset() {
      this.$refs.agreeForm.reset();
    },
    completeGrade10() {},
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
        topContent: `Sau khi hoàn thành, thông tin đã được khai báo sẽ KHÔNG ĐƯỢC CHỈNH SỬA.`,
        midContent:
          "Quý phụ huynh vui lòng kiểm tra lại một cách kỹ lưỡng trước khi chuyển sang bước tiếp theo.",
        botContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục.",
        isRedText: [true, false, false],
        cancelText: "Kiểm tra lại",
        done: async () => {
          this.$loading.active = true;
          this.$emit("completeStep", {
            status: "submitted",
            expectation2: "",
          });
        },
      });
    },
    getQuery() {},
    saveDraft() {
      // const resultForm = this.$refs.grade6Result.getData();
      // const expectationForm = this.$refs.grade6Expectation.getData();
      this.$loading.active = true;
      // this.$emit("saveDraft", this.getQuery(resultForm, expectationForm));
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
