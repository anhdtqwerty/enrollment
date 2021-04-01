<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">Kết quả thi Khối 10</div>
      <div class="d-flex flex-center">
        <JsonExcel
          :data="updatedCVs"
          :fields="json_fields"
          :before-generate="toggleLoadingScreen(true)"
          :before-finish="toggleLoadingScreen(false)"
          type="xlsx"
          worksheet="Hồ sơ"
          name="ho-so-khoi-10.xls"
        >
          <v-btn color="admin" outlined dark>
            <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
          </v-btn>
        </JsonExcel>
        <v-btn
          color="admin"
          dark
          class="elevation-0 ml-6"
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
    </div>
    <v-card class="pa-6 elevation-1 mb-6">
      <DocumentFilter />
    </v-card>

    <v-card class="elevation-1">
      <Grade10ResultTable ref="grade6Result" />
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
  "Điểm thi Sử": {
    prop: "examHistory",
    type: String,
  },
  "Nguyện vọng Ban": {
    prop: "groupExpectation",
    type: String,
  },
  "Điểm cộng": {
    prop: "priorityMark",
    type: String,
  },
  "Tổng điểm ban A": {
    prop: "totalA",
    type: String,
  },
  "Tổng điểm ban A1": {
    prop: "totalA",
    type: String,
  },
  "Tổng điểm ban D": {
    prop: "totalA",
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
import Grade10ResultTable from "./Grade10ResultTable";
import readXlsxFile from "read-excel-file";
import JsonExcel from "vue-json-excel";
import moment from "moment";

export default {
  components: {
    DocumentFilter,
    Grade10ResultTable,
    JsonExcel,
  },
  props: {
    role: String,
  },
  data() {
    return {
      dialog: false,
      isSelecting: false,
      selectedFile: null,
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
            return moment(value).format("DD/MM/YYYY hh:mm:ss");
          },
        },
        "Cập nhật lúc": {
          field: "updatedAt",
          callback: (value) => {
            return moment(value).format("DD/MM/YYYY hh:mm:ss");
          },
        },
        "Cơ sở": "department",
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
            if (value && value.grade6Math) {
              return (
                `Lớp 6:\n` +
                `Toán: ${value.grade6Math}\n` +
                `Văn: ${value.grade6Literature}\n` +
                `Anh: ${value.grade6English}\n` +
                `Lý: ${value.grade6Physics}\n` +
                `Hóa: ${value.grade6Chemistry}\n` +
                `Hạnh kiểm cả năm: ${value.grade6Morality}\n\n` +
                `Lớp 7:\n` +
                `Toán: ${value.grade7Math}\n` +
                `Văn: ${value.grade7Literature}\n` +
                `Anh: ${value.grade7English}\n` +
                `Lý: ${value.grade7Physics}\n` +
                `Hóa: ${value.grade7Chemistry}\n` +
                `Hạnh kiểm cả năm: ${value.grade7Morality}\n\n` +
                `Lớp 8:\n` +
                `Toán: ${value.grade8Math}\n` +
                `Văn: ${value.grade8Literature}\n` +
                `Anh: ${value.grade8English}\n` +
                `Lý: ${value.grade8Physics}\n` +
                `Hóa: ${value.grade8Chemistry}\n` +
                `Hạnh kiểm cả năm: ${value.grade8Morality}\n\n` +
                `Lớp 9:\n` +
                `Toán: ${value.grade9Math}\n` +
                `Văn: ${value.grade9Literature}\n` +
                `Anh: ${value.grade9English}\n` +
                `Lý: ${value.grade9Physics}\n` +
                `Hóa: ${value.grade9Chemistry}\n` +
                `Hạnh kiểm cả năm: ${value.grade9Morality}`
              );
            } else return "";
          },
        },
        "Thành tích nổi bật": "studyRecord.achievements",
        "Diện tuyển thẳng": "studyRecord.recuitingStraightType",
        "Nguyện vọng Ban": {
          field: "ltvExamResult",
          callback: (value) => {
            return (
              `Nguyện vọng 1: ${value.groupExpectation1 || ""}\n` +
              `Nguyện vọng 2: ${value.groupExpectation2 || ""}`
            );
          },
        },
        "Số báo danh dự thi": "ltvExamResult.studentExamID",
        "Điểm thi Toán": "ltvExamResult.examMath",
        "Điểm thi Văn": "ltvExamResult.examLiterature",
        "Điểm thi Anh": "ltvExamResult.examEnglish",
        "Điểm thi Sử": "ltvExamResult.examHistory",
        "Điểm cộng": "ltvExamResult.priorityMark",
        "Tổng điểm ban A": "ltvExamResult.totalA",
        "Tổng điểm ban A1": "ltvExamResult.totalA1",
        "Tổng điểm ban D": "ltvExamResult.totalD",
        "Kết quả trúng tuyển": "ltvExamResult.passExamText",
      },
    };
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
    toggleLoadingScreen(data) {
      this.$loading.active = data;
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
    async onFileChanged(e) {
      this.$loading.active = true;
      this.selectedFile = e.target.files[0];
      const readFileResult = await readXlsxFile(this.selectedFile, { schema });
      if (readFileResult.errors.length !== 0) {
        const error = readFileResult.errors[0];
        this.$alert.error(
          `Lỗi Dòng ${error.row} - Cột ${error.column} - ${error.value}: ${error.error}`
        );
        return;
      } else {
        this.$alert.success(
          "Đọc file thành công! Đang xử lý dữ liệu, xin vui lòng đợi ít phút"
        );

        const results = readFileResult.rows;
        const promises = results.map(async (result) => {
          if (
            result.department !== this.user.department &&
            this.user.department !== "both"
          )
            return;
          const existingCV = await this.fetchCV({
            code: result.code,
            type: "Khối 10",
          });
          if (!existingCV) return;
          let query = {
            code: result.code,
            submitType: "update-exam-result",
            ltvExamResult: { ...existingCV.ltvExamResult },
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
        await this.$refs.grade6Result.refresh({
          _sort: "updatedAt:DESC",
        });
      }
      this.$loading.active = false;
    },
  },
  created() {
    this.updateCVs(this.CVs);
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
