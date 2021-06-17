<template>
  <div class="pa-6">
    <DocumentDetailDialog
      :state="dialog"
      :documentId="selectedDocumentId"
      @closeDialog="dialog = !dialog"
    />
    <ConfirmExamResultDialog
      :state="confirmResultDialog"
      :importedDocuments="importedDocuments"
      grade="Khối 6"
      @closeDialog="closeConfirmDialog"
      @updateResult="onUpdateResultDocument"
    />
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">Kết quả thi Khối 6</div>
      <div class="d-flex flex-center">
        <JsonExcel
          :data="updatedCVs"
          :fields="json_fields"
          type="xls"
          worksheet="Hồ sơ"
          name="ho-so-khoi-6.xls"
        >
          <v-btn color="admin" width="167px" dark outlined>
            <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
          </v-btn>
        </JsonExcel>
      </div>
    </div>
    <div
      class="d-flex justify-end align-center mb-6"
      v-if="user.department === 'both'"
    >
      <JsonExcel
        :data="updatedCVs"
        :fields="example_json_fields"
        type="xls"
        worksheet="Hồ sơ"
        name="ket-qua-thi-khoi6-mau.xls"
      >
        <!-- <v-btn color="admin" width="167px" dark outlined>
            <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
          </v-btn> -->
        <v-btn
          color="admin"
          dark
          class="elevation-0 ml-6"
          :loading="isSelecting"
          ><v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel mẫu</v-btn
        >
      </JsonExcel>
      <v-btn
        color="admin"
        class="elevation-0 ml-6"
        width="167px"
        dark
        :loading="isSelecting"
        @click="onButtonClick"
      >
        <v-icon left>mdi-upload</v-icon>Upload Excel
        <input
          ref="uploader"
          type="file"
          class="d-none"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          @change="onFileChanged"
        />
      </v-btn>
    </div>
    <v-card class="pa-6 elevation-1 mb-6">
      <DocumentFilter @onFilterChanged="onFilterChanged" />
    </v-card>

    <v-card class="elevation-1">
      <Grade6ResultTable
        ref="grade6Result"
        @onDocumentDetail="onDocumentDetail"
      />
    </v-card>
  </div>
</template>

<script>
const schema = {
  "Mã hồ sơ": {
    prop: "code",
    type: String,
  },
  "Họ và tên": {
    prop: "name",
    type: String,
  },
  "Ngày sinh": {
    prop: "dob",
    type: String,
  },
  "Số lượng câu đúng": {
    prop: "examCorrectAnswer",
    type: String,
  },
  "Tỉ lệ % câu đúng": {
    prop: "examCorrectRate",
    type: String,
  },
  "Điểm bài Khảo sát ĐGNL Tổng hợp": {
    prop: "examMark",
    type: String,
  },
  "Tổng điểm học bạ": {
    prop: "totalMathLiterature",
    type: String,
  },
  "Điểm ưu tiên": {
    prop: "priorityMark",
    type: String,
  },
  "Tổng điểm": {
    prop: "totalMark",
    type: String,
  },
  "Kết quả trúng tuyển": {
    prop: "passExamText",
    type: String,
  },
};
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from "vuex";

import DocumentFilter from "./DocumentFilter";
import Grade6ResultTable from "./Grade6ResultTable";
import DocumentDetailDialog from "./DocumentDetailDialog";
import ConfirmExamResultDialog from "./ConfirmExamResultDialog";
import readXlsxFile from "read-excel-file";
import JsonExcel from "vue-json-excel";
import moment from "moment";
import { chunk } from "lodash";

