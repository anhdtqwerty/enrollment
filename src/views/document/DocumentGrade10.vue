<template>
  <div class="document-container d-flex py-8 mx-auto">
    <v-col class="px-8" style="flex: 1 1 0px; border-right: 1px solid #e6e4eb">
      <v-card class="elevation-0" width="100%">
        <div class="d-flex align-center">
          <span class="mr-6"
            ><v-icon @click="backToHome()"> mdi-arrow-left </v-icon></span
          >
          <div>
            <div class="document-title">
              Đăng ký vào
              {{ this.document.type === "Khối 6" ? "lớp 6" : "lớp 10" }}
            </div>
            <div class="document-subtitle mt-1">
              Mã hồ sơ: {{ this.document.code }}
            </div>
          </div>
        </div>
        <v-stepper class="elevation-0" v-model="step" vertical non-linear>
          <v-stepper-step
            class="mb-4"
            step="1"
            :complete="isCompleted(1)"
            @click="onStepClick('choose-department', 1)"
          >
            <span class="step-title mb-1">Chọn cơ sở</span>
            <div
              class="step-subtitle"
              :class="getStatusColor('choose-department', 1)"
            >
              {{ getStatus("choose-department", 1) }}
            </div></v-stepper-step
          >
          <v-stepper-step
            class="mb-4"
            step="2"
            :complete="isCompleted(2)"
            @click="onStepClick('fill-info', 2)"
          >
            <span class="step-title mb-1">Thông tin phụ huynh, học sinh</span>
            <div class="step-subtitle" :class="getStatusColor('fill-info', 2)">
              {{ getStatus("fill-info", 2) }}
            </div></v-stepper-step
          >
          <v-stepper-step
            class="mb-4"
            step="3"
            :complete="isCompleted(3)"
            @click="onStepClick('register-expectation', 3)"
          >
            <span class="step-title mb-1">Đăng ký nguyện vọng</span>
            <div
              class="step-subtitle"
              :class="getStatusColor('register-expectation', 3)"
            >
              {{ getStatus("register-expectation", 3) }}
            </div>
          </v-stepper-step>
          <v-stepper-step
            class="mb-4"
            step="4"
            :complete="isCompleted(4)"
            @click="onStepClick('study-result', 4)"
          >
            <span class="step-title mb-1">Kết quả học tập</span>
            <div
              class="step-subtitle"
              :class="getStatusColor('study-result', 4)"
            >
              {{ getStatus("study-result", 4) }}
            </div>
          </v-stepper-step>
          <v-stepper-step
            step="5"
            :complete="isCompleted(5)"
            @click="onStepClick('exam-result', 5)"
          >
            <span class="step-title">Kết quả khảo sát năng lực</span>
            <div
              class="step-subtitle"
              :class="getStatusColor('exam-result', 5)"
            >
              {{ getStatus("exam-result", 5) }}
            </div>
          </v-stepper-step>
        </v-stepper>
        <div class="notice pa-4" v-if="step < 5">
          Quý phụ huynh lưu ý thông tin tiếp theo sẽ được mở để khai báo sau.
          Thời gian cụ thể Nhà trường sẽ gửi qua SMS. Phụ huynh vui lòng kiểm
          tra để nhận thông báo.
        </div>
      </v-card>
    </v-col>
    <v-col v-if="step === 1" class="d-flex px-8" style="flex: 2 1 0px">
      <ChooseFacility
        :document="document"
        :documentStep="document.step"
        @completeStep="updateDocument($event, false)"
        @saveDraft="updateDocument($event, true)"
        @nextStep="nextStep"
      />
    </v-col>
    <v-col v-if="step === 2" class="d-flex px-8" style="flex: 2 1 0px">
      <InfoForm
        :document="document"
        :documentStep="document.step"
        @completeStep="updateDocument($event, false)"
        @saveDraft="updateDocument($event, true)"
        @nextStep="nextStep"
      />
    </v-col>
    <v-col v-if="step === 3" class="d-flex px-8" style="flex: 2 1 0px">
      <Grade10Expectation
        :document="document"
        :documentStep="document.step"
        @completeStep="updateDocument($event, false)"
        @saveDraft="updateDocument($event, true)"
        @nextStep="nextStep"
      />
    </v-col>
    <v-col v-if="step === 4" class="d-flex px-8" style="flex: 2 1 0px">
      <ResultForm
        :document="document"
        :documentStep="document.step"
        @completeStep="updateDocument($event, false)"
        @saveDraft="updateDocument($event, true)"
        @nextStep="nextStep"
      />
    </v-col>
    <v-col v-if="step === 5" class="d-flex px-8" style="flex: 2 1 0px">
      <ExamResultForm
        :document="document"
        :documentStep="document.step"
        @completeStep="updateDocument($event, false)"
        @saveDraft="updateDocument($event, true)"
        @nextStep="nextStep"
      />
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChooseFacility from "./ChooseFacility.vue";
import InfoForm from "./InfoForm.vue";
import ResultForm from "./ResultForm.vue";
import ExamResultForm from "./ExamResultForm.vue";
import Grade10Expectation from "@/modules/cv/Grade10Expectation.vue";
export default {
  components: {
    ChooseFacility,
    InfoForm,
    ResultForm,
    ExamResultForm,
    Grade10Expectation,
  },
  computed: {
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cv", ["step"]),
  },
  props: {
    documentCode: String,
    document: Object,
    systemTime: Object,
  },
  methods: {
    ...mapActions("cv", [
      "fetchCVs",
      "fetchCV",
      "updateCV",
      "checkSystemTime",
      "setStep",
    ]),
    ...mapActions("layout", ["setDocumentDialog"]),
    backToHome() {
      this.$router.push("/");
      this.setDocumentDialog(true);
    },
    updateDocument(data, isDraft) {
      this.$emit("updateDocument", data, isDraft);
    },
    getStatus(key, step) {
      if (!this.systemTime[key] || this.document.step < step) return "Chưa mở";
      else {
        if (!this.document.isDraft) return "Mới mở";
        else if (this.document.isDraft) return "Đang khai báo";
      }
      return "Đã hoàn tất";
    },
    getStatusColor(key, step) {
      if (!this.systemTime[key] || this.document.step < step)
        return "dark-gray--text";
      else {
        if (!this.document.isDraft) return "error--text";
        else if (this.document.isDraft) return "warning--text";
      }
      return "success--text";
    },
    isCompleted(step) {
      return this.document.step > step;
    },
    onStepClick(key, step) {
      // if (!this.systemTime[key]) {
      //   this.$alert.error(
      //     "Phần thông tin tiếp theo chưa được mở. Thời gian cụ thể Nhà trường sẽ gửi qua SMS. Phụ huynh vui lòng kiểm tra tin nhắn để nhận thông báo"
      //   );
      //   return;
      // }
      // if (this.document.step < step) {
      //   this.$alert.error("Xin vui lòng hoàn thành bước trước");
      // }
      this.setStep(step);
    },
    nextStep() {
      this.setStep(this.step + 1);
      this.$loading.active = false;
    },
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
