<template>
  <div class="document-container d-flex py-8 mx-auto">
    <v-col class="px-8" style="flex: 1 1 0px">
      <v-card class="elevation-0" width="100%">
        <div class="d-flex align-center">
          <span class="mr-6"
            ><v-icon @click="backToHome()"> mdi-arrow-left </v-icon></span
          >
          <div>
            <div class="document-title">Đăng ký vào lớp 6</div>
            <div class="document-subtitle mt-1">Mã hồ sơ: 00001</div>
          </div>
        </div>
        <v-stepper class="elevation-0" v-model="step" vertical>
          <v-stepper-step class="mb-4" step="1">
            <span class="step-title mb-1">Chọn cơ sở</span>
            <div class="step-subtitle">Đang khai báo</div></v-stepper-step
          >
          <v-stepper-step class="mb-4" step="2">
            <span class="step-title mb-1">Thông tin phụ huynh, học sinh</span>
            <div class="step-subtitle">Đang khai báo</div></v-stepper-step
          >
          <v-stepper-step class="mb-4" step="3">
            <span class="step-title mb-1">Kết quả học tập</span>
            <div class="step-subtitle">Chưa mở</div>
          </v-stepper-step>
          <v-stepper-step step="4">
            <span class="step-title">Kết quả khảo sát năng lực</span>
            <div class="step-subtitle">Chưa mở</div>
          </v-stepper-step>
        </v-stepper>
        <div class="notice pa-4">
          Quý phụ huynh lưu ý thông tin tiếp theo sẽ được mở để khai báo sau.
          Thời gian cụ thể Nhà trường sẽ gửi qua SMS. Phụ huynh vui lòng kiểm
          tra để nhận thông báo.
        </div>
      </v-card>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col class="d-flex px-8" style="flex: 2 1 0px">
      <ChooseFacility
        :document="document"
        :documentCode="documentCode"
        :step="step"
        @completeFacilityStep="step = 2"
      />
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChooseFacility from "./ChooseFacility.vue";
export default {
  components: {
    ChooseFacility,
  },
  computed: {
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cv", ["CVs", "CV"]),
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    ...mapActions("layout", ["setDocumentDialog"]),
    backToHome() {
      this.$router.push("/");
      this.setDocumentDialog(true);
    },
  },
  data() {
    return {
      documentCode: "",
      document: {},
      step: 1,
    };
  },
  async created() {
    this.documentCode = this.$route.params.code;
    this.$loading.active = true;
    if (!this.user || !this.isAuthenticated) {
      this.$alert.error(`Bạn cần phải đăng nhập để sử dụng chức năng này!`);
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    await this.fetchCV({ code: this.documentCode, userId: this.user.id });
    if (!this.CV(this.documentCode)) {
      this.$alert.error(
        `Hồ sơ ${this.documentCode} không tồn tại hoặc không có quyền truy cập!`
      );
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    this.document = this.CV(this.documentCode);
    this.step = this.document.step;
    console.log(this.document);
    this.$loading.active = false;
  },
};
</script>

<style scoped>
.v-stepper--vertical {
  padding: 24px 0px;
}
div >>> .v-stepper--vertical .v-stepper__step__step {
  margin-right: 24px !important;
}
.v-stepper--vertical .v-stepper__step {
  padding: 0px !important;
}
.notice {
  background: rgba(255, 196, 16, 0.2);
  border-radius: 4px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
}
.document-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
}
.document-subtitle {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #9c9c9c;
}
.step-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.step-subtitle {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
}
.document-container {
  height: 100%;
  max-width: 1280px;
}
</style>
