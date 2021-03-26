<template>
  <v-card width="100%" class="elevation-0">
    <v-card-title class="card-title mb-2">Kết quả học tập</v-card-title>
    <v-card-subtitle class="card-subtitle" v-html="getSubtitle">
    </v-card-subtitle>
    <v-card-text class="d-flex pa-0">
      <Grade6ResultForm
        ref="grade6Result"
        :documentStep="documentStep"
        :document="document"
        v-if="document.type === 'Khối 6'"
      />
      <Grade10ResultForm
        ref="grade10Result"
        :documentStep="documentStep"
        :document="document"
        v-if="document.type === 'Khối 10'"
      />
    </v-card-text>
    <v-card-text class="d-flex pa-0">
      <Grade6Expectation
        ref="grade6Expectation"
        :documentStep="documentStep"
        :document="document"
        v-if="document.type === 'Khối 6'"
      />
    </v-card-text>
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-end pt-6 px-0">
      <v-btn
        class="px-6 py-3 mr-6 text-none"
        color="primary"
        v-if="documentStep === 3"
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
        v-if="documentStep === 3"
        @click="completeStep"
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="documentStep !== 3"
        @click="nextStep"
        large
      >
        <span>Tiếp theo</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Grade6ResultForm from "@/modules/cv/Grade6ResultForm.vue";
import Grade6Expectation from "@/modules/cv/Grade6Expectation.vue";
import Grade10ResultForm from "@/modules/cv/Grade10ResultForm.vue";

export default {
  components: {
    Grade6ResultForm,
    Grade6Expectation,
    Grade10ResultForm,
  },
  props: {
    document: Object,
    documentStep: Number,
  },
  computed: {
    getSubtitle() {
      if (this.document.type === "Khối 6")
        return "Vui lòng điền <b>Điểm thi cuối năm</b> môn Toán, Văn, Anh và điểm hạnh kiểm cả năm <br /><i>(Lưu ý: Phần thập phân viết bằng dấu chấm VD: 9.25)</i>";
      return "Vui lòng điền <b>Điểm tổng kết cuối năm</b> môn Toán, Văn, Anh, Lý, Hóa & Xếp loại hạnh kiểm <br /><i>(Lưu ý: Phần thập phân viết bằng dấu chấm VD: 9.25)</i>";
    },
  },
  methods: {
    reset() {
      this.$refs.grade6Result.reset();
      this.$refs.grade6Expectation.reset();
    },
    getQuery(resultForm, expectationForm) {
      return {
        studyRecord: resultForm.studyResult,
        expectation1: expectationForm.expectation1,
        expectation2: expectationForm.expectation2,
        expectation3: expectationForm.expectation3,
      };
    },
    completeStep() {
      const resultForm = this.$refs.grade6Result.getData();
      const expectationForm = this.$refs.grade6Expectation.getData();
      if (
        !this.$refs.grade6Result.validate() ||
        !this.$refs.grade6Expectation.validate()
      ) {
        this.$alert.error("Xin vui lòng điền hết thông tin bắt buộc");
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
          this.$emit(
            "completeStep",
            this.getQuery(resultForm, expectationForm)
          );
        },
      });
    },
    saveDraft() {
      const resultForm = this.$refs.grade6Result.getData();
      const expectationForm = this.$refs.grade6Expectation.getData();
      console.log(resultForm);
      this.$loading.active = true;
      this.$emit("saveDraft", this.getQuery(resultForm, expectationForm));
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
