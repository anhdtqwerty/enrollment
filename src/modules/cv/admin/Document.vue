<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">Quản lý hồ sơ</div>
      <div class="flex-center">
        <JsonExcel :data="getCVs">
          <!-- <v-btn color="admin" @click="sendState = !sendState" dark outlined>
            <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
          </v-btn> -->
          Download
        </JsonExcel>
      </div>
    </div>
    <v-card class="pa-6 elevation-1 mb-6">
      <DocumentFilter />
    </v-card>

    <v-card class="elevation-1">
      <DocumentTable ref="documentTable" />
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState, mapGetters } from "vuex";
import DocumentFilter from "./DocumentFilter";
import DocumentTable from "./DocumentTable";
import JsonExcel from "vue-json-excel";
import moment from "moment";
// import _ from "lodash";

export default {
  components: {
    DocumentFilter,
    DocumentTable,
    JsonExcel,
  },
  props: {
    role: String,
  },
  data() {
    return {
      dialog: false,
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
            return moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
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
        "Họ và tên người khai": "parentName",
        "Số điện thoại người khai": "parentPhone",
        "Số chứng minh thư người khai": "parentResidentID",
        "Nghề nghiệp người khai": "parentJob",
        "Địa chỉ người khai": "parentAddress",
        "Họ và tên vợ(chồng) người khai": "otherParentName",
        "Số điện thoại vợ(chồng) người khai": "otherParentPhone",
        "Số chứng minh thư vợ(chồng) người khai": "otherParentResidentID",
        "Nghề nghiệp vợ(chồng) người khai": "otherParentJob",
        "Địa chỉ vợ(chồng) người khai": "otherParentAddress",
        "Nguyện vọng 1": {
          field: "expectation1",
          callback: (value) => {
            if (value.clazz) return value.clazz;
            else return value.school;
          },
        },
        "Nguyện vọng 2": {
          field: "expectation2",
          callback: (value) => {
            if (value.clazz) return value.clazz;
            else return value.school;
          },
        },
        "Nguyện vọng 3": {
          field: "expectation3",
          callback: (value) => {
            if (value.clazz) return value.clazz;
            else return value.school;
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    getCVs() {
      return Object.values(this.CVs);
    },
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return "Thêm";
        default:
          return "Thêm lớp học";
      }
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
