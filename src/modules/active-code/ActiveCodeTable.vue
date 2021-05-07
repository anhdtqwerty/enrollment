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
      :footer-props="{ 'items-per-page-text': 'Số Mã kích hoạt một trang' }"
      v-bind="this.$attrs"
    >
      <template v-slot:[`footer.page-text`]="items">
        Mã kích hoạt thứ {{ items.pageStart }} - {{ items.pageStop }} trên tổng
        {{ items.itemsLength }} Mã kích hoạt
      </template>
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
        <div class="d-flex align-center">
          <v-btn @click="onConfirmPrint(item)" color="admin" icon>
            <v-icon> mdi-printer </v-icon>
          </v-btn>
          <div v-if="user.department === 'both'">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="onActiveItem(item)"
                  color="admin"
                  v-show="item.status === 'disabled'"
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                  <v-icon> mdi-check </v-icon>
                </v-btn>
              </template>
              <span>Bật mã kích hoạt</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="onDeactiveItem(item)"
                  color="admin"
                  v-show="item.status !== 'disabled'"
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </template>
              <span>Vô hiệu hoá Mã kích hoạt</span>
            </v-tooltip>
          </div>
        </div>
      </template>
      <template v-slot:no-data>
        <div class="d-flex flex-column align-center justify-center pa-6">
          <div class="mt-4 text-subtitle-1">Chưa có dữ liệu</div>
        </div>
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
    align: "center",
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
  async beforeMount() {
    await this.refresh();
  },
  methods: {
    ...mapActions("activeCode", [
      "fetchActiveCodes",
      "fetchActiveCode",
      "setActiveCode",
      "updateActiveCode",
    ]),
    ...mapActions("activeCode", ["enableActiveCode", "disableActiveCode"]),
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
    async refresh() {
      this.loading = true;
      let query = {
        _sort: "updatedAt:DESC",
      };
      if (this.user.department === "both")
        query.department_in = ["Cơ sở A", "Cơ sở 1", "unset"];
      else {
        query.status = { $ne: "disabled" };
        query.department_in = [this.user.department, "unset"];
      }
      await this.fetchActiveCodes({ ...query });
      this.loading = false;
    },
    getColor(status) {
      if (status === "active") return "green";
      if (status === "inactive") return "orange accent-2";
      else return "gray";
    },
    async onDeactiveItem(item) {
      this.$adminDialog.confirm({
        title: "Xác nhận hành động",
        okText: "Xác nhận",
        topContent: `Bạn có chắc chắn muốn vô hiệu hoá Mã kích hoạt ${item.code} không?`,
        midContent: `<span class='error--text'>Lưu ý: Nếu như tắt mã kích hoạt đã được sử dụng, hồ sơ tương ứng cũng sẽ bị vô hiệu hoá (phụ huynh không thể chỉnh sửa).</span>`,
        cancelText: "Hủy",
        done: async () => {
          await this.disableActiveCode(item.code);
          await this.refresh({});
        },
      });
    },
    async onActiveItem(item) {
      this.$adminDialog.confirm({
        title: "Xác nhận hành động",
        okText: "Xác nhận",
        topContent: `Bạn có chắc chắn muốn tắt Mã kích hoạt ${item.code} không?`,
        midContent: `<span class='error--text'>Lưu ý: Nếu như bật lại mã kích hoạt đã được sử dụng, hồ sơ tương ứng cũng sẽ được bật lại.</span>`,
        cancelText: "Hủy",
        done: async () => {
          await this.enableActiveCode(item.code);
          await this.refresh({});
        },
      });
    },
    search() {},
  },
  filters: {
    getStatus: (status) => {
      if (status === "active") return "Đã kích hoạt";
      else if (status === "inactive") return "Chưa kích hoạt";
      else return "Đang tắt";
    },
    getDepartment: (item) => {
      if (!item.department || item.department === "unset") return "---";
      else return item.department;
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
      if (item.grade === "Khối 6") return "6";
      else return "10";
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
