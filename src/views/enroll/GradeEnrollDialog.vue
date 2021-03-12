<template>
  <v-dialog
    v-model="dialog"
    height="100%"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    persistent
  >
    <v-card>
      <v-card-title
        ><div>{{ title }}</div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <test />
    </v-card>
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import test from "./test.vue";
export default {
  components: { test },
  props: {
    state: Boolean,
    title: String,
    fileSrc: String,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("closeDialog", false);
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style></style>
