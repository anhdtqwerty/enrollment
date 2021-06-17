<template>
  <v-data-table
    item-key="id"
    :headers="headers"
    :loading="loading"
    :items="documents"
    :items-per-page="10"
    :disable-sort="$vuetify.breakpoint.smAndDown"
    :footer-props="{ 'items-per-page-text': 'Số Hồ Sơ một trang' }"
    v-bind="this.$attrs"
  >
    <template v-slot:[`footer.page-text`]="items">
      Hồ sơ thứ {{ items.pageStart }} - {{ items.pageStop }} trên tổng
      {{ items.itemsLength }} Hồ sơ
    </template>
    <template v-slot:[`item.code`]="{ item }">
      {{ item | getCode }}
    </template>
    <template v-slot:[`item.name`]="{ item }">
      {{ item | getStudentName }}
    </template>
    <template v-slot:[`item.dob`]="{ item }">
      {{ item | getStudentDob }}
    </template>
    <template v-slot:[`item.examCorrectAnswer`]="{ item }">
      {{ item | getCorrectAnswer }}
    </template>
    <template v-slot:[`item.examCorrectRate`]="{ item }">
      {{ item | getCorrectRate }}
    </template>
    <template v-slot:[`item.examMark`]="{ item }">
      {{ item | getExamMark }}
    </template>
    <template v-slot:[`item.totalMathLiterature`]="{ item }">
      {{ item | getTotalMathLiterature }}
    </template>
    <template v-slot:[`item.priorityMark`]="{ item }">
      {{ item | getPriorityMark }}
    </template>
    <template v-slot:[`item.totalMark`]="{ item }">
      {{ item | getTotalMark }}
    </template>
    <template v-slot:[`item.examPassText`]="{ item }">
      <span :class="getColor(item)">{{ item | isPassExam }}</span>
    </template>
  </v-data-table>
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
    text: "Số lượng câu đúng",
    value: "examCorrectAnswer",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Tỉ lệ % câu đúng",
    value: "examCorrectRate",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Điểm bài Khảo sát ĐGNL Tổng hợp",
    value: "examMark",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Tổng điểm Học bạ",
    value: "totalMathLiterature",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Điểm ưu tiên",
    value: "priorityMark",
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
    text: "Kết quả trúng tuyển",
    value: "examPassText",
    align: "left",
    sortable: false,
    show: true,
  },
];

import { mapActions, mapGetters } from "vuex";
import { get } from "lodash";
import moment from "moment";

export default {
  props: {
    documents: Array,
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
    ...mapGetters("auth", ["user"]),
  },
  data() {
    return {
      loading: false,
      headers: originHeaders,
    };
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    search() {},
    getColor(item) {
      if (item.passExamText && item.passExamText != "") {
        if (item.passExamText.toLowerCase().includes("đã trúng tuyển"))
          return "success--text";
        else if (
          item.passExamText.toLowerCase().includes("không") ||
          item.passExamText.toLowerCase().includes("vi phạm")
        )
          return "error--text";
        return "";
      }
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
    getStudentName: (item) => {
      return get(item, "name", "---");
    },
    getCode: (item) => {
      return get(item, "code", "---");
    },
    getStudentDob: (item) => {
      if (item.dob) return moment(item.dob, "DD/MM/YYYY").format("DD/MM/YYYY");
      return "---";
    },
    getCorrectAnswer: (item) => {
      return get(item, "examCorrectAnswer", "---");
    },
    getCorrectRate: (item) => {
      return get(item, "examCorrectRate", "---");
    },
    getExamMark: (item) => {
      return get(item, "examMark", "---");
    },
    getTotalMathLiterature: (item) => {
      return get(item, "totalMathLiterature", "---");
    },
    getPriorityMark: (item) => {
      return get(item, "priorityMark", "---");
    },
    getTotalMark: (item) => {
      return get(item, "totalMark", "---");
    },
    isPassExam: (item) => {
      return get(item, "passExamText", "---");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
