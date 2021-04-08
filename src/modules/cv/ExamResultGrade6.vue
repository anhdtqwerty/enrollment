<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-divider class="py-2" v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-title class="card-title">Điểm thi</v-card-title>
    <v-card-subtitle class="card-subtitle py-6">
      Kết quả kỳ khảo sát & đánh giá năng lực để vào trường THCS Lương Thế Vinh
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column pa-0">
      <v-row class="my-0">
        <v-col class="py-0">
          <div class="field-label">Số báo danh</div>
          <div class="info-label mt-2 mb-6" v-if="documentStep === 4">
            {{ ltvExamResult.studentExamID || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label">Toán</div>
          <div
            class="info-label error--text mt-2 mb-6"
            v-if="documentStep === 4"
          >
            {{ ltvExamResult.examMath || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label">Văn</div>
          <div
            class="info-label error--text mt-2 mb-6"
            v-if="documentStep === 4"
          >
            {{ ltvExamResult.examMath || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label">Anh</div>
          <div
            class="info-label error--text mt-2 mb-6"
            v-if="documentStep === 4"
          >
            {{ ltvExamResult.examEnglish || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="3">
          <div class="field-label mb-2">Tổng điểm</div>
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 24px"
            v-if="documentStep === 4"
          >
            {{ ltvExamResult.totalMark || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <div
        v-if="
          ltvExamResult.passExam !== '' &&
          systemTime.checkDocumentSystemTime &&
          systemTime.checkDocumentSystemTime['display-exam-result']
        "
      >
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
      </div>
    </v-card-text>
  </v-form>
</template>

<script>
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
  data() {
    return {
      isValid: false,
      ltvExamResult: {
        studentExamID: "",
        examMath: "",
        examLiterature: "",
        examEnglish: "",
        totalMark: "",
        passExam: "",
      },
      agree: false,
    };
  },
  created() {
    if (this.document.ltvExamResult) {
      this.ltvExamResult = this.document.ltvExamResult;
    }
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
