<template>
  <v-data-table
    item-key="id"
    :headers="headers"
    :loading="loading"
    :items="activeCodes"
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
    <template v-slot:[`item.created_at`]="{ item }">
      {{ getCreatedAt(item) }}
    </template>
    <template v-slot:[`item.activeDate`]="{ item }">
      {{ getActiveAt(item) }}
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip small class="white--text" :color="getColor(item.status)" label>
        {{ item.status | getStatus }}
      </v-chip>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn @click="onPrint(item)" color="admin" icon>
        <v-icon>
          mdi-printer
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
/* eslint-disable no-unused-vars */

const originHeaders = [
  {
    text: "Mã kích hoạt",
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
    text: "Ngày tạo mã",
    value: "created_at",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Ngày kích hoạt",
    value: "activeDate",
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
    text: "Thao tác",
    value: "action",
    align: "left",
    sortable: false,
    show: true,
  },
];

import { mapActions, mapGetters } from "vuex";
import _ from "lodash";
import moment from "moment";
moment.locale("vi");

export default {
  computed: {
    ...mapGetters("activeCode", ["activeCodes", "activeCode"]),
  },
  data() {
    return {
      loading: false,
      headers: originHeaders,
    };
  },
  async mounted() {
    await this.refresh({
      _sort: "created_at:DESC",
    });
    console.log(this.activeCodes);
  },
  methods: {
    ...mapActions("activeCode", [
      "fetchActiveCodes",
      "fetchActiveCode",
      "setActiveCode",
      "updateActiveCode",
    ]),
    getCreatedAt(item) {
      if (item.createdAt) return moment(item.createdAt).format("DD/MM/YYYY");
      else return "---";
    },
    getActiveAt(item) {
      if (item.activeDate) return moment(item.activeDate).format("DD/MM/YYYY");
      else return "---";
    },
    onPrint(data) {},
    async refresh(query) {
      this.loading = true;
      await this.fetchActiveCodes({ ...query });
      this.loading = false;
    },
    getColor(status) {
      if (status === "Đã kích hoạt") return "green--text";
      else return "gray--text";
    },
    search() {},
  },
  filters: {
    getStatus: (status) => {
      if (status === "active") return "Đã kích hoạt";
      else if (status === "inactive") return "Chưa kích hoạt";
      else return "---";
    },
    getDepartment: (item) => {
      return _.get(item, "department", "---");
    },
    getCode: (item) => {
      return _.get(item, "code", "---");
    },
    getGrade: (item) => {
      return _.get(item, "grade", "Khối 6");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
