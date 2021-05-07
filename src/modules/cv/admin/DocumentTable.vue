<template>
  <div>
    <v-data-table
      item-key="id"
      :headers="headers"
      :loading="loading"
      :items="CVs"
      :items-per-page="10"
      :footer-props="{ 'items-per-page-text': 'Số Hồ Sơ một trang' }"
      :disable-sort="$vuetify.breakpoint.smAndDown"
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
          :color="getColor(item)"
          style="width: 105px"
          label
        >
          {{ item | getStatus }}
        </v-chip>
      </template>
      <template v-slot:[`item.parentPhone`]="{ item }">
        {{ item | getUserPhone }}
      </template>
      <!-- eslint-disable no-unused-vars--->
      <template
        v-slot:[`item.action`]="{ item }"
        v-if="user.department === 'both'"
      >
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
          <span>Bật hồ sơ</span>
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
          <span>Tắt hồ sơ</span>
        </v-tooltip>
      </template>
      <!-- eslint-enable no-unused-vars--->
    </v-data-table>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
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
      selectedCode: "",
      selectedCreatedAt: "",
      originHeaders: [
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
          text: "SĐT tài khoản",
          value: "parentPhone",
          align: "left",
          sortable: false,
          show: true,
        },
      ],
      headers: [],
    };
  },
  async mounted() {
    this.headers = this.originHeaders;
    if (this.user.department == "both")
      this.originHeaders.push({
        text: "Hành động",
        value: "action",
        align: "center",
        sortable: false,
        show: true,
      });
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
    ...mapActions("activeCode", ["enableActiveCode", "disableActiveCode"]),
    async refresh(query) {
      this.loading = true;
      if (!this.user.department || this.user.department !== "both")
        query.status = { $ne: "disabled" };
      await this.fetchCVs({ ...query });
      this.loading = false;
    },
    getColor(item) {
      if (
        item.type === "Khối 6" &&
        item.step === 4 &&
        item.studyRecord &&
        item.studyRecord.grade5Math &&
        item.studyRecord.grade5Literature &&
        item.studyRecord.grade5Morality
      )
        return "success";
      else if (item.type === "Khối 10" && item.status === "submitted")
        return "success";
      else if (item.status === "disabled") return "gray";
      else return "orange accent-2";
    },
    onDocumentClick(documentId) {
      this.$emit("onDocumentDetail", documentId);
    },
    async onDeactiveItem(item) {
      this.$adminDialog.confirm({
        title: "Xác nhận hành động",
        okText: "Xác nhận",
        topContent: `Bạn có chắc chắn muốn tắt hồ sơ này chứ?`,
        midContent: `<span class='error--text'>Lưu ý: Nếu như tắt hồ sơ, phụ huynh học sinh sẽ không thể chỉnh sửa hoặc thao tác trên hồ sơ này được nữa.</span>`,
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
        topContent: `Bạn có chắc chắn muốn bật hồ sơ này chứ?`,
        midContent: `<span class='error--text'>Lưu ý: Nếu như bật lại hồ sơ, phụ huynh học sinh sẽ có thể chỉnh sửa hoặc thao tác trên hồ sơ này.</span>`,
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
    getUserPhone: (item) => {
      return get(item, "parent.username", "---");
    },
    getStudent: (item) => {
      return get(item, "name", "---");
    },
    getStatus: (item) => {
      if (
        item.type === "Khối 6" &&
        item.step === 4 &&
        item.studyRecord &&
        item.studyRecord.grade5Math &&
        item.studyRecord.grade5Literature &&
        item.studyRecord.grade5Morality
      )
        return "Hoàn thành";
      else if (item.type === "Khối 10" && item.status === "submitted")
        return "Hoàn thành";
      else if (item.status === "filling") return "Đang khai";
      else if (item.status === "disabled") return "Đang tắt";
      else return "Chưa khai";
    },
    getDepartment: (item) => {
      if (!item.department || item.department === "unset") return "---";
      else return item.department;
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
