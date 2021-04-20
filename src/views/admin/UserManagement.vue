<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center">
      <div class="component-title">Tài khoản người dùng và tin nhắn</div>
      <div class="component-title">{{ getCurrentDepartment }}</div>
    </div>
    <div class="section-title py-6" v-if="user.department === 'both'">
      Báo cáo
    </div>
    <v-row class="d-flex" v-if="user.department === 'both'">
      <v-col cols="6">
        <v-card>
          <v-card-title class="card-title pa-6">Tài khoản</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9">Tổng số tài khoản</v-col>
              <v-col
                class="text-number admin--text text-end"
                sm="12"
                xs="12"
                md="3"
              >
                {{ accountInfo.totalAccount }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tài khoản chưa kích hoạt OTP</v-col
              >
              <v-col
                class="text-number admin--text text-end"
                sm="12"
                xs="12"
                md="3"
              >
                {{ accountInfo.totalInactiveAccount }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tài khoản đã kích hoạt OTP chưa có hồ sơ</v-col
              >
              <v-col
                class="text-number admin--text text-end"
                sm="12"
                xs="12"
                md="3"
              >
                {{ accountInfo.totalNoDocumentAccount }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title class="card-title pa-6">Tin nhắn</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9">Tổng số tin nhắn</v-col>
              <v-col
                class="text-number admin--text text-end"
                sm="12"
                xs="12"
                md="3"
              >
                {{ smsInfo.totalSMS }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tin nhắn trung bình một ngày</v-col
              >
              <v-col
                class="text-number admin--text text-end"
                sm="12"
                xs="12"
                md="3"
              >
                {{ smsInfo.dailySMS }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tin nhắn OTP nhưng tài khoản chưa kích hoạt</v-col
              >
              <v-col
                class="text-number admin--text text-end"
                sm="12"
                xs="12"
                md="3"
              >
                {{ smsInfo.inactiveSMS }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div
      class="section-title py-6 d-flex"
      style="width: 100%"
      v-if="user.department === 'both'"
    >
      <div>Tài khoản người dùng</div>
      <v-spacer></v-spacer>
      <div class="flex-center">
        <JsonExcel
          :data="filteredUsers"
          :fields="json_fields"
          type="xls"
          worksheet="Hồ sơ"
          name="tai-khoan.xls"
        >
          <v-btn color="admin" dark outlined>
            <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
          </v-btn>
        </JsonExcel>
      </div>
    </div>
    <v-card class="px-6 pt-6 elevation-1 mb-10">
      <UserFilter @onFilterChanged="onFilterChanged" />
    </v-card>

    <v-card class="elevation-1">
      <UserTable :users="filteredUsers" ref="activeCodeTable" />
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserTable from "@/modules/user/UserTable.vue";
import UserFilter from "@/modules/user/UserFilter.vue";
import moment from "moment";
import JsonExcel from "vue-json-excel";

export default {
  components: {
    JsonExcel,
    UserTable,
    UserFilter,
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV", "count"]),
    ...mapGetters("activeCode", ["activeCode", "activeCodes", "count"]),
    ...mapGetters("auth", ["user"]),
    ...mapGetters("user", ["users"]),
    getCurrentDepartment() {
      if (this.user && this.user.department != "both")
        return this.user.department;
      else return "Cơ sở 1 và Cơ sở A";
    },
  },
  methods: {
    ...mapActions("activeCode", [
      "countActiveCodes",
      "fetchActiveCodes",
      "fetchActiveCode",
    ]),
    ...mapActions("cv", ["fetchCVs", "fetchCV", "countCVs"]),
    ...mapActions("user", ["countUsers", "fetchUsers"]),
    async onFilterChanged(data) {
      this.$loading.active = true;
      console.log(this.users);
      this.filteredUsers = this.users.filter((user, index) => {
        console.log(user.cv);
        let result = true;
        if (user.role.type === "admin") result = false;
        for (const dataKey in data) {
          if (
            dataKey === "username" &&
            data[dataKey] != "" &&
            user.username !== data.username
          ) {
            result = false;
            break;
          } else if (
            dataKey === "documentCode" &&
            data[dataKey] &&
            user.cvs.filter((cv) => cv.code === data[dataKey]).length === 0
          ) {
            result = false;
            break;
          } else if (
            dataKey === "createdAt_gt" &&
            moment(user.createdAt).isAfter(data.createdAt_lt)
          ) {
            result = false;
            break;
          } else if (
            data[dataKey] != "" &&
            dataKey === "createdAt_lt" &&
            moment(user.createdAt).isBefore(data.createdAt_gt)
          ) {
            result = false;
            break;
          } else if (dataKey === "status" && data[dataKey]) {
            if (
              (data[dataKey] === "active" && user.cvs.length === 0) ||
              (data[dataKey] === "inactive" && user.cvs.length > 0)
            ) {
              result = false;
              break;
            }
          } else if (dataKey === "isConfirmedOTP" && data[dataKey])
            if (
              (data[dataKey] === "active" && !user.isConfirmedOTP) ||
              (data[dataKey] === "inactive" && user.isConfirmedOTP)
            ) {
              result = false;
              break;
            }
        }
        if (index === this.users.length - 1) this.$loading.active = false;
        return result;
      });
      console.log(this.filteredUsers);
    },
    async getAccountInfo(users) {
      return {
        totalAccount: await this.countUsers({}),
        totalActiveAccount: users.filter(
          (user) => user.role.type != "admin" && user.isConfirmedOTP
        ).length,
        totalInactiveAccount: await this.countUsers({
          isConfirmedOTP: "false",
        }),
        totalNoDocumentAccount: users.filter(
          (user) =>
            user.cvs.length === 0 &&
            user.role.type != "admin" &&
            user.isConfirmedOTP
        ).length,
      };
    },
    async getSMSInfo(users) {
      const { totalSMS, inactiveSMS } = users.reduce(
        (acc, cur) => {
          acc.totalSMS += cur.SMSNum;
          if (cur.isConfirmedOTP && cur.cvs.length === 0)
            acc.inactiveSMS += cur.SMSNum;
          return acc;
        },
        {
          totalSMS: 0,
          inactiveSMS: 0,
        }
      );
      const dayNum =
        moment().diff(moment("05/04/2021", "DD/MM/YYYY"), "days") + 1;
      return {
        totalSMS,
        inactiveSMS,
        dailySMS: Math.round(totalSMS / dayNum),
      };
    },
  },
  async created() {
    this.$loading.active = true;
    this.department = ["Cơ sở 1", "Cơ sở A", "unset"];
    await this.fetchUsers({});
    this.filteredUsers = this.users.filter((user) => user.role.type != "admin");
    this.accountInfo = await this.getAccountInfo(this.users);
    this.smsInfo = await this.getSMSInfo(this.users);
    this.$loading.active = false;
  },
  data() {
    return {
      filteredUsers: [],
      accountInfo: {
        totalAccount: 0,
        totalInactiveAccount: 0,
        totalNoDocumentAccount: 0,
      },
      smsInfo: {
        totalSMS: 0,
        dailySMS: 0,
        inactiveSMS: 0,
      },
      json_fields: {
        "Số điện thoại": "username",
        "Ngày tạo": {
          field: "createdAt",
          callback: (value) => {
            return moment(value).format("DD/MM/YYYY HH:mm:ss");
          },
        },
        "Trạng thái": {
          field: "isConfirmedOTP",
          callback: (value) => {
            if (value) return "Đã kích hoạt";
            else "Chưa kích hoạt";
          },
        },
        "Số SMS đã gửi": {
          field: "SMSNum",
          callback: (value) => {
            if (value) return moment(value).format("DD/MM/YYYY HH:mm:ss");
            else return "";
          },
        },
        "Hồ sơ đã tạo": {
          field: "cvs",
          callback: (value) => {
            let cvs = "";
            value.forEach((cv, index) => {
              cvs += cv.code;
              if (index !== cvs.length - 1) cvs += ", ";
            });
            return cvs;
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.component-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #0d47a1;
}
.text-number {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
}
.section-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #212121;
}
.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #757575;
}
.timeline-title {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #757575;
}
.timeline-subtitle {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #757575;
}
</style>
