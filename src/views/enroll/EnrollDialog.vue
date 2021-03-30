<template>
  <v-dialog v-model="dialog" max-width="740px" persistent>
    <v-card>
      <v-card-title
        ><div class="title--text">Thông tin tuyển sinh</div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions
        class="pa-0"
        :class="{
          'd-flex': $vuetify.breakpoint.mdAndUp,
          'd-flex flex-column py-8': $vuetify.breakpoint.smOnly,
          'd-flex flex-column py-6': $vuetify.breakpoint.xsOnly,
        }"
      >
        <v-card
          class="d-flex flex-column align-center elevation-0 pa-4"
          :class="{
            'desktop-btn py-12': $vuetify.breakpoint.mdAndUp,
            'mb-4': $vuetify.breakpoint.smOnly,
            'mb-3': $vuetify.breakpoint.xsOnly,
          }"
          @click="grade6Dialog = true"
        >
          <v-img src="@/assets/enroll/khoi-6.svg" width="160px"></v-img>
          <div class="btn-title title--text mt-6">
            Thông tin tuyển sinh Lớp 6
          </div>
        </v-card>
        <v-card
          class="d-flex flex-column align-center elevation-0 pa-4"
          :class="{ 'desktop-btn py-12': $vuetify.breakpoint.mdAndUp }"
          @click="grade10Dialog = true"
        >
          <v-img src="@/assets/enroll/khoi-10.svg" width="160px"></v-img>
          <div class="btn-title title--text mt-6">
            Thông tin tuyển sinh Lớp 10
          </div>
        </v-card>
      </v-card-actions>
    </v-card>
    <GradeEnrollDialog
      title="Thông tin tuyển sinh khối lớp 6"
      :src="`${$baseUrl}Khoi6.html`"
      :state="grade6Dialog"
      @closeDialog="toggleGrade6Dialog"
    />
    <GradeEnrollDialog
      title="Thông tin tuyển sinh khối lớp 10"
      :src="`${$baseUrl}Khoi10.html`"
      :state="grade10Dialog"
      @closeDialog="toggleGrade10Dialog"
    />
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import GradeEnrollDialog from "@/views/enroll/GradeEnrollDialog.vue";

export default {
  components: { GradeEnrollDialog },
  props: {
    state: Boolean,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  computed: {},
  data() {
    return {
      dialog: false,
      grade6Dialog: false,
      grade10Dialog: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("closeEnroll", false);
    },
    toggleGrade6Dialog(data) {
      this.grade6Dialog = data;
    },
    toggleGrade10Dialog(data) {
      this.grade10Dialog = data;
    },
  },
};
/* eslint-enable no-unused-vars */
</script>

<style scoped>
.btn-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.desktop-btn {
  width: 50%;
}
@media screen and (min-width: 600px) {
  div.v-card--link:hover {
    background: rgb(62, 62, 60, 0.1) !important;
  }
}
</style>
