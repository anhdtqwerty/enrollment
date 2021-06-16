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
          :before-generate="toggleLoadingScreen(true)"
          :before-finish="toggleLoadingScreen(false)"
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
      <v-btn
        color="admin"
        dark
        class="elevation-0 ml-6"
        :loading="isSelecting"
        @click="exportExcelTemplate"
        ><v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel mẫu</v-btn
      >
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
  "Trạng thái": {
    prop: "status",
    type: String,
  },
  "Số báo danh": {
    prop: "studentExamID",
    type: String,
  },
  "Cơ sở": {
    prop: "department",
    type: String,
  },
  Khối: {
    prop: "grade",
    type: String,
  },
  "Tạo lúc": {
    prop: "createdAt",
    type: String,
  },
  "Cập nhật lúc": {
    prop: "updatedAt",
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
  "Giới tính": {
    prop: "gender",
    type: String,
  },
  "Mã học sinh": {
    prop: "studentId",
    type: String,
  },
  "Trường từng học": {
    prop: "studentId",
    type: String,
  },
  "Thành phố": {
    prop: "studentId",
    type: String,
  },
  "Thông tin người khai": {
    prop: "parent",
    type: String,
  },
  "Thông tin vợ(chồng) người khai": {
    prop: "otherParent",
    type: String,
  },
  "Nguyện vọng 1": {
    prop: "expectation1",
    type: String,
  },
  "Nguyện vọng 2": {
    prop: "expectation2",
    type: String,
  },
  "Nguyện vọng 3": {
    prop: "expectation3",
    type: String,
  },
  "Kết quả học tập": {
    prop: "studyRecord",
    type: String,
  },
  "Thành tích nổi bật": {
    prop: "achivements",
    type: String,
  },
  "Số báo danh dự thi": {
    prop: "studentExamID",
    type: String,
  },
  "Điểm thi Toán": {
    prop: "examMath",
    type: String,
  },
  "Điểm thi Văn": {
    prop: "examLiterature",
    type: String,
  },
  "Điểm thi Anh": {
    prop: "examEnglish",
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
        "Kết quả học tập": {
          field: "studyRecord",
          callback: (value) => {
            if (value) {
              return (
                `Lớp 1:\n` +
                `Toán: ${value.grade1Math}\n` +
                `Văn: ${value.grade1Literature}\n` +
                `Anh: ${value.grade1English}\n` +
                `Hạnh kiểm cả năm: ${value.grade1Morality}\n\n` +
                `Lớp 2:\n` +
                `Toán: ${value.grade2Math}\n` +
                `Văn: ${value.grade2Literature}\n` +
                `Anh: ${value.grade2English}\n` +
                `Hạnh kiểm cả năm: ${value.grade2Morality}\n\n` +
                `Lớp 3:\n` +
                `Toán: ${value.grade3Math}\n` +
                `Văn: ${value.grade3Literature}\n` +
                `Anh: ${value.grade3English}\n` +
                `Hạnh kiểm cả năm: ${value.grade3Morality}\n\n` +
                `Lớp 4:\n` +
                `Toán: ${value.grade4Math}\n` +
                `Văn: ${value.grade4Literature}\n` +
                `Anh: ${value.grade4English}\n` +
                `Hạnh kiểm cả năm: ${value.grade4Morality}\n\n` +
                `Lớp 5:\n` +
                `Toán: ${value.grade5Math}\n` +
                `Văn: ${value.grade5Literature}\n` +
                `Anh: ${value.grade5English}\n` +
                `Hạnh kiểm cả năm: ${value.grade5Morality}\n\n` +
                `Tổng điểm tổng kết toán văn (khối 6): ${value.totalMathLiterature}`
              );
            } else return "";
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
      this.$loading.active = true;
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
                examMath: result.examMath,
                examLiterature: result.examLiterature,
                examEnglish: result.examEnglish,
                totalMark: result.totalMark,
                studentExamID: result.studentExamID,
              },
              submitType: "update-exam-result",
              userPhone: this.user.username,
              isDraft: false,
            };
            if (
              result.passExamText &&
              result.passExamText.includes("Đã trúng tuyển")
            ) {
              query.ltvExamResult.passExam = true;
              query.ltvExamResult.passExamText = result.passExamText;
            } else if (
              result.passExamText &&
              result.passExamText.includes("Không trúng tuyển")
            ) {
              query.ltvExamResult.passExam = false;
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
