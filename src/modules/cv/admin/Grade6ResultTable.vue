<template>
  <div>
    <v-data-table
      item-key="id"
      :headers="headers"
      :loading="loading"
      :items="CVs"
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
        <v-btn
          class="document-btn text-none text-decoration-underline px-0"
          color="primary"
          @click="onDocumentClick(item.id)"
          plain
        >
          {{ item | getCode }}
        </v-btn>
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
  // {
  //   text: "Toán",
  //   value: "examMath",
  //   align: "left",
  //   sortable: false,
  //   show: true,
  // },
  // {
  //   text: "Văn",
  //   value: "examLiterature",
  //   align: "left",
  //   sortable: false,
  //   show: true,
  // },
  // {
  //   text: "Anh",
  //   value: "examEnglish",
  //   align: "left",
  //   sortable: false,
  //   show: true,
  // },
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
    ...mapGetters("auth", ["user"]),
  },
  data() {
    return {
      loading: false,
      headers: originHeaders,
      selectedCode: "",
      selectedCreatedAt: "",
    };
  },
  async mounted() {
    let query = {
      _sort: "updatedAt:DESC",
    };
    if (this.user.department === "both")
      query.department_in = ["Cơ sở A", "Cơ sở 1", "unset"];
    else query.department_in = [this.user.department, "unset"];
    await this.refresh(query);
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    onDocumentClick(documentId) {
      this.$emit("onDocumentDetail", documentId);
    },
    async refresh(query) {
      this.loading = true;
      await this.fetchCVs({
        ...query,
        type: "Khối 6",
      });
      this.loading = false;
    },
    search() {},
    getColor(item) {
      if (
        item.ltvExamResult &&
        item.ltvExamResult.passExam &&
        item.ltvExamResult.passExam != ""
      ) {
        if (item.ltvExamResult.passExam) return "success--text";
        else return "error--text";
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
    getStudent: (item) => {
      return get(item, "name", "---");
    },
    getDepartment: (item) => {
      if (!item.department || item.department === "unset") return "---";
      else return item.department;
    },
    getCode: (item) => {
      return get(item, "code", "---");
    },
    getStudentDob: (item) => {
      if (item.dob) return moment(item.dob).format("DD/MM/YYYY");
      return "---";
    },
    // getExamMath: (item) => {
    //   return get(item, "ltvExamResult.examMath", "---");
    // },
    // getExamLiterature: (item) => {
    //   return get(item, "ltvExamResult.examLiterature", "---");
    // },
    // getExamEnglish: (item) => {
    //   return get(item, "ltvExamResult.examEnglish", "---");
    // },
    getExamMark: (item) => {
      return get(item, "ltvExamResult.examMark", "---");
    },
    getTotalMathLiterature: (item) => {
      return get(item, "studyRecord.totalMathLiterature", "---");
    },
    getPriorityMark: (item) => {
      return get(item, "ltvExamResult.priorityMark", "---");
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
