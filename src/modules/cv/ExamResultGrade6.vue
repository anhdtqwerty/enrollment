<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-divider class="py-2" v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-title class="card-title">Điểm thi</v-card-title>
    <v-card-subtitle class="card-subtitle" style="padding: 24px 0px !important">
      Kết quả kỳ khảo sát & đánh giá năng lực để vào trường THCS Lương Thế Vinh
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column pa-0">
      <v-row class="my-0">
        <v-col class="py-0">
          <div class="field-label">Mã hồ sơ</div>
          <div class="info-label mt-2 mb-6" v-if="documentStep === 4">
            {{ getCodeCV }}
          </div>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label" style="height: 42px">
            Điểm bài Khảo sát ĐGNL Tổng hợp
          </div>
          <div
            class="info-label error--text mt-2 mb-6"
            v-if="documentStep === 4"
          >
            {{ getExamMark }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label" style="height: 42px">Tổng điểm Học Bạ</div>
          <div
            class="info-label error--text mt-2 mb-6"
            v-if="documentStep === 4"
          >
            {{ getTotalMathLiterature }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label" style="height: 42px">Điểm ưu tiên</div>
          <div
            class="info-label error--text mt-2 mb-6"
            v-if="documentStep === 4"
          >
            {{ getPriorityMark }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label mb-2" style="height: 42px">Tổng điểm</div>
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 20px"
            v-if="documentStep === 4"
          >
            {{ getTotalMark }}
          </div>
        </v-col>
      </v-row>
      <!-- TODO: Uncomment when display result-->
      <!-- <div v-if="isOpenDisplayResult">
        <hr class="dashed" />
        <div class="py-6" v-if="ltvExamResult.passExam">
          <div class="mx-auto" style="max-width: 355px">
            <v-img src="@/assets/pass-exam.svg" />
          </div>
          <div
            class="d-flex align-center pt-6"
            v-if="document.status !== 'submitted'"
          >
            <v-checkbox
              class="align-self-start mt-0 pt-0"
              v-model="agree"
              :rules="[$rules.checkbox]"
            ></v-checkbox>
            <div class="text-justify">
              Nếu được nhận vào học, gia đình chúng tôi và cháu sẽ chấp hành mọi
              nội quy, quy định của nhà trường. Đơn này đã được gia đình thống
              nhất và nộp cho nhà trường ngày hôm nay.
            </div>
          </div>
          <div
            class="fail-card pa-4 mt-6"
            v-if="document.status === 'submitted'"
          >
            <div>
              Học sinh
              <span class="font-weight-bold">{{ document.name }}</span> đã trúng
              tuyển đợt 1 vào trường THCS & THPT Lương Thế Vinh.
            </div>
            <div>
              Phụ huynh vui lòng làm thủ tục nhập học tại trường trong 2 ngày
              <span class="error--text">13/06/2021</span> và
              <span class="error--text">14/06/2021</span>
            </div>
            <div>Thời gian làm việc của Ban tuyển sinh</div>
            <div>Sáng: 8:00 - 11:00</div>
            <div>Chiều: 14:00 - 17:00</div>
            <div class="font-weight-bold">
              Nhà trường sẽ dừng tuyển sinh khi đủ chỉ tiêu
            </div>
          </div>
        </div>
        <div class="py-6" v-if="!ltvExamResult.passExam">
          <div class="mx-auto mb-6" style="max-width: 355px">
            <v-img src="@/assets/fail-exam.svg" />
          </div>
          <div class="fail-card pa-4">
            <div>
              Nếu quý phụ huynh vẫn có nguyện vọng đăng ký vào danh sách dự
              khuyết, xin vui lòng liên hệ trực tiếp văn phòng tại cơ sở đăng
              ký.
            </div>
            <div>
              <div>Thông tin liên hệ:</div>
              <div>Cơ Sở A: Số 35 Đinh Núp, Trung Hòa, Cầu Giấy, Hà Nội</div>
              <div>
                SĐT: <span class="primary--text">0242.215.5985</span> –
                <span class="primary--text">0246.663.8338</span>
              </div>
              <div>Cơ Sở I: Tân Triều, Thanh Trì, Hà Nội</div>
              <div>SĐT: <span class="primary--text">0243.568.2603</span></div>
            </div>
          </div>
        </div>
      </div> -->
    </v-card-text>
  </v-form>
</template>

<script>
import { get } from "lodash";
export default {
  props: {
    documentStep: Number,
    document: {
      type: Object,
      default: () => {},
    },
    systemTime: Object,
    isAdminPreview: Boolean,
  },
  computed: {
    isDevelopmentMode() {
      return process.env.NODE_ENV === "development";
    },
    isOpenDisplayResult() {
      if (
        this.document.ltvExamResult &&
        this.document.ltvExamResult.passExam !== "" &&
        this.systemTime.checkDocumentSystemTime &&
        this.systemTime.checkDocumentSystemTime["display-exam-result"]
      )
        return true;
      return false;
    },
    getCodeCV() {
      if (this.isOpenDisplayResult)
        return get(this.document, "code", "Chưa có thông tin");
      else return "Chưa có thông tin";
    },
    getExamMark() {
      if (this.isOpenDisplayResult)
        return get(
          this.document,
          "ltvExamResult.examMark",
          "Chưa có thông tin"
        );
      else return "Chưa có thông tin";
    },
    getTotalMathLiterature() {
      if (this.isOpenDisplayResult)
        return get(
          this.document,
          "studyRecord.totalMathLiterature",
          "Chưa có thông tin"
        );
      else return "Chưa có thông tin";
    },
    getPriorityMark() {
      if (this.isOpenDisplayResult)
        return get(
          this.document,
          "ltvExamResult.priorityMark",
          "Chưa có thông tin"
        );
      else return "Chưa có thông tin";
    },
    getTotalMark() {
      if (this.isOpenDisplayResult)
        return get(
          this.document,
          "ltvExamResult.totalMark",
          "Chưa có thông tin"
        );
      else return "Chưa có thông tin";
    },
  },
  data() {
    return {
      isValid: false,
      agree: false,
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getData() {
      return {
        agree: this.agree,
      };
    },
  },
};
</script>

<style scoped>
.field-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #797979;
  margin-bottom: 4px;
}
.section-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #3e3e3c;
}
.info-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #3e3e3c;
}
hr.dashed {
  width: 100%;
  border: 1px dashed #e6e4eb;
}
.card-title {
  padding: 0 !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
}
.card-subtitle {
  padding: 0 !important;
  margin-top: 0 !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #3e3e3c;
}
.fail-card {
  background: rgba(255, 196, 16, 0.2);
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #3e3e3c;
}
</style>
