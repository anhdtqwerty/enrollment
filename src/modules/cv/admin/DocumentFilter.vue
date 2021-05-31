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
              placeholder="Mã hồ sơ"
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
              v-model="type"
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
              v-model="name"
              v-if="advancedFilter"
              placeholder="Học sinh"
              clearable
              flat
              outlined
              dense
            />
          </v-col>
          <v-col class="pb-0" cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="parent"
              v-if="advancedFilter"
              placeholder="Họ và tên Người khai"
              clearable
              flat
              outlined
              dense
            />
          </v-col>
          <v-col class="pb-0" cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="otherParent"
              v-if="advancedFilter"
              placeholder="Họ và tên Vợ(chồng)"
              clearable
              flat
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
          <v-col class="pt-0" cols="12" xs="12" sm="12" md="4">
            <v-text-field
              v-model="userPhone"
              v-if="advancedFilter"
              placeholder="SĐT tài khoản"
              clearable
              flat
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
export default {
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  created() {
    if (this.user.department === "both") {
      this.disabledDepartmentFilter = false;
      this.department = "";
      this.statuses.push({ title: "Đang tắt", value: "disabled" });
    } else this.department = this.user.department;
  },
  data() {
    return {
      disabledDepartmentFilter: true,
      advancedFilter: false,
      show: false,
      status: "",
      type: "",
      code: "",
      department: "",
      name: "",
      parent: "",
      otherParent: "",
      userPhone: "",
      grades: [
        { title: "Khối 6", value: "Khối 6" },
        { title: "Khối 10", value: "Khối 10" },
      ],
      statuses: [
        { title: "Đang khai", value: "filling" },
        { title: "Chưa khai", value: "created" },
        { title: "Hoàn thành", value: "submitted" },
        { title: "Đang tắt", value: "disabled" },
      ],
      departments: [
        { title: "Cơ sở A", value: "Cơ sở A" },
        { title: "Cơ sở 1", value: "Cơ sở 1" },
      ],
    };
  },
  methods: {
    ...mapActions("user", ["fetchAdminUsers"]),
    onFilterChanged() {
      let query = {
        status: this.status,
        type: this.type,
        code: this.code,
        name: this.name,
        parentName: this.parent,
        otherParentName: this.otherParent,
        "parent.username": this.userPhone,
      };
      if (this.department === "" || this.department === "both")
        query.department_in = ["unset", "Cơ sở 1", "Cơ sở A"];
      else query.department_in = ["unset", this.department];
      this.$emit("onFilterChanged", query);
    },
  },
};
</script>
