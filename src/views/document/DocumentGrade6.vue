<template>
  <div class="document-container d-flex py-8 mx-auto">
    <v-row no-gutters style="max-width:100%">
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
              @click="onStepClick('study-result', 3)"
            >
              <span class="step-title mb-1">Kết quả học tập</span>
              <div
                class="step-subtitle"
                :class="getStatusColor('study-result', 3)"
              >
                {{ getStatus("study-result", 3) }}
              </div>
            </v-stepper-step>
            <v-stepper-step
              step="4"
              :complete="isCompleted(4)"
              @click="onStepClick('exam-result', 4)"
            >
              <span class="step-title">Kết quả khảo sát năng lực</span>
              <div
                class="step-subtitle"
                :class="getStatusColor('exam-result', 4)"
              >
                {{ getStatus("exam-result", 4) }}
              </div>
            </v-stepper-step>
          </v-stepper>
          <div class="notice pa-4">
            "Kết quả khảo sát năng lực" sẽ được thông báo đến quý phú huynh sau
            khi nhà trường hoàn thành chấm điểm và đánh giá. Hình thức thông
            báo: <br />- SMS đến số điện thoại đăng ký <br />- Tại mục Kết quả
            khảo sát năng lực
          </div>
        </v-card>
      </v-col>
      <v-col class="d-flex px-8" cols="12" xs="12" sm="12" md="8">
        <ChooseFacility
          v-if="step === 1"
          :document="document"
          :documentStep="document.step"
          @completeStep="updateDocument($event, false)"
          @saveDraft="updateDocument($event, true)"
          @nextStep="nextStep"
        />
        <InfoForm
          v-if="step === 2"
          :document="document"
          :documentStep="document.step"
          @completeStep="updateDocument($event, false)"
          @saveDraft="updateDocument($event, true)"
          @nextStep="nextStep"
        />
        <ResultForm
          v-if="step === 3"
          :document="document"
          :documentStep="document.step"
          @completeStep="updateDocument($event, false)"
          @saveDraft="updateDocument($event, true)"
          @nextStep="nextStep"
        />
        <ExamResultForm
          v-if="step === 4"
          :document="document"
          :documentStep="document.step"
          @completeStep="updateDocument($event, false)"
          @saveDraft="updateDocument($event, true)"
          @nextStep="nextStep"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChooseFacility from "./ChooseFacility.vue";
import InfoForm from "./InfoForm.vue";
import ResultForm from "./ResultForm.vue";
import ExamResultForm from "./ExamResultForm.vue";
export default {
  components: {
    ChooseFacility,
    InfoForm,
    ResultForm,
    ExamResultForm,
  },
  computed: {
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cv", ["step"]),
  },
  props: {
    document: Object,
    systemTime: Object,
  },
  watch: {
    step(step) {
      this.checkStep(step);
    },
    systemTime(systemTime) {
      if (
        systemTime &&
        systemTime.checkDocumentSystemTime &&
        systemTime.checkDocumentSystemTime["exam-result"] &&
        this.document.step === 4 &&
        (!this.document.ltvExamResult || !this.document.ltvExamResult.examMath)
      )
        this.$alert.error(
          "Kết quả khảo sát năng lực sẽ được thông báo đến quý phú huynh sau khi nhà trường hoàn thành chấm điểm và đánh giá. Hình thức thông báo: <br/>- SMS đến số điện thoại đăng ký<br/>- Tại mục Kết quả khảo sát năng lực"
        );
    },
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
    checkStep(step) {
      switch (step) {
        case 3:
          if (
            !this.systemTime.checkDocumentSystemTime["study-result"] &&
            this.user.role.type !== "admin"
          ) {
            this.$alert.error(
              "Phần thông tin tiếp theo chưa được mở. Thời gian cụ thể Nhà trường sẽ gửi qua SMS. Phụ huynh vui lòng kiểm tra tin nhắn để nhận thông báo"
            );
            this.setStep(this.step - 1);
          }
          break;
        case 4:
          if (
            !this.systemTime.checkDocumentSystemTime["exam-result"] &&
            this.user.role.type !== "admin"
          ) {
            this.$alert.error(
              "Kết quả khảo sát năng lực sẽ được thông báo đến quý phú huynh sau khi nhà trường hoàn thành chấm điểm và đánh giá. Hình thức thông báo: <br/>- SMS đến số điện thoại đăng ký<br/>- Tại mục Kết quả khảo sát năng lực"
            );
            this.setStep(this.step - 1);
          } else if (
            this.systemTime.checkDocumentSystemTime["exam-result"] &&
            (!this.document.ltvExamResult ||
              !this.document.ltvExamResult.examMath)
          )
            this.$alert.error(
              "Kết quả khảo sát năng lực sẽ được thông báo đến quý phú huynh sau khi nhà trường hoàn thành chấm điểm và đánh giá. Hình thức thông báo: <br/>- SMS đến số điện thoại đăng ký<br/>- Tại mục Kết quả khảo sát năng lực"
            );
          break;
      }
    },
    backToHome() {
      this.$router.push("/");
      this.setDocumentDialog(true);
    },
    updateDocument(data, isDraft) {
      this.$emit("updateDocument", data, isDraft);
    },
    getStatus(key, step) {
      if (
        (!this.systemTime.checkDocumentSystemTime ||
          !this.systemTime.checkDocumentSystemTime[key]) &&
        this.user.role.type !== "admin"
      )
        return "Chưa mở";
      else {
        if (this.document.step === 4) return "Đã hoàn tất";
        if (!this.document.status === "created") return "Mới mở";
        else if (
          this.document.status === "filling" &&
          this.document.step <= step
        )
          return "Đang khai báo";
      }
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
      if (step === 4) return this.document.status === "submitted";
      return this.document.step > step;
    },
    onStepClick(key, step) {
      if (
        (!this.systemTime.checkDocumentSystemTime ||
          !this.systemTime.checkDocumentSystemTime[key]) &&
        this.user.role.type !== "admin"
      ) {
        if (step === 4)
          this.$alert.error(
            "Kết quả khảo sát năng lực sẽ được thông báo đến quý phú huynh sau khi nhà trường hoàn thành chấm điểm và đánh giá. Hình thức thông báo: \n- SMS đến số điện thoại đăng ký\n- Tại mục Kết quả khảo sát năng lực"
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
