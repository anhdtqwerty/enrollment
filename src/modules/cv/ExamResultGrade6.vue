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
      <hr class="dashed" v-if="!isOpenDisplayResult" />
      <v-card
        class="pa-6 text-justify my-6 elevation-2"
        v-if="!isOpenDisplayResult"
      >
        <div class="text-h6">Phụ huynh lưu ý:</div>
        <div>
          - Hệ thống hiện đang mở chỉnh sửa điểm học bạ cho toàn bộ học sinh.
          Phụ huynh có thể khai báo thêm hoặc chỉnh sửa nội dung thông tin của
          phần này. Hạn chỉnh sửa điểm là 12:00, ngày 17/06/2021.
        </div>
        <div>
          - Nhà trường sẽ lấy dữ liệu điểm học bạ của toàn bộ học sinh vào 12:00
          ngày 17/06/2021 làm căn cứ xét điểm chuẩn vào trường.
        </div>
        <div>
          - Đề nghị phụ huynh khai báo điểm chính xác trước thời gian trên để
          con có thể được cộng đủ số điểm tổng học bạ.
        </div>
      </v-card>
      <!-- TODO: Uncomment when display result-->
      <div v-if="isOpenDisplayResult">
        <hr class="dashed" />
        <div
          class="py-6"
          v-if="
            document.ltvExamResult.passExamText &&
            document.ltvExamResult.passExamType === 'pass'
          "
        >
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
            <div>Phụ huynh vui lòng làm thủ tục nhập học tại trường</div>
            <div>Thời gian làm việc của Ban tuyển sinh</div>
            <div>Sáng: 8:00 - 11:00</div>
            <div>Chiều: 14:00 - 17:00</div>
            <div class="font-weight-bold">
              Nhà trường sẽ dừng tuyển sinh khi đủ chỉ tiêu
            </div>
          </div>
        </div>
        <div
          class="py-6"
          v-else-if="document.ltvExamResult.passExamType === 'fail'"
        >
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
              <div class="text-h6">Thông tin liên hệ:</div>
              <div class="mt-4">
                <b>Cơ Sở A:</b> Số 35 Đinh Núp, Trung Hòa, Cầu Giấy, Hà Nội
              </div>
              <div class="mt-2">
                SĐT: <span class="primary--text">0242.215.5985</span> –
                <span class="primary--text">0246.663.8338</span>
              </div>
              <div class="mt-4">
                <b>Cơ Sở I:</b> Tân Triều, Thanh Trì, Hà Nội
              </div>
              <div class="mt-2">
                SĐT: <span class="primary--text">0243.568.2603</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="py-6"
          v-else-if="document.ltvExamResult.passExamType === 'reserve'"
        >
          <div
            class="mx-auto mb-6 text-center fail-notify-card pa-4"
            style="max-width: 420px"
          >
            <div>Không trúng tuyển Đợt tuyển sinh thứ nhất.</div>
            <div>Học sinh trong danh sách dự khuyết của Nhà trường.</div>
          </div>
          <div class="fail-card pa-4">
            <div>
              <div class="text-h6">Thông tin liên hệ:</div>
              <div class="mt-4">
                <b>Cơ Sở A:</b> Số 35 Đinh Núp, Trung Hòa, Cầu Giấy, Hà Nội
              </div>
              <div class="mt-2">
                SĐT: <span class="primary--text">0242.215.5985</span> –
                <span class="primary--text">0246.663.8338</span>
              </div>
              <div class="mt-4">
                <b>Cơ Sở I:</b> Tân Triều, Thanh Trì, Hà Nội
              </div>
              <div class="mt-2">
                SĐT: <span class="primary--text">0243.568.2603</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="py-6"
          v-else-if="document.ltvExamResult.passExamType === 'violation'"
        >
          <div
            class="mx-auto mb-6 text-center fail-notify-card pa-4"
            style="max-width: 420px"
          >
            <div>Không trúng tuyển Đợt tuyển sinh thứ nhất.</div>
            <div>Học sinh vi phạm quy chế thi của Nhà trường.</div>
          </div>
          <div class="fail-card pa-4">
            <div>
              <div class="text-h6">Thông tin liên hệ:</div>
              <div class="mt-4">
                <b>Cơ Sở A:</b> Số 35 Đinh Núp, Trung Hòa, Cầu Giấy, Hà Nội
              </div>
              <div class="mt-2">
                SĐT: <span class="primary--text">0242.215.5985</span> –
                <span class="primary--text">0246.663.8338</span>
              </div>
              <div class="mt-4">
                <b>Cơ Sở I:</b> Tân Triều, Thanh Trì, Hà Nội
              </div>
              <div class="mt-2">
                SĐT: <span class="primary--text">0243.568.2603</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        this.systemTime &&
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
  font-size: 16px;
  line-height: 20px;
  color: #3e3e3c;
  border-radius: 8px;
}
.fail-notify-card {
  background: rgba(255, 29, 48, 0.2);
  color: rgba(255, 29, 48, 1);
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px;
}
</style>
