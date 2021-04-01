<template>
  <v-dialog v-model="dialog" max-width="420px" persistent>
    <v-card>
      <v-card-title class="admin white--text text-uppercase dialog-title">
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel" class="mr-n1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="py-0">
        <div class="info-text pt-6" v-html="topContent"></div>
        <div class="info-text pt-6" v-html="midContent"></div>
        <div class="info-text pt-6" v-html="bottomContent"></div>
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
export default {
  data() {
    return {
      dialog: this.$adminDialog.confirmData,
    };
  },
  methods: {
    done() {
      this.dialog.done();
      this.cancel();
    },
    cancel() {
      this.$adminDialog.cancel();
    },
  },
};
</script>

<style scoped>
.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.card-content {
  text-align: justify !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  line-height: 20px;
  color: #3e3e3c !important;
}
.btn {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 20px;
}
</style>
