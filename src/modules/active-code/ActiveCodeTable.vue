<template>
  <div>
    <PrintActiveCode
      class="d-none"
      id="printActiveCode"
      :activeCode="selectedActiveCode"
    />
    <ConfirmPrintDialog
      :activeCode="selectedActiveCode"
      :state="confirmDialog"
      @closeDialog="confirmDialog = false"
      @onPrint="onPrint"
    />
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
      <template v-slot:[`item.createdBy`]="{ item }">
        {{ item | getCreatedBy }}
      </template>
      <template v-slot:[`item.printNum`]="{ item }">
        {{ item | getPrintNum }}
      </template>
      <template v-slot:[`item.activeDate`]="{ item }">
        {{ getActiveAt(item) }}
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
      <template v-slot:[`item.action`]="{ item }">
        <v-btn @click="onConfirmPrint(item)" color="admin" icon>
          <v-icon>
            mdi-printer
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
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
    text: "Người tạo mã",
    value: "createdBy",
    align: "left",
    sortable: false,
    show: true,
  },
  {
    text: "Số lần in",
    value: "printNum",
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

import ConfirmPrintDialog from "./ConfirmPrintDialog";
import PrintActiveCode from "./PrintActiveCode.vue";
import { mapActions, mapGetters } from "vuex";
import { get } from "lodash";
import moment from "moment";
moment.locale("vi");

export default {
  components: { PrintActiveCode, ConfirmPrintDialog },
  computed: {
    ...mapGetters("activeCode", ["activeCodes", "activeCode"]),
    ...mapGetters("auth", ["role", "user", "isAuthenticated"]),
  },
  data() {
    return {
      loading: false,
      headers: originHeaders,
      selectedActiveCode: {},
      confirmDialog: false,
    };
  },
  async mounted() {
    let query = {
      _sort: "updatedAt:DESC",
    };
    if (this.user.department === "both")
      query.department_in = ["Cơ sở A", "Cơ sở 1"];
    else query.department = this.user.department;
    await this.refresh(query);
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
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    onConfirmPrint(data) {
      this.selectedActiveCode = data;
      this.confirmDialog = true;
    },
    async onPrint() {
      this.confirmDialog = false;
      this.$loading.active = true;
      await this.sleep(250);
      this.$loading.active = false;
      this.$htmlToPaper("printActiveCode");
    },
    async refresh(query) {
      this.loading = true;
      await this.fetchActiveCodes({ ...query });
      this.loading = false;
    },
    getColor(status) {
      if (status === "active") return "green";
      else return "gray";
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
      return get(item, "department", "---");
    },
    getCode: (item) => {
      return get(item, "code", "---");
    },
    getCreatedBy: (item) => {
      return get(item, "createdBy", "---");
    },
    getPrintNum: (item) => {
      return get(item, "printNum", "0");
    },
    getGrade: (item) => {
      if (item.type === "Khối 6") return "6";
      else return "10";
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