export default {
  components: {
    DocumentFilter,
    Grade6ResultTable,
    JsonExcel,
    DocumentDetailDialog,
    ConfirmExamResultDialog,
  },
  props: {
    role: String,
  },
  data() {
    return {
      dialog: false,
      confirmResultDialog: false,
      importedDocuments: [],
      selectedDocumentId: "",
      isSelecting: false,
      selectedFile: null,
      loading: false,
      loadingDownload: false,
      updatedCVs: [],
      example_json_fields: {
        "Mã hồ sơ": "code",
        "Họ và tên": "name",
        "Ngày sinh": {
          field: "dob",
          callback: (value) => {
            if (value) return moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
            return "";
          },
        },
        "Số lượng câu đúng": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.examCorrectAnswer;
          },
        },
        "Tỉ lệ % câu đúng": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.examCorrectRate;
          },
        },
        "Điểm bài Khảo sát ĐGNL Tổng hợp": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.examMark;
          },
        },
        "Tổng điểm học bạ": {
          field: "studyRecord",
          callback: (value) => {
            return value.totalMathLiterature;
          },
        },
        "Điểm ưu tiên": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.priorityMark;
          },
        },
        "Tổng điểm": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.totalMark;
          },
        },
        "Kết quả trúng tuyển": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.passExamText;
          },
        },
      },
      json_fields: {
        "Mã hồ sơ": "code",
        "Trạng thái": {
          field: "status",
          callback: (value) => {
            if (value === "submitted") return "Đã nộp";
            else if (value === "created") return "Vừa tạo";
            else return "Đang khai";
          },
        },
        Khối: {
          field: "type",
          callback: (value) => {
            if (value === "Khối 6") return "6";
            else return "10";
          },
        },
        "Tạo lúc": {
          field: "createdAt",
          callback: (value) => {
            return moment(value).format("DD/MM/YYYY HH:mm:ss");
          },
        },
        "Cập nhật lúc": {
          field: "updatedAt",
          callback: (value) => {
            return moment(value).format("DD/MM/YYYY HH:mm:ss");
          },
        },
        "Cơ sở": {
          field: "department",
          callback: (value) => {
            if (value === "unset") return "Chưa có thông tin";
            else return value;
          },
        },
        "Họ và tên": "name",
        "Ngày sinh": {
          field: "dob",
          callback: (value) => {
            if (value) return moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
            return "";
          },
        },
        "Giới tính": {
          field: "gender",
          callback: (value) => {
            return value === "female" ? "Nữ" : "Nam";
          },
        },
        "Mã học sinh": "studentId",
        "Trường từng học": "school",
        "Thành phố": "city",
        "Thông tin người khai": {
          field: "parent",
          callback: (value) => {
            return (
              `Họ và tên: ${value.parentName || ""}\n` +
              `Số điện thoại: ${value.parentPhone || ""}\n` +
              `Số chứng minh thư: ${value.parentResidentID || ""}\n` +
              `Nghề nghiệp: ${value.parentJob || ""}\n` +
              `Địa chỉ: ${value.parentAddress || ""}`
            );
          },
        },
        "Thông tin vợ(chồng) người khai": {
          field: "otherParent",
          callback: (value) => {
            return (
              `Họ và tên: ${value.otherParentName || ""}\n` +
              `Số điện thoại: ${value.otherParentPhone || ""}\n` +
              `Số chứng minh thư: ${value.otherParentResidentID || ""}\n` +
              `Nghề nghiệp: ${value.otherParentJob || ""}\n` +
              `Địa chỉ: ${value.otherParentAddress || ""}`
            );
          },
        },
        "Nguyện vọng 1": {
          field: "expectation1",
          callback: (value) => {
            if (value.clazz) return value.clazz;
            else if (value.school) return value.school;
            else return "";
          },
        },
        "Nguyện vọng 2": {
          field: "expectation2",
          callback: (value) => {
            if (value.clazz) return value.clazz;
            else if (value.school) return value.school;
            else return "";
          },
        },
        "Nguyện vọng 3": {
          field: "expectation3",
          callback: (value) => {
            if (value.clazz) return value.clazz;
            else if (value.school) return value.school;
            else return "";
          },
        },
        T1: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade1Math;
          },
        },
        V1: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade1Literature;
          },
        },
        A1: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade1English;
          },
        },
        HK1: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade1Morality;
          },
        },
        T2: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade2Math;
          },
        },
        V2: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade2Literature;
          },
        },
        A2: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade2English;
          },
        },
        HK2: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade2Morality;
          },
        },
        T3: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade3Math;
          },
        },
        V3: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade3Literature;
          },
        },
        A3: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade3English;
          },
        },
        HK3: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade3Morality;
          },
        },
        T4: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade4Math;
          },
        },
        V4: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade4Literature;
          },
        },
        A4: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade4English;
          },
        },
        HK4: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade4Morality;
          },
        },
        T5: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade5Math;
          },
        },
        V5: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade5Literature;
          },
        },
        A5: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade5English;
          },
        },
        HK5: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade5Morality;
          },
        },
        "Số lượng câu đúng": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.examCorrectAnswer;
          },
        },
        "Tỉ lệ % câu đúng": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.examCorrectAnswer;
          },
        },
        "Điểm bài Khảo sát ĐGNL Tổng hợp": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.examMark;
          },
        },
        "Tổng điểm học bạ": {
          field: "studyRecord",
          callback: (value) => {
            return value.totalMathLiterature;
          },
        },
        "Điểm ưu tiên": {
          field: "ltvExamResult",
          callback: (value) => {
            return value.priorityMark;
          },
        },
        "Thành tích nổi bật": "studyRecord.achievements",
        "Số báo danh dự thi": "ltvExamResult.studentExamID",
        "Điểm thi Toán": "ltvExamResult.examMath",
        "Điểm thi Văn": "ltvExamResult.examLiterature",
        "Điểm thi Anh": "ltvExamResult.examEnglish",
        "Điểm cộng": "ltvExamResult.priorityMark",
        "Tổng điểm": "ltvExamResult.totalMark",
        "Kết quả trúng tuyển": "ltvExamResult.passExamText",
      },
    };
  },
  created() {
    this.updateCVs(this.CVs);
  },
  watch: {
    CVs(newValue) {
      this.updateCVs(newValue);
    },
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    async exportExcelTemplate() {
      this.$loading.active = true;
      window.location.href = `${this.$baseUrl}grade6-exam-result.xlsx`;
      this.$loading.active = false;
    },
    async onFilterChanged(data) {
      this.$loading.active = true;
      await this.fetchCVs({
        ...data,
        _sort: "updatedAt:DESC",
      });
      this.$loading.active = false;
    },
    onDocumentDetail(data) {
      this.dialog = true;
      this.selectedDocumentId = data;
    },
    updateCVs(data) {
      this.updatedCVs = data.map((cv) => {
        return {
          ...cv,
          parent: {
            parentName: cv.parentName,
            parentPhone: cv.parentPhone,
            parentAddress: cv.parentAddress,
            parentJob: cv.parentJob,
            parentResidentID: cv.parentResidentID,
          },
          otherParent: {
            otherParentName: cv.otherParentName,
            otherParentPhone: cv.otherParentPhone,
            otherParentAddress: cv.otherParentAddress,
            otherParentJob: cv.otherParentJob,
            otherParentResidentID: cv.otherParentResidentID,
          },
        };
      });
    },
    toggleLoadingScreen(data) {
      this.loadingDownload = data;
      this.$loading.active = data;
    },
    closeConfirmDialog() {
      this.isSelecting;
      this.confirmResultDialog = false;
      this.$refs.uploader.value = null;
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    async onFileChanged(e) {
      this.$loading.active = true;
      this.selectedFile = e.target.files[0];
      let readFileResult;
      try {
        readFileResult = await readXlsxFile(this.selectedFile, {
          schema,
        });
      } catch (error) {
        this.$alert.error(
          "File không có định dạng .xlsx hoặc có dữ liệu không hợp lệ (tham khảo mẫu file)"
        );
        this.$loading.active = false;
        return;
      }
      this.$alert.success("Đã đọc File thành công!");
      if (readFileResult.errors.length !== 0) {
        const error = readFileResult.errors[0];
        this.$alert.error(
          `Lỗi Dòng ${error.row} - Cột ${error.column} - ${error.value}: ${error.error}`
        );
        this.$loading.active = false;
        return;
      } else {
        const results = readFileResult.rows;
        this.importedDocuments = results;
        this.confirmResultDialog = true;
      }
      this.$loading.active = false;
    },
    async onUpdateResultDocument(results) {
      this.$refs.uploader.value = null;
      const examResultGroups = chunk(results, 5);
      for (let i = 0; i < examResultGroups.length; i++) {
        try {
          const examResults = examResultGroups[i];
          const promises = examResults.map(async (result) => {
            if (
              result.department !== this.user.department &&
              this.user.department !== "both"
            )
              return;
            const existingCV = await this.fetchCV({
              code: result.code,
              type: "Khối 6",
            });
            if (!existingCV) return;
            let query = {
              code: result.code,
              ltvExamResult: {
                ...existingCV.ltvExamResult,
                examMark: result.examMark,
                examCorrectAnswer: result.examCorrectAnswer,
                examCorrectRate: result.examCorrectRate,
                totalMark: result.totalMark,
              },
              submitType: "update-exam-result",
              userPhone: this.user.username,
              isDraft: false,
            };
            if (
              result.passExamText &&
              result.passExamText.toLowerCase().includes("đã trúng tuyển")
            ) {
              query.ltvExamResult.passExamType = "pass";
              query.ltvExamResult.passExamText = result.passExamText;
            } else if (
              result.passExamText &&
              result.passExamText.toLowerCase().includes("vi phạm")
            ) {
              query.ltvExamResult.passExamType = "violation";
              query.ltvExamResult.passExamText = result.passExamText;
            } else if (
              result.passExamText &&
              result.passExamText.toLowerCase().includes("không trúng tuyển")
            ) {
              query.ltvExamResult.passExamType = "fail";
              query.ltvExamResult.passExamText = result.passExamText;
            } else if (
              result.passExamText &&
              (result.passExamText.toLowerCase().includes("dự bị") ||
                result.passExamText.toLowerCase().includes("dự khuyết"))
            ) {
              query.ltvExamResult.passExamType = "reserve";
              query.ltvExamResult.passExamText = result.passExamText;
            }
            await this.updateCV(query);
          });
          await Promise.all(promises);
        } catch (error) {
          this.$alert.error(error);
        }
      }
      this.$alert.success(
        "Đã cập nhật thông tin điểm của tất cả thí sinh thành công!"
      );
      this.confirmResultDialog = false;
      await this.$refs.grade6Result.refresh({
        _sort: "updatedAt:DESC",
      });
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.chip-width {
  min-width: 82px;
  justify-content: center;
}
.component-title {
  color: #0d47a1;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
</style>
