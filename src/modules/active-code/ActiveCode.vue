<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">
        Quản lý mã kích hoạt
      </div>
      <div class="flex-center">
        <v-btn
          color="admin"
          @click="sendState = !sendState"
          class="mr-4"
          dark
          outlined
        >
          <v-icon left>mdi-file-excel-outline</v-icon>Xuất Excel
        </v-btn>
        <v-btn color="admin" @click="dialog = !dialog" dark
          ><v-icon left>mdi-plus</v-icon>Thêm mã kích hoạt</v-btn
        >
      </div>
    </div>
    <v-card class="pa-6 elevation-1 mb-6">
      <active-code-filter />
    </v-card>

    <v-card class="elevation-1">
      <active-code-table ref="activeCodeTable" />
    </v-card>

    <new-active-code-dialog
      :state="dialog"
      style="margin: 0 20px"
    ></new-active-code-dialog>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState, mapGetters } from "vuex";

import NewActiveCodeDialog from "./NewActiveCodeDialog";
import ActiveCodeFilter from "./ActiveCodeFilter";
import ActiveCodeTable from "./ActiveCodeTable";
// import moment from "moment";
// import _ from "lodash";

export default {
  components: {
    NewActiveCodeDialog,
    ActiveCodeFilter,
    ActiveCodeTable,
  },
  props: {
    role: String,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    addButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return "Thêm";
        default:
          return "Thêm lớp học";
      }
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.chip-width {
  min-width: 82px;
  justify-content: center;
}
.component-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
</style>
