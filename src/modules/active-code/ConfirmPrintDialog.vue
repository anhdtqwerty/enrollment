<template>
  <v-dialog v-model="dialog" max-width="420px" persistent>
    <v-card>
      <v-card-title class="admin white--text text-uppercase dialog-title">
        Xác nhận in mã kích hoạt
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel" class="mr-n1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="py-0">
        <div class="info-text pt-6">
          Bạn có muốn in Mã kích hoạt
          <span style="font-size: 16px; font-weight: bold">{{
            activeCode.code
          }}</span>
          này?
        </div>
        <div class="info-text pt-6">
          Nếu chắc chắn hãy ấn Xác nhận để in mã.
        </div>
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-btn
          color="admin"
          @click="cancel"
          width="118"
          :loading="loading"
          large
          outlined
          >Hủy</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          color="admin"
          @click="confirm"
          :loading="loading"
          width="118"
          class="white--text elevation-0"
          large
          >Xác nhận</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

/* eslint-disable no-unused-vars */
export default {
  props: {
    state: Boolean,
    activeCode: Object,
  },
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  methods: {
    ...mapActions("activeCode", [
      "fetchActiveCodes",
      "fetchActiveCode",
      "updateActiveCode",
      "createActiveCode",
    ]),
    async confirm() {
      this.loading = true;
      await this.updateActiveCode({
        id: this.activeCode.id,
        printNum: this.activeCode.printNum + 1,
      });
      this.$emit("onPrint");
      this.loading = false;
    },
    cancel() {
      this.dialog = false;
      this.$emit("closeDialog");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.info-text {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #212121;
}
</style>
