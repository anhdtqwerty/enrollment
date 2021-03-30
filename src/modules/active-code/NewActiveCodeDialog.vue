<template>
  <v-dialog v-model="dialog" max-width="620px" persistent>
    <PrintActiveCode
      id="printNewActiveCode"
      class="d-none"
      :activeCode="activeCode"
    />
    <ConfirmPrintDialog
      :activeCode="activeCode"
      :state="confirmDialog"
      @closeDialog="confirmDialog = false"
      @onPrint="onPrint"
    />
    <v-card>
      <v-card-title class="admin white--text text-uppercase dialog-title">
        Thêm mã kích hoạt {{ grade }}
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel" class="mr-n1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <div class="d-flex justify-center pa-6">
          <v-btn
            color="admin"
            width="200px"
            :loading="loading"
            @click="submit()"
            depressed
            dark
            >Thêm mã kích hoạt</v-btn
          >
        </div>
        <v-divider></v-divider>
        <div class="d-flex flex-column align-center pa-10">
          <div class="info-title text-uppercase mb-6">Mã kích hoạt</div>
          <div
            class="info-code px-4 py-3 mb-6"
            :class="{
              'available-code': activeCode.code && activeCode.code != '---',
              'unavailable-code': !activeCode.code || activeCode.code === '---',
            }"
          >
            {{ getCode }}
          </div>
          <div class="dialog-title mb-10" style="color: #212121;">
            {{ grade }}
          </div>
          <v-btn
            color="#0D47A1"
            width="200px"
            :loading="loading"
            :disabled="!activeCode.code"
            @click="onConfirmPrint()"
            class="px-3 py-2 text-none"
            outlined
            light
            ><v-icon class="mr-2">mdi-printer</v-icon> In mã kích hoạt</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { get } from "lodash";
import { mapActions, mapGetters } from "vuex";
import PrintActiveCode from "./PrintActiveCode.vue";
import ConfirmPrintDialog from "./ConfirmPrintDialog.vue";

/* eslint-disable no-unused-vars */
export default {
  components: {
    PrintActiveCode,
    ConfirmPrintDialog,
  },
  props: {
    state: Boolean,
    grade: String,
  },
  computed: {
    ...mapGetters("activeCode", ["activeCodes"]),
    ...mapGetters("auth", ["user"]),
    getCode() {
      return get(this.activeCode, "code", "---");
    },
    getGrade() {
      return get(this.activeCode, "grade", "");
    },
  },
  data() {
    return {
      confirmDialog: false,
      activeCode: {},
      dialog: false,
      loading: false,
    };
  },
  watch: {
    state(state) {
      this.dialog = true;
    },
  },
  methods: {
    ...mapActions("activeCode", [
      "fetchActiveCodes",
      "fetchActiveCode",
      "updateActiveCode",
      "createActiveCode",
    ]),
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async onPrint() {
      this.confirmDialog = false;
      this.$loading.active = true;
      await this.sleep(250);
      this.$loading.active = false;
      this.$htmlToPaper("printNewActiveCode");
    },
    onConfirmPrint() {
      this.confirmDialog = true;
    },
    reset() {
      this.activeCode = {};
    },
    async submit() {
      this.loading = true;
      let query = {
        grade: this.grade,
        createdBy: this.user.name || "Admin",
      };
      if (this.user.department === "both") query.department = "unset";
      else query.department = this.user.department;
      const newActiveCode = await this.createActiveCode(query);
      if (newActiveCode) {
        this.activeCode = newActiveCode;
      }
      this.$emit("refresh");
      this.loading = false;
    },
    cancel() {
      this.dialog = false;
      this.reset();
      this.$emit("cancel");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.dialog-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
}
.info-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #757575;
}
.info-code {
  width: 150px;
  background: #bbdefb;
  border-radius: 4px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
}
.available-code {
  color: #0d47a1;
  background: #bbdefb;
}
.unavailable-code {
  color: #d3d3d3;
  background: #f5f5f5;
}
</style>
