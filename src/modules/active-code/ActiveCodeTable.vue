<template>
  <div>
    <PrintActiveCode
      class="d-none"
      id="printActiveCode"
      :code="selectedCode"
      :createdAt="selectedCreatedAt"
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
        <v-btn @click="onPrint(item)" color="admin" icon>
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

import PrintActiveCode from "./PrintActiveCode.vue";
import { mapActions, mapGetters } from "vuex";
import { get } from "lodash";
import moment from "moment";
moment.locale("vi");

export default {
  components: { PrintActiveCode },
  computed: {
    ...mapGetters("activeCode", ["activeCodes", "activeCode"]),
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
    await this.refresh({
      _sort: "createdAt:DESC",
    });
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
    async onPrint(data) {
      this.$loading.active = true;
      this.selectedCode = data.code;
      this.selectedCreatedAt = data.createdAt;
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
    getGrade: (item) => {
      return get(item, "grade", "Khối 6");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
