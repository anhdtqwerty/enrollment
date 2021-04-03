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
    <template v-slot:[`item.department`]="{ item }">
      {{ item | getDepartment }}
    </template>
    <template v-slot:[`item.name`]="{ item }">
      {{ item | getStudent }}
    </template>
    <template v-slot:[`item.dob`]="{ item }">
      {{ item | getStudentDob }}
    </template>
    <template v-slot:[`item.totalA`]="{ item }">
      {{ item | getTotalA }}
    </template>
    <template v-slot:[`item.totalA1`]="{ item }">
      {{ item | getTotalA1 }}
    </template>
    <template v-slot:[`item.totalD`]="{ item }">
      {{ item | getTotalD }}
    </template>
    <template v-slot:[`item.groupExpectation1`]="{ item }">
      {{ getExpectation1(item) }}
    </template>
    <template v-slot:[`item.groupExpectation2`]="{ item }">
      {{ getExpectation2(item) }}
    </template>
    <template v-slot:[`item.examPass`]="{ item }">
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
    text: "Điểm ban A",
    value: "totalA",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Điểm ban A1",
    value: "totalA1",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Điểm ban D",
    value: "totalD",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "NV1",
    value: "groupExpectation1",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "NV2",
    value: "groupExpectation2",
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
    async refresh(query) {
      this.loading = true;
      await this.fetchCVs({
        ...query,
        type: "Khối 10",
      });
      this.loading = false;
    },
    onDocumentClick(documentId) {
      this.$emit("onDocumentDetail", documentId);
    },
    search() {},
    getColor(item) {
      if (item.passExamText && item.passExamText != "") {
        if (item.passExamText.includes("Đã trúng tuyển"))
          return "success--text";
        else if (item.passExamText.includes("Không")) return "error--text";
        return "";
      }
      return "";
    },
    getExpectation1(item) {
      if (item.groupExpectation1) return item.groupExpectation1;
      return "---";
    },
    getExpectation2(item) {
      if (item.groupExpectation2) return item.groupExpectation2 || "---";
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
    getTotalA: (item) => {
      console.log(item);
      return get(item, "totalA", "---");
    },
    getTotalA1: (item) => {
      return get(item, "totalA1", "---");
    },
    getTotalD: (item) => {
      return get(item, "totalD", "---");
    },
    isPassExam: (item) => {
      return get(item, "passExamText", "---");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
