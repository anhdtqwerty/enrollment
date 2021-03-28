<template>
  <v-dialog v-model="dialog" max-width="1024px" width="100%">
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
      <div class="iframe-container" :style="getIframeContainerHeight">
        <iframe :src="src" class="responsive-iframe" />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  props: {
    state: Boolean,
    title: String,
    src: String,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
    dialog(dialog) {
      if (!dialog) this.$emit("closeDialog", false);
    },
  },
  computed: {
    getIframeContainerHeight() {
      return `height: ${this.window.height * 0.9 - 60}px;`;
    },
  },
  data() {
    return {
      dialog: false,
      htmlUrl: "",
      htmlString: "",
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  methods: {
    cancel() {
      this.$emit("closeDialog");
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.iframe-container {
  position: relative;
  overflow: hidden;
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

@media screen and (max-width: 420px) {
  div >>> .v-dialog {
    margin: 24px 0px !important;
  }
}
</style>
