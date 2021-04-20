<template>
  <v-form v-bind="this.$attrs">
    <v-row>
      <v-col
        class="d-flex justify-space-between"
        cols="12"
        xs="12"
        sm="12"
        md="10"
      >
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="username"
              placeholder="Số điện thoại"
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4">
            <v-select
              :items="statuses"
              item-text="title"
              item-value="value"
              v-model="isConfirmedOTP"
              placeholder="Trạng thái"
              clearable
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4">
            <v-select
              :items="documentStatuses"
              item-text="title"
              item-value="value"
              v-model="status"
              placeholder="Tình trạng hồ sơ"
              clearable
              outlined
              dense
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2">
        <v-btn
          color="admin"
          height="40px"
          width="100%"
          @click="onFilter"
          outlined
        >
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col
        class="d-flex justify-space-between pb-0"
        cols="12"
        xs="12"
        sm="12"
        md="10"
      >
        <v-row class="my-0">
          <v-col class="pb-0" cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="startDate"
              v-mask="'##/##/####'"
              placeholder="Tạo tài khoản sau ngày"
              :rules="startDateRules"
              clearable
              flat
              outlined
              dense
            />
          </v-col>
          <v-col class="pb-0" cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="endDate"
              v-mask="'##/##/####'"
              placeholder="Tạo tài khoản trước ngày"
              :rules="endDateRules"
              clearable
              flat
              outlined
              dense
            />
          </v-col>
          <v-col class="pb-0" cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="documentCode"
              v-mask="'########'"
              placeholder="Mã hồ sơ"
              clearable
              flat
              outlined
              dense
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2" class="py-6"> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  data() {
    return {
      username: "",
      status: "",
      isConfirmedOTP: "",
      startDate: "",
      endDate: "",
      documentCode: "",
      statuses: [
        {
          title: "Chưa kích hoạt OTP",
          value: "inactive",
        },
        {
          title: "Đã kích hoạt OTP",
          value: "active",
        },
      ],
      documentStatuses: [
        {
          title: "Chưa tạo hồ sơ",
          value: "inactive",
        },
        {
          title: "Đã tạo hồ sơ",
          value: "active",
        },
      ],
      startDateRules: [this.$rules.date],
      endDateRules: [
        this.$rules.date,
        (v) =>
          !v ||
          (this.startDate &&
            moment(this.startDate, "DD/MM/YYYY").isBefore(
              moment(this.endDate, "DD/MM/YYYY")
            )) ||
          (v && !this.startDate) ||
          "Ngày kết thúc không được trước ngày bắt đầu",
      ],
    };
  },
  methods: {
    ...mapActions("user", ["fetchAdminUsers"]),
    onFilter() {
      this.$emit("onFilterChanged", {
        isConfirmedOTP: this.isConfirmedOTP,
        username: this.username,
        status: this.status,
        documentCode: this.documentCode,
        createdAt_gt:
          this.startDate != ""
            ? moment(this.startDate, "DD/MM/YYYY").toISOString()
            : "",
        createdAt_lt:
          this.startDate != ""
            ? moment(this.endDate, "DD/MM/YYYY").toISOString()
            : "",
      });
    },
  },
};
</script>
