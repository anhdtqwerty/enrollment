<template>
  <div class="document-container d-flex py-8 mx-auto">
    <v-col class="px-8" style="flex: 1 1 0px">
      <v-card class="elevation-0" width="100%">
        <div class="d-flex align-center">
          <span class="mr-6"><v-icon> mdi-arrow-left </v-icon></span>
          <div>
            <div class="document-title">Đăng ký vào lớp 6</div>
            <div class="document-subtitle mt-1">Mã hồ sơ: 00001</div>
          </div>
        </div>
        <v-stepper class="elevation-0" v-model="e13" vertical>
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
      <ChooseFacility @completeFacilityStep="e13 = 2" />
    </v-col>
  </div>
</template>

<script>
import ChooseFacility from "./ChooseFacility.vue";
export default {
  components: {
    ChooseFacility,
  },
  data() {
    return {
      e13: 1,
    };
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
