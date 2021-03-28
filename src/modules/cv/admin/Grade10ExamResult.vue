<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">Kết quả thi Khối 10</div>
      <div class="flex-center">
        <v-btn
          color="admin"
          dark
          outlined
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
  "Số báo danh": {
    prop: "studentExamID",
    type: String,
  },
  "Cơ sở": {
    prop: "department",
    type: String,
  },
  "Họ và tên": {
    prop: "name",
    type: String,
  },
  "Ngày sinh": {
    prop: "dob",
    type: Date,
  },
  "Điểm ban A": {
    prop: "totalA",
    type: Number,
  },
  "Điểm ban A1": {
    prop: "totalA1",
    type: Number,
  },
  "Điểm ban D": {
    prop: "totalD",
    type: Number,
  },
  NV1: {
    prop: "groupExpectation1",
    type: String,
  },
  NV2: {
    prop: "groupExpectation2",
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
// import moment from "moment";

export default {
  components: {
    DocumentFilter,
    Grade10ResultTable,
  },
  props: {
    role: String,
  },
  data() {
    return {
      dialog: false,
      isSelecting: false,
      selectedFile: null,
    };
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
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
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.chip-width {
  min-width: 82px;
  justify-content: center;
}
.component-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
</style>
