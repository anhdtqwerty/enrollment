<template>
  <v-dialog v-model="dialog.state" max-width="400px">
    <v-card class="pa-6">
      <v-card-title class="pa-0 title--text card-title mb-6"
        >{{ dialog.title }}<v-spacer
      /></v-card-title>
      <v-card-text class="card-content mx-auto pa-0" style="max-width:450px">
        <slot name="top-content" class=" mb-4"></slot>
        <slot name="mid-content" class=" mb-4"></slot>
        <slot name="bottom-content" class=" mb-6"></slot>
      </v-card-text>
      <v-card-actions class="justify-space-between pa-0">
        <v-btn
          small
          v-show="!dialog.hideCancel"
          @click="cancel"
          color="primary"
          class="px-6 btn text-none"
          large
          outlined
          dense
          >{{ dialog.cancelText }}</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          small
          v-show="!dialog.hideOk"
          color="primary"
          @click="done"
          class="px-6 btn text-none elevation-0"
          large
          dense
          >{{ dialog.okText }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: this.$dialog.confirmData,
    };
  },
  methods: {
    done() {
      this.dialog.done();
      this.cancel();
    },
    cancel() {
      this.$dialog.cancel();
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
