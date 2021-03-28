<template>
  <v-form v-bind="this.$attrs" class="d-flex">
    <v-text-field
      v-model="code"
      placeholder="Mã kích hoạt"
      class="mr-6"
      style="flex: 4 1 0px"
      clearable
      flat
      outlined
      dense
      hide-details
    />
    <v-select
      :items="grades"
      item-text="title"
      item-value="value"
      v-model="grade"
      placeholder="Khối"
      class="mr-6"
      style="flex: 4 1 0px"
      outlined
      dense
      hide-details
    />
    <v-select
      :items="statuses"
      item-text="title"
      item-value="value"
      v-model="status"
      placeholder="Trạng thái"
      class="mr-6"
      style="flex: 4 1 0px"
      outlined
      dense
      hide-details
    />
    <v-btn color="admin" height="40px" style="flex 1 1 0px" outlined>
      Tìm kiếm
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    show: false,
    status: "",
    grade: "",
    code: "",
    grades: [
      { title: "Khối 6", value: "Khối 6" },
      { title: "Khối 10", value: "Khối 10" },
    ],
    statuses: [
      { title: "Chưa kích hoạt", value: "Chưa kích hoạt" },
      { title: "Đã kích hoạt", value: "Đã kích hoạt" },
    ],
  }),
  methods: {
    onFilterChanged() {
      this.$emit("onFilterChanged", {
        status: this.status,
        grade: this.grade,
        code: this.code,
        _sort: "updatedAt:desc",
      });
    },
  },
};
</script>
