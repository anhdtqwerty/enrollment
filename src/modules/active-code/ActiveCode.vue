<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">Quản lý mã kích hoạt</div>
      <div class="flex-center">
        <JsonExcel
          :data="activeCodes"
          :fields="json_fields"
          :before-generate="toggleLoadingScreen(true)"
          :before-finish="toggleLoadingScreen(false)"
          type="xls"
          worksheet="Hồ sơ"
          name="ma-kich-hoat.xls"
        >
          <v-btn color="admin" dark outlined>
            <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
          </v-btn>
        </JsonExcel>
      </div>
    </div>
    <v-card
      class="pa-6 elevation-1 mb-6 d-flex justify-space-around align-center"
    >
      <v-btn color="admin" @click="toggleGrade6Dialog" class="elevation-0" dark
        ><v-icon left>mdi-plus</v-icon>Thêm mã kích hoạt khối 6</v-btn
      >
      <v-divider vertical></v-divider>
      <v-btn color="admin" @click="toggleGrade10Dialog" class="elevation-0" dark
        ><v-icon left>mdi-plus</v-icon>Thêm mã kích hoạt khối 10</v-btn
      >
    </v-card>
    <v-card class="pa-6 elevation-1 mb-6">
      <active-code-filter @onFilterChanged="onFilterChanged" />
    </v-card>

    <v-card class="elevation-1">
      <active-code-table ref="activeCodeTable" />
    </v-card>

    <new-active-code-dialog
      :state="dialog"
      :grade="grade"
      style="margin: 0 20px"
      @refresh="refresh()"
    ></new-active-code-dialog>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState, mapGetters } from "vuex";

import NewActiveCodeDialog from "./NewActiveCodeDialog";
import ActiveCodeFilter from "./ActiveCodeFilter";
import ActiveCodeTable from "./ActiveCodeTable";
import moment from "moment";
import JsonExcel from "vue-json-excel";

export default {
  components: {
    NewActiveCodeDialog,
    ActiveCodeFilter,
    ActiveCodeTable,
    JsonExcel,
  },
  props: {
    role: String,
  },
  data() {
    return {
      dialog: false,
      grade: "Khối 6",
      json_fields: {
        "Mã kích hoạt": "code",
        Khối: "grade",
        "Cơ sở": {
          field: "department",
          callback: (value) => {
            if (value && value !== "unset") return value;
            else return "";
          },
        },
        "Trạng thái": {
          field: "status",
          callback: (value) => {
            if (value === "active") return "Đã kích hoạt";
            else if (value === "inactive") return "Chưa kích hoạt";
            else return "Đang tắt";
          },
        },
        "Ngày tạo mã": {
          field: "createdAt",
          callback: (value) => {
            if (value) return moment(value).format("DD/MM/YYYY HH:mm:ss");
            else return "";
          },
        },
        "Ngày kích hoạt": {
          field: "activeDate",
          callback: (value) => {
            if (value) return moment(value).format("DD/MM/YYYY HH:mm:ss");
            else return "";
          },
        },
        "Tài khoản kích hoạt": "userPhone",
        "Số lần in": "printNum",
        "Người xuất mã": "createdBy",
      },
    };
  },
  computed: {
    ...mapGetters("activeCode", ["activeCodes", "activeCode"]),
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
  methods: {
    ...mapActions("activeCode", ["fetchActiveCodes"]),
    async refresh() {
      await this.$refs.activeCodeTable.refresh();
    },
    toggleLoadingScreen(data) {
      this.$loading.active = data;
    },
    toggleGrade6Dialog() {
      this.dialog = !this.dialog;
      this.grade = "Khối 6";
    },
    toggleGrade10Dialog() {
      this.dialog = !this.dialog;
      this.grade = "Khối 10";
    },
    async onFilterChanged(data) {
      this.$loading.active = true;
      await this.fetchActiveCodes({
        ...data,
        _sort: "updatedAt:DESC",
      });
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
  color: #0d47a1;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
</style>
