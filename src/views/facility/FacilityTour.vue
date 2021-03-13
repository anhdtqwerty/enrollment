<template>
  <v-dialog v-model="dialog" max-height="900px" persistent>
    <v-card>
      <v-card-title
        ><div
          :class="{
            'text-subtitle-1 font-weight-bold title--text':
              $vuetify.breakpoint.smAndDown,
            'title--text': $vuetify.breakpoint.mdAndUp,
          }"
        >
          {{ title }}
        </div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <div class="iframe-container">
        <iframe :src="iframeSrc" class="responsive-iframe" />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    state: Boolean,
    title: String,
    iframeSrc: String,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  methods: {
    cancel() {
      this.$emit("closeDialog", false);
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>
.iframe-container {
  position: relative;
  overflow: hidden;
  height: 840px;
}
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.v-dialog {
  margin: 24px 0px !important;
}
</style>