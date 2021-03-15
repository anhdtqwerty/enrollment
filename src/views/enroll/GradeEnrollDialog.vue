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
        <iframe :src="htmlUrl" class="responsive-iframe" />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import { grade6HTML } from "@/assets/enroll/htmlHelper.js";
import { grade10HTML } from "@/assets/enroll/htmlHelper.js";
export default {
  props: {
    state: Boolean,
    title: String,
    grade: String,
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
      this.$emit("closeDialog", false);
    },
    getBlobURL(code, type) {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
    },
    getGeneratedPageURL(html) {
      const source = `
      <html>
        <head>
        </head>
        <body>
          ${html || ""}
        </body>
      </html>
    `;
      return this.getBlobURL(source, "text/html");
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
  mounted() {
    if (this.grade === "grade6") this.htmlString = grade6HTML;
    if (this.grade === "grade10") this.htmlString = grade10HTML;
    this.htmlUrl = this.getGeneratedPageURL(this.htmlString);
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

@media screen and (max-width: 400px) {
  div >>> .v-dialog {
    margin: 24px 0px !important;
  }
}
</style>
