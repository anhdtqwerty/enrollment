<template>
  <v-card width="100%" class="elevation-0">
    <v-divider class="py-2" v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-title class="card-title mb-2">Kết quả học tập</v-card-title>
    <!-- <div class="field-label pt-6" v-if="isNoticeDisplay">
      <span class="error--text">(*)</span> Phụ huynh lưu ý: Các thông tin này có
      thể được chỉnh sửa nhưng sẽ bị khóa vào ngày
      <span class="error--text">{{ closeFillInfoTime }}</span
      >.
    </div> -->
    <v-card-subtitle
      v-if="
        (documentStep === 4 && document.type === 'Khối 10') ||
        (documentStep === 3 && document.type === 'Khối 6') ||
        isEditing
      "
      class="card-subtitle"
      v-html="getSubtitle"
    >
    </v-card-subtitle>
    <v-card-text class="d-flex pa-0" v-if="document.type === 'Khối 10'">
      <Grade10ResultForm
        ref="grade10Result"
        :documentStep="documentStep"
        :document="document"
        :isEditing="isEditing"
      />
    </v-card-text>
    <v-card-text
      class="d-flex flex-column pa-0"
      v-if="document.type === 'Khối 6'"
    >
      <div>
        <Grade6ResultForm
          ref="grade6Result"
          :documentStep="documentStep"
          :document="document"
          :isEditing="isEditing"
          v-if="document.type === 'Khối 6'"
        />
      </div>
      <div>
        <Grade6Expectation
          ref="grade6Expectation"
          :documentStep="documentStep"
          :document="document"
          :isEditing="isEditing"
          v-if="document.type === 'Khối 6'"
        />
      </div>
    </v-card-text>
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-end pt-6 px-0">
      <v-btn
        :class="{ 'px-6': $vuetify.breakpoint.mdAndUp }"
        class="py-3 mr-6 text-none"
        color="primary"
        v-if="
          (documentStep === 3 && document.type === 'Khối 6') ||
          (documentStep === 4 && document.type === 'Khối 10') ||
          isEditing
        "
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
        v-if="
          (documentStep === 3 && document.type === 'Khối 6') ||
          (documentStep === 4 && document.type === 'Khối 10') ||
          isEditing
        "
        @click="completeStep"
        large
      >
        <span>Tiếp tục</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 mr-6 text-none"
        color="primary"
        v-if="isNoticeDisplay"
        @click="onEdit"
        outlined
        large
      >
        <span>Chỉnh sửa</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="
          (documentStep !== 3 && document.type === 'Khối 6' && !isEditing) ||
          (documentStep !== 4 && document.type === 'Khối 10' && !isEditing)
        "
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
import moment from "moment";
export default {
  components: {
    Grade6ResultForm,
    Grade6Expectation,
    Grade10ResultForm,
  },
  props: {
    document: Object,
    documentStep: Number,
    systemTime: Object,
    isAdminPreview: Boolean,
  },
  computed: {
    closeFillInfoTime() {
      if (
        this.systemTime.documentSystemTime &&
        this.systemTime.documentSystemTime["close-fill-info"]
      )
        return `${moment(
          this.systemTime.documentSystemTime["close-fill-info"],
          "DD/MM/YYYY HH:mm:ss"
        ).format("DD/MM/YYYY")} lúc ${moment(
          this.systemTime.documentSystemTime["close-fill-info"],
          "DD/MM/YYYY HH:mm:ss"
        ).format("HH:mm")}`;
      return "30/05/2021 lúc 00:00";
    },
    isFillInfoClose() {
      if (this.systemTime && this.systemTime.checkDocumentSystemTime)
        return this.systemTime.checkDocumentSystemTime["close-fill-info"];
      return false;
    },
    getSubtitle() {
      if (this.document.type === "Khối 6")
        return "Vui lòng điền <b>Điểm thi cuối năm</b> môn Toán, Văn, Anh và điểm hạnh kiểm cả năm <br /><i>(Lưu ý: Phần thập phân viết bằng dấu chấm VD: 9.25)</i>";
      return "Vui lòng điền <b>Điểm tổng kết cuối năm</b> môn Toán, Văn, Anh, Lý, Hóa & Xếp loại hạnh kiểm <br /><i>(Lưu ý: Phần thập phân viết bằng dấu chấm VD: 9.25)</i>";
    },
    isNoticeDisplay() {
      if (
        this.documentStep !== 4 &&
        this.document.type === "Khối 10" &&
        !this.isEditing &&
        !this.isFillInfoClose &&
        !this.isAdminPreview
      )
        return true;
      if (
        this.documentStep !== 3 &&
        this.document.type === "Khối 6" &&
        !this.isEditing &&
        !this.isFillInfoClose &&
        !this.isAdminPreview
      )
        return true;
      return false;
    },
  },
  created() {
    this.isEditing = true;
    if (this.documentStep !== 4 && this.document.type === "Khối 10")
      this.isEditing = false;
    else if (this.documentStep !== 3 && this.document.type === "Khối 6")
      this.isEditing = false;
  },
  data() {
    return {
      isEditing: true,
      closeFillInfoDate: "30/05/2021 lúc 00:00",
    };
  },
  methods: {
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
    reset() {
      this.$refs.grade6Result.reset();
      this.$refs.grade6Expectation.reset();
    },
    getGrade6Query(resultForm, expectationForm) {
      return {
        studyRecord: resultForm.studyResult,
        expectation1: expectationForm.expectation1,
        expectation2: expectationForm.expectation2,
        expectation3: expectationForm.expectation3,
        ltvExamResult: resultForm.ltvExamResult,
      };
    },
    getGrade10Query(resultForm) {
      return {
        studyRecord: resultForm.studyResult,
      };
    },
    completeStep() {
      let resultForm,
        expectationForm,
        query = {};
      if (this.document.type === "Khối 6") {
        if (
          !this.$refs.grade6Result.validate() ||
          !this.$refs.grade6Expectation.validate()
        ) {
          this.$alert.error("Xin vui lòng điền hết thông tin bắt buộc");
          return;
        }
        resultForm = this.$refs.grade6Result.getData();
        expectationForm = this.$refs.grade6Expectation.getData();
        query = this.getGrade6Query(resultForm, expectationForm);
      } else if (this.document.type === "Khối 10") {
        if (!this.$refs.grade10Result.validate()) {
          this.$alert.error("Xin vui lòng điền hết thông tin bắt buộc");
          return;
        }
        resultForm = this.$refs.grade10Result.getData();
        query = this.getGrade10Query(resultForm);
      } else
        this.$alert.error(
          "Có lỗi trong quá trình cập nhật hồ sơ, xin vui lòng thử lại"
        );
      this.$dialog.confirm({
        title: "Chú ý",
        okText: "Xác nhận",
        // topContent: `Quý phụ huynh lưu ý:`,
        // midContent: `Sau khi ấn 'Xác nhận', hệ thống sẽ tạm lưu thông tin phụ huynh vừa khai. Phụ huynh có thể thay đổi thông tin này trước ngày <span class='error--text'>${this.closeFillInfoDate}</span>.`,
        // botContent: `Sau <span class='error--text'>${this.closeFillInfoDate}</span>, hệ thống sẽ tự động xác nhận thông tin đã được khai báo và đồng thời khóa khai báo mục này.`,
        topContent: "",
        midContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục",
        botContent: "",
        cancelText: "Kiểm tra lại",
        done: async () => {
          this.$loading.active = true;
          this.isEditing = false;
          this.$emit("completeStep", query);
        },
      });
    },
    saveDraft() {
      this.$loading.active = true;
      if (this.document.type === "Khối 6") {
        const resultForm = this.$refs.grade6Result.getData();
        const expectationForm = this.$refs.grade6Expectation.getData();
        this.$emit(
          "saveDraft",
          this.getGrade6Query(resultForm, expectationForm)
        );
      } else if (this.document.type === "Khối 10") {
        const resultForm = this.$refs.grade10Result.getData();
        this.$emit("saveDraft", this.getGrade10Query(resultForm));
      } else
        this.$alert.error(
          "Có lỗi trong quá trình cập nhật hồ sơ, xin vui lòng thử lại"
        );
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
.field-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #797979;
  margin-bottom: 4px;
}
</style>
