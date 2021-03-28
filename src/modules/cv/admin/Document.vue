<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="component-title">Quản lý hồ sơ</div>
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
      </div>
    </div>
    <v-card class="pa-6 elevation-1 mb-6">
      <DocumentFilter />
    </v-card>

    <v-card class="elevation-1">
      <DocumentTable ref="documentTable" />
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState, mapGetters } from "vuex";

import DocumentFilter from "./DocumentFilter";
import DocumentTable from "./DocumentTable";
// import moment from "moment";
// import _ from "lodash";

export default {
  components: {
    DocumentFilter,
    DocumentTable,
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
