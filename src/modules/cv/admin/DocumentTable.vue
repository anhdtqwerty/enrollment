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
      <template v-slot:[`item.grade`]="{ item }">
        {{ item | getGrade }}
      </template>
      <template v-slot:[`item.department`]="{ item }">
        {{ item | getDepartment }}
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item | getStudent }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          small
          class="white--text d-flex justify-center"
          :color="getColor(item.status)"
          style="width: 105px"
          label
        >
          {{ item.status | getStatus }}
        </v-chip>
      </template>
      <template v-slot:[`item.parentName`]="{ item }">
        {{ item | getParentName }}
      </template>
      <template v-slot:[`item.otherParentName`]="{ item }">
        {{ item | getOtherParentName }}
      </template>
      <template v-slot:[`item.parentPhone`]="{ item }">
        {{ item | getUserPhone }}
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
    text: "Khối",
    value: "grade",
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
    text: "Học sinh",
    value: "name",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Trạng thái",
    value: "status",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Họ và tên Phụ huynh",
    value: "parentName",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Họ và tên Vợ(chồng)",
    value: "otherParentName",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "SĐT tài khoản",
    value: "parentPhone",
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
    ...mapGetters("auth", ["user", "role"]),
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
    async refresh(query) {
      this.loading = true;
      await this.fetchCVs({ ...query });
      this.loading = false;
    },
    getColor(status) {
      if (status === "submitted") return "success";
      else return "orange accent-2";
    },
    search() {},
  },
  filters: {
    getUserPhone: (item) => {
      return get(item, "parent.username", "---");
    },
    getParentName: (item) => {
      return get(item, "parentName", "---");
    },
    getOtherParentName: (item) => {
      return get(item, "otherParentName", "---");
    },
    getStudent: (item) => {
      return get(item, "name", "---");
    },
    getStatus: (status) => {
      if (status === "filling") return "Đang khai";
      else if (status === "submitted") return "Đã nộp";
      else return "Vừa tạo";
    },
    getDepartment: (item) => {
      if(!item.department || item.department ==='unset') return "---"
      else return item.department
    },
    getCode: (item) => {
      return get(item, "code", "---");
    },
    getGrade: (item) => {
      if (item.type === "Khối 6") return "6";
      else return "10";
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
