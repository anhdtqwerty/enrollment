<template>
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
      <v-btn
        class="btn text-none text-decoration-underline"
        color="primary"
        @click="onDocumentClick(item.id)"
        plain
      >
        {{ item | getCode }}
      </v-btn>
    </template>
    <template v-slot:[`item.type`]="{ item }">
      <v-chip :color="getGradeColor(item.type)" small>
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
      <v-chip :color="getStatusColor(item.status)" small>
        {{ item.status | getStatus }}
      </v-chip>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn
        @click="onDocumentClick(item.id)"
        color="primary"
        class="btn text-none"
        plain
        >{{ item | getActionName }}</v-btn
      >
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
  },
  {
    text: "Khối",
    value: "type",
    align: "center",
    sortable: false,
    show: true,
  },
  {
    text: "Cơ sở",
    value: "department",
    align: "center",
    sortable: false,
    show: true,
  },
  {
    text: "Học sinh",
    value: "student",
    align: "center",
    sortable: false,
    show: true,
  },
  {
    text: "Trạng thái",
    value: "status",
    align: "center",
    sortable: false,
    show: true,
  },
  {
    text: "Thao tác",
    value: "action",
    align: "center",
    sortable: false,
    show: true,
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
      if (status === "Đã nộp") return "rgba(75,202,129,0.5)";
      else return "rgba(255,196,16,0.5)";
    },
  },
  async beforeMount() {
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

<style scoped>
.btn {
  letter-spacing: 0.5px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
</style>
