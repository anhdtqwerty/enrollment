<template>
  <div class="pa-6">
    <DocumentDetailDialog
      :state="dialog"
      :documentId="selectedDocumentId"
      @closeDialog="dialog = !dialog"
    />
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">Quản lý hồ sơ</div>
      <div class="flex-center">
        <JsonExcel
          :data="updatedCVs"
          :fields="json_fields"
          :before-generate="toggleLoadingScreen(true)"
          :before-finish="toggleLoadingScreen(false)"
          worksheet="Hồ sơ"
          name="ho-so.xls"
        >
          <v-btn color="admin" dark outlined>
            <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
          </v-btn>
        </JsonExcel>
      </div>
    </div>
    <v-card class="pa-6 elevation-1 mb-6">
      <DocumentFilter @onFilterChanged="onFilterChanged" />
    </v-card>

    <v-card class="elevation-1">
      <DocumentTable ref="documentTable" @onDocumentDetail="onDocumentDetail" />
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState, mapGetters } from "vuex";
import DocumentFilter from "./DocumentFilter";
import DocumentTable from "./DocumentTable";
import DocumentDetailDialog from "./DocumentDetailDialog";
import JsonExcel from "vue-json-excel";
import moment from "moment";
// import _ from "lodash";

export default {
  components: {
    DocumentDetailDialog,
    DocumentFilter,
    DocumentTable,
    JsonExcel,
  },
  props: {
    role: String,
  },
  data() {
    return {
      loading: false,
      selectedDocumentId: "",
      updatedCVs: [],
      dialog: false,
      json_fields: {
        "Mã hồ sơ": "code",
        "Trạng thái": {
          field: "status",
          callback: (value) => {
            if (value === "submitted") return "Đã nộp";
            else if (value === "created") return "Vừa tạo";
            else if (value === "disabled") return "Đang tắt";
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
        "Tài khoản kích hoạt": {
          field: "username",
          callback: (value) => {
            return value;
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
        // "Kết quả học tập": {
        //   field: "studyRecord",
        //   callback: (value) => {
        //     if (value && value.grade1Math) {
        //       return (
        //         `Lớp 1:\n` +
        //         `Toán: ${value.grade1Math}\n` +
        //         `Văn: ${value.grade1Literature}\n` +
        //         `Anh: ${value.grade1English}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade1Morality}\n\n` +
        //         `Lớp 2:\n` +
        //         `Toán: ${value.grade2Math}\n` +
        //         `Văn: ${value.grade2Literature}\n` +
        //         `Anh: ${value.grade2English}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade2Morality}\n\n` +
        //         `Lớp 3:\n` +
        //         `Toán: ${value.grade3Math}\n` +
        //         `Văn: ${value.grade3Literature}\n` +
        //         `Anh: ${value.grade3English}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade3Morality}\n\n` +
        //         `Lớp 4:\n` +
        //         `Toán: ${value.grade4Math}\n` +
        //         `Văn: ${value.grade4Literature}\n` +
        //         `Anh: ${value.grade4English}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade4Morality}\n\n` +
        //         `Lớp 5:\n` +
        //         `Toán: ${value.grade5Math}\n` +
        //         `Văn: ${value.grade5Literature}\n` +
        //         `Anh: ${value.grade5English}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade5Morality}\n\n` +
        //         `Tổng điểm tổng kết toán văn (khối 6): ${value.totalMathLiterature}`
        //       );
        //     } else if (value && value.grade6Math) {
        //       return (
        //         `Lớp 6:\n` +
        //         `Toán: ${value.grade6Math}\n` +
        //         `Văn: ${value.grade6Literature}\n` +
        //         `Anh: ${value.grade6English}\n` +
        //         `Lý: ${value.grade6Physics}\n` +
        //         `Hóa: ${value.grade6Chemistry}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade6Morality}\n\n` +
        //         `Lớp 7:\n` +
        //         `Toán: ${value.grade7Math}\n` +
        //         `Văn: ${value.grade7Literature}\n` +
        //         `Anh: ${value.grade7English}\n` +
        //         `Lý: ${value.grade7Physics}\n` +
        //         `Hóa: ${value.grade7Chemistry}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade7Morality}\n\n` +
        //         `Lớp 8:\n` +
        //         `Toán: ${value.grade8Math}\n` +
        //         `Văn: ${value.grade8Literature}\n` +
        //         `Anh: ${value.grade8English}\n` +
        //         `Lý: ${value.grade8Physics}\n` +
        //         `Hóa: ${value.grade8Chemistry}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade8Morality}\n\n` +
        //         `Lớp 9:\n` +
        //         `Toán: ${value.grade9Math}\n` +
        //         `Văn: ${value.grade9Literature}\n` +
        //         `Anh: ${value.grade9English}\n` +
        //         `Lý: ${value.grade9Physics}\n` +
        //         `Hóa: ${value.grade9Chemistry}\n` +
        //         `Hạnh kiểm cả năm: ${value.grade9Morality}`
        //       );
        //     } else return "";
        //   },
        // },
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
        "Tổng điểm tổng kết toán văn Khối 6": {
          field: "studyRecord",
          callback: (value) => {
            return value.totalMathLiterature;
          },
        },
        T6: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade6Math;
          },
        },
        V6: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade6Literature;
          },
        },
        A6: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade6English;
          },
        },
        L6: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade6Chemistry;
          },
        },
        HK6: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade6Morality;
          },
        },
        T7: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade7Math;
          },
        },
        V7: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade7Literature;
          },
        },
        A7: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade7English;
          },
        },
        L7: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade7Chemistry;
          },
        },
        HK7: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade7Morality;
          },
        },
        T8: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade8Math;
          },
        },
        V8: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade8Literature;
          },
        },
        A8: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade8English;
          },
        },
        L8: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade8Chemistry;
          },
        },
        H8: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade8Chemistry;
          },
        },
        HK8: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade8Morality;
          },
        },
        T9: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade9Math;
          },
        },
        V9: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade9Literature;
          },
        },
        A9: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade9English;
          },
        },
        L9: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade9Physics;
          },
        },
        H9: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade9Chemistry;
          },
        },
        HK9: {
          field: "studyRecord",
          callback: (value) => {
            return value.grade9Morality;
          },
        },

        "Thành tích nổi bật": "studyRecord.achievements",
        "Diện tuyển thẳng (khối 10)": "studyRecord.recuitingStraightType",
        "Nguyện vọng Ban (khối 10)": {
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
        "Điểm thi Sử (khối 10)": "ltvExamResult.examHistory",
        "Điểm cộng (khối 10)": "ltvExamResult.priorityMark",
        "Tổng điểm ban A (khối 10)": "ltvExamResult.totalA",
        "Tổng điểm ban A1 (khối 10)": "ltvExamResult.totalA1",
        "Tổng điểm ban D (khối 10)": "ltvExamResult.totalD",
        "Tổng điểm (khối 6)": "ltvExamResult.totalMark",
        "Kết quả trúng tuyển": "ltvExamResult.passExamText",
      },
    };
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return "Thêm";
        default:
          return "Thêm lớp học";
      }
    },
    noAvatarCVs() {
      return this.CVs.filter(
        (cv) => !cv.avatar || cv.avatar == "" || cv.avatar.length == 0
      );
    },
  },
  watch: {
    CVs(newValue) {
      this.updateCVs(newValue);
    },
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "startHourlySMSTask", "setCVs"]),
    async onFilterChanged(data) {
      this.$loading.active = true;
      await this.fetchCVs({
        ...data,
        avatar_null: true,
        _sort: "updatedAt:DESC",
      });
      this.$loading.active = false;
    },
    onDocumentDetail(data) {
      this.dialog = true;
      this.selectedDocumentId = data;
    },
    toggleLoadingScreen(data) {
      this.loading = data;
      this.$loading.active = data;
    },
    updateCVs(data) {
      this.updatedCVs = data.map((cv) => {
        return {
          ...cv,
          username: cv.parent ? cv.parent.username : "",
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
