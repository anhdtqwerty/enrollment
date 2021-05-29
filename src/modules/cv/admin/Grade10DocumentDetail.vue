<template>
  <div class="document-container py-8 mx-auto">
    <v-row no-gutters>
      <v-col
        class="px-8"
        :class="{ 'pb-6': $vuetify.breakpoint.smAndDown }"
        style="border-right: 1px solid #e6e4eb"
        cols="12"
        xs="12"
        sm="12"
        md="4"
      >
        <v-card class="elevation-0" width="100%">
          <v-stepper
            class="elevation-0 py-0"
            v-model="step"
            vertical
            non-linear
          >
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
              <div
                class="step-subtitle"
                :class="getStatusColor('fill-info', 2)"
              >
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
              <span class="step-title"
                >Kết quả kỳ thi tuyển sinh vào Lớp 10</span
              >
              <div
                class="step-subtitle"
                :class="getStatusColor('exam-result', 5)"
              >
                {{ getStatus("exam-result", 5) }}
              </div>
            </v-stepper-step>
          </v-stepper>
        </v-card>
      </v-col>
      <v-col class="d-flex px-8" cols="12" xs="12" sm="12" md="8">
        <ChooseFacility
          v-if="step === 1"
          :document="document"
          :documentStep="5"
          :isAdminPreview="true"
          @nextStep="nextStep"
        />
        <InfoForm
          v-if="step === 2"
          :document="document"
          :documentStep="5"
          :isAdminPreview="true"
          @nextStep="nextStep"
        />
        <Grade10Expectation
          v-if="step === 3"
          :document="document"
          :documentStep="5"
          :systemTime="systemTime"
          :isAdminPreview="true"
          @nextStep="nextStep"
        />
        <ResultForm
          v-if="step === 4"
          :document="document"
          :documentStep="5"
          :systemTime="systemTime"
          :isAdminPreview="true"
          @nextStep="nextStep"
        />
        <ExamResultForm
          v-if="step === 5"
          :document="document"
          :documentStep="5"
          :isAdminPreview="true"
          :systemTime="systemTime"
          @nextStep="nextStep"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChooseFacility from "@/views/document/ChooseFacility.vue";
import InfoForm from "@/views/document/InfoForm.vue";
import ResultForm from "@/views/document/ResultForm.vue";
import ExamResultForm from "@/views/document/ExamResultForm.vue";
import Grade10Expectation from "@/modules/cv/Grade10Expectation.vue";
import moment from "moment";

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
    getExamResultDate() {
      if (this.systemTime.documentSystemTime)
        return moment(
          this.systemTime.documentSystemTime["exam-result"],
          "DD/MM/YYYY HH:mm:ss"
        ).format("DD/MM/YYYY");
      return "12/06/2021";
    },
  },
  props: {
    documentCode: String,
    document: Object,
    systemTime: Object,
  },
  created() {
    this.setStep(1);
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
    getStatus(key, step) {
      if (!this.systemTime) return "Đang cập nhật";
      else if (
        !this.systemTime ||
        !this.systemTime.checkDocumentSystemTime ||
        !this.systemTime.checkDocumentSystemTime[key] ||
        this.document.step < step
      )
        return "Chưa mở";
      else {
        if (!this.document.status === "created") return "Mới mở";
        else if (
          this.document.status === "filling" &&
          this.document.step <= step
        )
          return "Đang khai báo";
      }
      if (
        this.document.step === 5 &&
        (!this.document.ltvExamResult ||
          !this.document.ltvExamResult.passExam ||
          this.document.ltvExamResult.passExam === "")
      )
        return "Chưa có kết quả";
      return "Đã hoàn tất";
    },
    getStatusColor(key, step) {
      if (
        !this.systemTime.checkDocumentSystemTime ||
        !this.systemTime.checkDocumentSystemTime[key] ||
        this.document.step < step
      )
        return "dark-gray--text";
      else {
        if (!this.document.status === "created") return "error--text";
        else if (
          this.document.status === "filling" &&
          this.document.step <= step
        )
          return "warning--text";
      }
      return "success--text";
    },
    isCompleted(step) {
      if (step === 5) return this.document.status === "submitted";
      return this.document.step > step;
    },
    onStepClick(key, step) {
      if (!this.systemTime) return;
      if (
        (!this.systemTime.checkDocumentSystemTime ||
          !this.systemTime.checkDocumentSystemTime[key]) &&
        this.user.role.type !== "admin"
      ) {
        if (step === 5)
          this.$alert.error(
            `Phần thông tin khai báo kết quả kỳ thi tuyển sinh vào lớp 10 của TP Hà Nội hiện giờ chưa được mở. Nhà trường sẽ mở khai báo này khi thành phố công bố kết quả kỳ thi vào lớp 10. Phụ huynh vui lòng kiểm tra tin nhắn yêu cầu khai báo điểm của nhà trường. Dự kiến sau ngày ${this.getExamResultDate}. Xin cảm ơn phụ huynh.`
          );
        else
          this.$alert.error(
            "Phần thông tin tiếp theo chưa được mở. Thời gian cụ thể Nhà trường sẽ gửi qua SMS. Phụ huynh vui lòng kiểm tra tin nhắn để nhận thông báo"
          );
        return;
      }
      if (this.document.step < step && this.user.role.type !== "admin") {
        this.$alert.error("Xin vui lòng hoàn thành bước trước");
        return;
      }
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

div >>> .v-stepper__step--active .v-stepper__label {
  text-shadow: none !important;
}
div >>> .v-stepper__step--active .v-stepper__label span.step-title {
  color: #0084ff;
}
</style>
