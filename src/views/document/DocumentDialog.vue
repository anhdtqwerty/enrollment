<template>
  <v-dialog v-model="dialog" max-width="980px" persistent>
    <v-card>
      <v-card-title
        ><div
          :class="{
            'text-subtitle-1 font-weight-bold title--text':
              $vuetify.breakpoint.smAndDown,
            'title--text': $vuetify.breakpoint.mdAndUp,
          }"
        >
          Quản lý hồ sơ
        </div>
        <v-spacer />
        <v-icon @click="cancel()">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-row class="pa-6" style="background: #0084ff" no-gutters>
        <v-col cols="4">
          <v-card class="mr-6">
            <v-card-title class="subtitle">Tạo hồ sơ mới</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-4">
              <v-form ref="form">
                <div class="text-subtitle-1 mb-2">
                  Mã kích hoạt
                  <span
                    ><v-icon color="#FF1D30" style="font-size: 14px"
                      >mdi-help-circle-outline</v-icon
                    ></span
                  >
                </div>
                <v-text-field
                  placeholder="Nhập số điện thoại tại đây (Ví dụ: 097372xxxx)"
                  v-model="activeCode"
                  name="login"
                  type="text"
                  color="primary"
                  @keyup.enter="submit"
                  outlined
                  validate-on-blur
                />
                <div class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    class="text-none btn px-6 py-3 text-center"
                    @click="onCreateDocument"
                    large
                    >Xác nhận</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card>
            <v-data-table> </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <DocumentTutorial :state="tutorialDialog" @closeTutorial="toggleTutorial" />
  </v-dialog>
</template>
<script>
/* eslint-disable no-unused-vars */
import DocumentTutorial from "./DocumentTutorial.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    DocumentTutorial,
  },
  props: {
    state: Boolean,
  },
  watch: {
    state(state) {
      this.dialog = state;
    },
  },
  data() {
    return {
      dialog: false,
      tutorialDialog: false,
      activeCode: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("closeDocument", false);
    },
    toggleTutorial(data) {
      this.tutorialDialog = data;
    },
    onCreateDocument() {
      this.$emit("closeDocument", false);
      this.$router.push("/ho-so");
    },
  },
};
/* eslint-enable no-unused-vars */
</script>
<style scoped>
.subtitle {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
}
.btn {
  border-radius: 4px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
</style>
