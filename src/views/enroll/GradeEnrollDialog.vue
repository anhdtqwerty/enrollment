<template>
  <v-dialog v-model="dialog" max-height="900px" persistent>
    <v-card>
      <v-card-title
        ><div :class="{ 'text-subtitle-1 font-weight-bold title--text': $vuetify.breakpoint.smAndDown }">
          {{ title }}
        </div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <div class="iframe-container">
        <iframe :src="htmlUrl" class="responsive-iframe" />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import { grade6HTML } from "@/assets/enroll/htmlHelper.js";
export default {
  props: {
    state: Boolean,
    title: String,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  data() {
    return {
      dialog: false,
      htmlUrl: "",
      htmlString: grade6HTML,
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
  },
  mounted() {
    this.htmlUrl = this.getGeneratedPageURL(this.htmlString);
  },
};
/* eslint-enable no-unused-vars */
</script>

<style>
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
</style>
