<template>
  <div>
    <v-data-table
      item-key="id"
      :headers="headers"
      :loading="loading"
      :items="CVs"
      :items-per-page="10"
      :disable-sort="$vuetify.breakpoint.smAndDown"
      v-bind="this.$attrs"
    >
      <template v-slot:[`item.code`]="{ item }">
        {{ item | getCode }}
      </template>
      <template v-slot:[`item.department`]="{ item }">
        {{ item | getDepartment }}
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item | getStudent }}
      </template>
      <template v-slot:[`item.dob`]="{ item }">
        {{ item | getStudentDob }}
      </template>
      <template v-slot:[`item.examMath`]="{ item }">
        {{ item | getExamMath }}
      </template>
      <template v-slot:[`item.examLiterature`]="{ item }">
        {{ item | getExamLiterature }}
      </template>
      <template v-slot:[`item.examEnglish`]="{ item }">
        {{ item | getExamEnglish }}
      </template>
      <template v-slot:[`item.totalMark`]="{ item }">
        {{ item | getTotalMark }}
      </template>
      <template v-slot:[`item.expectation1`]="{ item }">
        {{ getExpectation1(item) }}
      </template>
      <template v-slot:[`item.expectation2`]="{ item }">
        {{ getExpectation2(item) }}
      </template>
      <template v-slot:[`item.expectation3`]="{ item }">
        {{ getExpectation3(item) }}
      </template>
      <template v-slot:[`item.examPass`]="{ item }">
        <span :class="getColor(item)">{{ item | isPassExam }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

const originHeaders = [
  {
    text: "Mã hồ sơ",
    value: "code",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Cơ sở",
    value: "department",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Họ và tên",
    value: "name",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Ngày sinh",
    value: "dob",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Toán",
    value: "examMath",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Văn",
    value: "examLiterature",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Anh",
    value: "examEnglish",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Tổng điểm",
    value: "totalMark",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "NV1",
    value: "expectation1",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "NV2",
    value: "expectation2",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "NV3",
    value: "expectation3",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Kết quả trúng tuyển",
    value: "examPass",
    align: "left",
    sortable: false,
    show: true,
  },
];

import { mapActions, mapGetters } from "vuex";
import { get } from "lodash";
import moment from "moment";

export default {
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
  },
  data() {
    return {
      loading: false,
      headers: originHeaders,
      selectedCode: "",
      selectedCreatedAt: "",
    };
  },
  async beforeMount() {
    await this.refresh({
      _sort: "updatedAt:DESC",
    });
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    async refresh(query) {
      this.loading = true;
      await this.fetchCVs({ ...query, type: "Khối 6" });
      this.loading = false;
    },
    search() {},
    getColor(item) {
      if (item.ltvExamResult && item.ltvExamResult.passExam != "")
        return item.ltvExamResult.passExam ? "success--text" : "error--text";
      return "";
    },
    getShortClassName(clazz) {
      switch (clazz) {
        case "Lớp Chất lượng cao (CLC)":
          return "(CLC)";
        case "Lớp chọn Chất lượng cao c(CLC)":
          return "c(CLC)";
        case "Lớp Năng khiếu Anh (NKA)":
          return "(NKA)";
        case "Lớp Năng khiếu Toán (NKT)":
          return "(NKT)";
        default:
          return "---";
      }
    },
    getExpectation1(item) {
      if (item.expectation1 && item.expectation1.clazz)
        return this.getShortClassName(item.expectation1.clazz);
      return "---";
    },
    getExpectation2(item) {
      if (item.expectation2 && item.expectation2.clazz)
        return this.getShortClassName(item.expectation2.clazz);
      return "---";
    },
    getExpectation3(item) {
      if (item.expectation3 && item.expectation3.clazz)
        return this.getShortClassName(item.expectation3.clazz);
      return "---";
    },
  },
  filters: {
    getStudent: (item) => {
      return get(item, "name", "---");
    },
    getDepartment: (item) => {
      return get(item, "department", "---");
    },
    getCode: (item) => {
      return get(item, "code", "---");
    },
    getStudentDob: (item) => {
      if (item.dob) return moment(item.dob).format("DD/MM/YYYY");
      return "---";
    },
    getExamMath: (item) => {
      return get(item, "ltvExamResult.examMath", "---");
    },
    getExamLiterature: (item) => {
      return get(item, "ltvExamResult.examLiterature", "---");
    },
    getExamEnglish: (item) => {
      return get(item, "ltvExamResult.examEnglish", "---");
    },
    getTotalMark: (item) => {
      return get(item, "ltvExamResult.totalMark", "---");
    },
    isPassExam: (item) => {
      return get(item, "ltvExamResult.passExamText", "---");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
