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
              v-model="code"
              placeholder="Mã kích hoạt"
              clearable
              flat
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4">
            <v-select
              :items="grades"
              item-text="title"
              item-value="value"
              v-model="grade"
              placeholder="Khối"
              clearable
              outlined
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4">
            <v-select
              :items="departments"
              item-text="title"
              item-value="value"
              v-model="department"
              placeholder="Cơ sở"
              :disabled="disabledDepartmentFilter"
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
          @click="onFilterChanged"
          outlined
        >
          Tìm kiếm
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col
        class="d-flex justify-space-between"
        cols="12"
        xs="12"
        sm="12"
        md="10"
      >
        <v-row class="my-0">
          <v-col class="pb-0" cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="startDate"
              v-if="advancedFilter"
              v-mask="'##/##/####'"
              placeholder="Tạo mã sau ngày"
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
              v-if="advancedFilter"
              v-mask="'##/##/####'"
              placeholder="Tạo mã trước ngày"
              :rules="endDateRules"
              clearable
              flat
              outlined
              dense
            />
          </v-col>
          <v-col class="pb-0" cols="12" xs="12" sm="12" md="4">
            <v-select
              v-if="advancedFilter"
              item-text="title"
              item-value="value"
              v-model="createdBy"
              placeholder="Người tạo mã"
              :items="adminUsers"
              clearable
              outlined
              dense
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="2" class="py-6">
        <v-btn
          color="admin"
          height="40px"
          width="100%"
          @click="advancedFilter = !advancedFilter"
          text
        >
          Nâng cao <v-icon v-if="!advancedFilter">mdi-chevron-down</v-icon
          ><v-icon v-if="advancedFilter">mdi-chevron-down</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="advancedFilter" class="mt-0">
      <v-col
        class="d-flex justify-space-between"
        cols="12"
        xs="12"
        sm="12"
        md="10"
      >
        <v-row>
          <v-col class="pt-0" cols="12" xs="12" sm="12" md="4">
            <v-select
              v-if="advancedFilter"
              item-text="title"
              item-value="value"
              v-model="status"
              placeholder="Trạng thái"
              :items="statuses"
              clearable
              outlined
              dense
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  async created() {
    this.$loading.active = true;
    const admins = await this.fetchAdminUsers({});
    this.adminUsers = admins.map((admin) => {
      return {
        title: admin.name || admin.username,
        value: admin.name || admin.username,
      };
    });
    if (this.user.department === "both") {
      this.disabledDepartmentFilter = false;
      this.department = "";
    } else this.department = this.user.department;
    this.$loading.active = false;
  },
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  data() {
    return {
      disabledDepartmentFilter: true,
      advancedFilter: false,
      show: false,
      status: "",
      grade: "",
      code: "",
      createdBy: "",
      department: "",
      startDate: "",
      endDate: "",
      adminUsers: [],
      grades: [
        { title: "Khối 6", value: "Khối 6" },
        { title: "Khối 10", value: "Khối 10" },
      ],
      statuses: [
        { title: "Chưa kích hoạt", value: "inactive" },
        { title: "Đã kích hoạt", value: "active" },
      ],
      departments: [
        { title: "Cơ sở A", value: "Cơ sở A" },
        { title: "Cơ sở 1", value: "Cơ sở 1" },
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
    onFilterChanged() {
      let query = {
        status: this.status,
        grade: this.grade,
        code: this.code,
        createdBy: this.createdBy,
        department_in: [this.department, "unset"],
        createdAt_gt: moment(this.startDate, "DD/MM/YYYY").toISOString(),
        createdAt_lt: moment(this.endDate, "DD/MM/YYYY").toISOString(),
      };
      if (this.department === "" || this.department === "both")
        query.department_in = ["unset", "Cơ sở 1", "Cơ sở A"];
      else query.department_in = ["unset", this.department];
      this.$emit("onFilterChanged", query);
    },
  },
};
</script>
