<template>
  <v-data-table
    item-key="id"
    :headers="headers"
    :loading="loading"
    :items="CVs"
    :items-per-page="10"
    :disable-sort="$vuetify.breakpoint.smAndDown"
    :footer-props="{ 'items-per-page-text': 'Số Hồ Sơ một trang' }"
    class="document-table"
    v-bind="this.$attrs"
  >
    <template v-slot:[`footer.page-text`]="{ items }">
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
    <template v-slot:[`item.type`]="{ item }">
      <v-chip
        :color="getGradeColor(item.type)"
        class="d-flex justify-center"
        style="width: 65px"
        small
      >
        {{ item | getGrade }}
      </v-chip>
    </template>
    <template v-slot:[`item.department`]="{ item }">
      {{ item | getDepartment }}
    </template>
    <template v-slot:[`item.student`]="{ item }">
      {{ item | getStudentName }}
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        :color="getStatusColor(item.status)"
        class="d-flex justify-center"
        style="width: 80px"
        small
      >
        {{ item.status | getStatus }}
      </v-chip>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn
        @click="onDocumentClick(item.id)"
        color="primary"
        class="document-btn text-none px-0"
        plain
        >{{ item | getActionName }}</v-btn
      >
    </template>
    <template v-slot:no-data>
      <div class="d-flex flex-column align-center justify-center pa-6">
        <v-img width="70" src="@/assets/homepage/no-data.svg" />
        <div class="mt-4">Nhập mã kích hoạt để bắt đầu tạo hồ sơ</div>
      </div>
    </template>
  </v-data-table>
</template>

<script>
/* eslint-disable no-unused-vars */

const originHeaders = [
  {
    text: "Hồ sơ",
    value: "code",
    align: "center",
    sortable: false,
    show: true,
    width: 96,
  },
  {
    text: "Khối",
    value: "type",
    align: "center",
    sortable: false,
    show: true,
    width: 72,
  },
  {
    text: "Cơ sở",
    value: "department",
    align: "center",
    sortable: false,
    show: true,
    width: 72,
  },
  {
    text: "Học sinh",
    value: "student",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Trạng thái",
    value: "status",
    align: "center",
    sortable: false,
    show: true,
    width: 88,
  },
  {
    text: "Thao tác",
    value: "action",
    align: "center",
    sortable: false,
    show: true,
    width: 96,
  },
];

import { mapActions, mapGetters } from "vuex";
import { get } from "lodash";
import moment from "moment";
moment.locale("vi");

export default {
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
  },
  data() {
    return {
      loading: false,
      headers: originHeaders,
    };
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    ...mapActions("layout", ["setDocumentDialog"]),
    onDocumentClick(documentId) {
      this.$router.push(`/document/${documentId}`);
      this.setDocumentDialog(false);
    },
    async refresh(query) {
      this.loading = true;
      await this.fetchCVs({ ...query });
      this.loading = false;
    },
    getGradeColor(grade) {
      if (grade === "Khối 6") return "pink lighten-4";
      else return "deep-purple lighten-4";
    },
    getStatusColor(status) {
      if (status === "submitted") return "rgba(75,202,129,0.5)";
      else return "rgba(255,196,16,0.5)";
    },
  },
  async created() {
    await this.refresh({
      _sort: "updatedAt:DESC",
      parent: this.user.id,
    });
  },
  filters: {
    getStatus: (status) => {
      if (status === "submitted") return "Đã nộp";
      else if (status === "filling") return "Đang khai";
      else return "Vừa tạo";
    },
    getDepartment: (item) => {
      return get(item, "department", "---");
    },
    getCode: (item) => {
      return get(item, "code", "---");
    },
    getGrade: (item) => {
      return get(item, "type", "Khối 6");
    },
    getStudentName: (item) => {
      return get(item, "name", "---");
    },
    getActionName: (item) => {
      if (item.status === "submitted") return "Xem lại";
      else if (item.status === "filling") return "Chỉnh sửa";
      return "Vào khai";
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style>
.document-btn {
  letter-spacing: 0.1px !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
.document-table th span {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #797979;
}
.document-table td,
.document-table th {
  padding: 0px 8px !important;
}
</style>
