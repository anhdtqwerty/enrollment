<template>
  <v-data-table
    item-key="id"
    :headers="headers"
    :loading="loading"
    :items="users"
    :items-per-page="10"
    :disable-sort="$vuetify.breakpoint.smAndDown"
    :footer-props="{ 'items-per-page-text': 'Số Mã kích hoạt một trang' }"
    v-bind="this.$attrs"
  >
    <template v-slot:[`footer.page-text`]="items">
      Tài khoản thứ {{ items.pageStart }} - {{ items.pageStop }} trên tổng
      {{ items.itemsLength }} Tài khoản
    </template>
    <template v-slot:[`item.username`]="{ item }">
      {{ item | getUsername }}
    </template>
    <template v-slot:[`item.created_at`]="{ item }">
      {{ item | getCreatedAt }}
    </template>
    <template v-slot:[`item.isConfirmedOTP`]="{ item }">
      <v-chip
        color="success d-flex justify-center"
        style="width: 120px"
        v-if="item.isConfirmedOTP"
        label
        >Đã kích hoạt</v-chip
      >
      <v-chip
        color="gray d-flex justify-center"
        style="width: 120px"
        v-else
        label
        >Chưa kích hoạt</v-chip
      >
    </template>
    <template v-slot:[`item.SMSNum`]="{ item }">
      {{ item | getSMSNum }}
    </template>
    <template v-slot:[`item.documents`]="{ item }">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="loadings[`${item.username}`]"
      ></v-progress-circular>
      <div class="d-flex align-center" :class="{'justify-center': item.cvs.length === 0}" v-else>
        <div v-if="item.cvs.length === 0">
          Chưa tạo hồ sơ
        </div>
        <v-chip-group v-else column>
          <v-chip
            v-for="document in item.cvs"
            :key="document.id"
            color="primary"
          >
            {{ document.code }}
          </v-chip>
        </v-chip-group>
      </div>
    </template>
  </v-data-table>
</template>

<script>
/* eslint-disable no-unused-vars */
const originHeaders = [
  {
    text: "Số điện thoại",
    value: "username",
    align: "left",
    sortable: false,
    show: true,
    width: "90",
  },
  {
    text: "Ngày tạo tài khoản",
    value: "created_at",
    align: "left",
    sortable: false,
    show: true,
    width: "180",
  },
  {
    text: "Kích hoạt OTP",
    value: "isConfirmedOTP",
    align: "left",
    sortable: false,
    show: true,
    width: "70",
  },
  {
    text: "Số SMS đã gửi",
    value: "SMSNum",
    align: "center",
    sortable: false,
    show: true,
    width: "120",
  },
  {
    text: "Hồ sơ đã tạo",
    value: "documents",
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
  props: {
    users: Array,
  },
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
      loadings: {},
    };
  },
  created() {
    this.loading = true;
  },
  methods: {
    ...mapActions("activeCode", [
      "fetchActiveCodes",
      "fetchActiveCode",
      "setActiveCode",
      "updateActiveCode",
    ]),
    async getDocuments(item) {
      console.log(item.cvs);
      if (item.cvs.length === 0) return "";
    },
    search() {},
  },
  watch: {
    users() {
      this.loading = false;
    },
  },
  filters: {
    getUsername: (item) => {
      return get(item, "username", "Chưa có thông tin");
    },
    getCreatedAt: (item) => {
      if (item.createdAt)
        return moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss");
      return "Chưa có thông tin";
    },
    getSMSNum: (item) => {
      return get(item, "SMSNum", "Chưa có thông tin");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
