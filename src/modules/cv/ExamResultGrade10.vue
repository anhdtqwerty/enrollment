<template>
  <v-form ref="form" v-bind="this.$attrs">
    <v-divider class="py-2" v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-title class="card-title"
      >Kết quả Kỳ thi tuyển sinh vào lớp 10 THPT năm 2021 - 2022</v-card-title
    >
    <v-card-subtitle class="card-subtitle py-6">
      Phụ huynh vui lòng khai báo đầy đủ thông tin và ấn "Hoàn thành" trước ngày
      <strong>{{ getCloseFillDocumentDate }}</strong>
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column pa-0">
      <div class="section-label py-6">Số báo danh</div>
      <v-row class="my-0">
        <v-col class="py-0">
          <div class="field-label">
            Số báo danh dự thi vào kỳ thi vào lớp 10 của Sở GD&ĐT TP. Hà Nội năm
            2021
            <span style="color: red" v-if="document.status !== 'submitted'"
              >*</span
            >
          </div>
          <v-text-field
            placeholder="VD: 123123123"
            v-model="ltvExamResult.studentExamID"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            :rules="[$rules.required]"
            outlined
            validate-on-blur
          />
          <div
            class="info-label mt-2 mb-6"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.studentExamID || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <hr class="dashed" />
      <div class="section-label py-6">
        Kết quả kỳ thi tuyển vào lớp 10 của trường Sở GD&ĐT Hà Nội năm 2021
      </div>
      <v-row class="my-0">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
          <div class="field-label">
            Toán
            <span style="color: red" v-if="document.status !== 'submitted'"
              >*</span
            >
          </div>
          <v-text-field
            placeholder="VD: 10"
            v-model="ltvExamResult.examMath"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            :rules="[$rules.required, $rules.mark]"
            outlined
            validate-on-blur
          />
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 16px"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.examMath || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
          <div class="field-label">
            Văn
            <span style="color: red" v-if="document.status !== 'submitted'"
              >*</span
            >
          </div>
          <v-text-field
            placeholder="VD: 10"
            v-model="ltvExamResult.examLiterature"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            :rules="[$rules.required, $rules.mark]"
            outlined
            validate-on-blur
          />
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 16px"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.examLiterature || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
          <div class="field-label">
            Anh
            <span style="color: red" v-if="document.status !== 'submitted'"
              >*</span
            >
          </div>
          <v-text-field
            placeholder="VD: 10"
            v-model="ltvExamResult.examEnglish"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            :rules="[$rules.required, $rules.mark]"
            @keyup.enter="submit"
            outlined
            validate-on-blur
          />
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 16px"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.examEnglish || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
          <div class="field-label">
            Lịch sử
            <span style="color: red" v-if="document.status !== 'submitted'"
              >*</span
            >
          </div>
          <v-text-field
            placeholder="VD: 10"
            v-model="ltvExamResult.examHistory"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            :rules="[$rules.required, $rules.mark]"
            outlined
            validate-on-blur
          />
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 16px"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.examHistory || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <v-row v-if="document.status !== 'submitted'" class="my-0">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="8">
          <div class="field-label">
            Loại ưu tiên
            <span style="color: red" v-if="document.status !== 'submitted'"
              >*</span
            >
          </div>
          <v-select
            v-model="ltvExamResult.priorityType"
            placeholder="VD: Điểm cộng ưu tiên theo quy định của Sở GD&ĐT Hà Nội"
            item-text="title"
            item-value="value"
            :items="priorityTypes"
            :rules="[$rules.required]"
            v-if="document.status !== 'submitted'"
            outlined
          />
          <div
            class="info-label mt-2 mb-6"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.priorityType || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
          <div class="field-label">Điểm cộng ưu tiên (nếu có)</div>
          <v-text-field
            placeholder="VD: 3"
            :value="getPriorityMark"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            :rules="[$rules.priorityMark]"
            :disabled="
              ltvExamResult.priorityType !==
              'Điểm cộng ưu tiên theo quy định của Sở GD&ĐT Hà Nội'
            "
            outlined
            validate-on-blur
          />
          <div
            class="info-label mt-2 mb-6"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.priorityMark || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
          <div class="field-label">Tổng điểm ban A</div>
          <v-text-field
            placeholder="VD: 10"
            :value="getTotalA"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            hide-details="true"
            disabled
            filled
            outlined
            validate-on-blur
          />
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 24px"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.totalA || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col
          class="py-0"
          :class="{
            'mt-8':
              $vuetify.breakpoint.smAndDown && document.status !== 'submitted',
          }"
          cols="12"
          xs="12"
          sm="12"
          md="4"
        >
          <div class="field-label">Tổng điểm ban A1</div>
          <v-text-field
            placeholder="VD: 10"
            :value="getTotalA1"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            hide-details="true"
            disabled
            filled
            outlined
            validate-on-blur
          />
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 24px"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.totalA1 || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col
          class="py-0"
          :class="{
            'mt-8':
              $vuetify.breakpoint.smAndDown && document.status !== 'submitted',
          }"
          cols="12"
          xs="12"
          sm="12"
          md="4"
        >
          <div class="field-label">Tổng điểm ban D</div>
          <v-text-field
            placeholder="VD: 10"
            :value="getTotalD"
            type="number"
            color="primary"
            v-if="document.status !== 'submitted'"
            @keyup.enter="submit"
            hide-details="true"
            disabled
            filled
            outlined
            validate-on-blur
          />
          <div
            class="info-label error--text mt-2 mb-6"
            style="font-size: 24px"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.totalD || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <div class="py-6" v-if="document.status !== 'submitted'">
        <div class="font-weight-bold">Cách tính tổng điểm</div>
        <div>
          - Ban A: ĐXT = Điểm Toán x4 + Điểm Anh x4 + Điểm Văn + Lịch sử + Điểm
          ưu tiên
        </div>
        <div>
          - Ban A1: ĐXT = Điểm Toán x4 + Điểm Anh x4 + Điểm Văn + Lịch sử + Điểm
          ưu tiên
        </div>
        <div>
          - Ban D: ĐXT = (Điểm Toán x3 + Điểm Văn + Điểm Anh) x3 + Lịch sử +
          Điểm ưu tiên
        </div>
        <div class="font-weight-bold mt-3">Các diện điểm cộng ưu tiên:</div>
        <div>- Điểm ưu tiên theo quy định của Sở GD&ĐT Hà Nội.</div>
        <div>
          - Con em chiến sĩ, cán bộ y tế phục vụ chống dịch Covid-19 được cộng 2
          điểm.
        </div>
        <div>- Học sinh THCS Lương Thế Vinh được cộng 3 điểm.</div>
      </div>
      <hr class="dashed" />
      <div class="section-label py-6">Đăng ký nguyện vọng ban tại trường</div>
      <v-row class="my-0">
        <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
          <div class="field-label">
            Nguyện vọng 1
            <span style="color: red" v-if="document.status !== 'submitted'"
              >*</span
            >
          </div>
          <v-select
            v-model="ltvExamResult.groupExpectation1"
            placeholder="VD: Ban A"
            item-text="title"
            item-value="value"
            :items="groups"
            :rules="[$rules.required]"
            v-if="document.status !== 'submitted'"
            outlined
          />
          <div
            class="info-label mt-2 mb-6"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.groupExpectation1 || "Chưa có thông tin" }}
          </div>
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
          <div class="field-label">Nguyện vọng 2</div>
          <v-select
            v-model="ltvExamResult.groupExpectation2"
            placeholder="VD: Ban A1"
            item-text="title"
            item-value="value"
            :items="groups"
            v-if="document.status !== 'submitted'"
            outlined
          />
          <div
            class="info-label mt-2 mb-6"
            v-if="document.status === 'submitted'"
          >
            {{ ltvExamResult.groupExpectation2 || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <div
        class="d-flex justify-center py-6"
        v-if="document.status !== 'submitted'"
      >
        <hr class="dashed" />
        <v-checkbox
          class="align-self-start mt-0 pt-0"
          v-model="agree"
          :rules="[$rules.checkbox]"
        ></v-checkbox>
        <p class="text-justify">
          Con tôi đã đạt đủ điểm chuẩn vào trường Lương Thế Vinh & có nguyện
          vọng được vào học tại trường. Nếu được nhận vào học, gia đình chúng
          tôi và cháu sẽ chấp hành mọi nội quy, quy định của nhà trường. Đơn này
          đã được gia đình thống nhất và nộp cho nhà trường ngày hôm nay.
        </p>
      </div>
      <div
        v-if="
          ltvExamResult.passExam !== '' &&
          systemTime.checkDocumentSystemTime &&
          !systemTime.checkDocumentSystemTime['close-fill-document']
        "
      >
        <hr class="dashed" />
        <div v-if="ltvExamResult.passExam === true">
          <div class="mx-auto py-6" style="max-width: 355px">
            <v-img src="@/assets/pass-exam.svg" />
          </div>
          <div class="fail-card pa-4">
            <div>
              Học sinh
              <span class="font-weight-bold">{{ document.name }}</span> đã trúng
              tuyển đợt 1 vào trường THCS & THPT Lương Thế Vinh.
            </div>
            <div>
              Phụ huynh vui lòng làm thủ tục nhập học ngày
              <span class="error--text">{{ getRegisterDay }}</span>
            </div>
            <div>Thời gian làm việc của Ban tuyển sinh</div>
            <div>Sáng: 8:00 - 11:00</div>
            <div>Chiều: 14:00 - 17:00</div>
            <div class="font-weight-bold">
              Nhà trường sẽ dừng tuyển sinh khi đủ chỉ tiêu
            </div>
          </div>
        </div>
        <div class="py-6" v-if="ltvExamResult.passExam === false">
          <div class="mx-auto mb-6" style="max-width: 355px">
            <v-img src="@/assets/fail-exam.svg" />
          </div>
          <div class="fail-card pa-4">
            <p>
              Nếu quý phụ huynh vẫn có nguyện vọng đăng ký vào danh sách dự
              khuyết, xin vui lòng liên hệ trực tiếp văn phòng tại cơ sở đăng
              ký.
            </p>
            <div>
              <p>Thông tin liên hệ:</p>
              <p>Cơ Sở A: Số 35 Đinh Núp, Trung Hòa, Cầu Giấy, Hà Nội</p>
              <p>
                SĐT: <span class="primary--text">0242.215.5985</span> –
                <span class="primary--text">0246.663.8338</span>
              </p>
              <p>Cơ Sở I: Tân Triều, Thanh Trì, Hà Nội</p>
              <p>SĐT: <span class="primary--text">0243.568.2603</span></p>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-form>
</template>

<script>
import moment from "moment";

export default {
  props: {
    documentStep: Number,
    document: {
      type: Object,
      default: () => {},
    },
    systemTime: Object,
  },
  computed: {
    getCloseFillDocumentDate() {
      return this.systemTime.documentSystemTime &&
        this.systemTime.documentSystemTime["close-fill-document"]
        ? moment(
            this.systemTime.documentSystemTime["close-fill-document"],
            "DD/MM/YYYY hh:mm:ss"
          ).format("DD/MM/YYYY")
        : "01/07/2021";
    },
    getRegisterDay() {
      return this.systemTime.documentSystemTime &&
        this.systemTime.documentSystemTime["register-day"]
        ? moment(
            this.systemTime.documentSystemTime["register-day"],
            "DD/MM/YYYY hh:mm:ss"
          ).format("DD/MM/YYYY")
        : "01/07/2021";
    },
    getPriorityMark() {
      switch (this.ltvExamResult.priorityType) {
        case "Điểm cộng ưu tiên theo quy định của Sở GD&ĐT Hà Nội":
          return "";
        case "Con em chiến sĩ, cán bộ y tế phục vụ chống dịch Covid-19":
          return 2;
        case "Học sinh THCS Lương Thế Vinh":
          return 3;
        case "Không có điểm cộng":
          return 0;
        default:
          return 0;
      }
    },
    getTotalA() {
      if (
        !this.ltvExamResult.examMath ||
        !this.ltvExamResult.examLiterature ||
        !this.ltvExamResult.examEnglish ||
        !this.ltvExamResult.examHistory ||
        isNaN(this.getPriorityMark)
      )
        return "";
      return (
        parseFloat(this.ltvExamResult.examMath) * 4 +
        parseFloat(this.ltvExamResult.examEnglish) * 4 +
        parseFloat(this.ltvExamResult.examLiterature) +
        parseFloat(this.ltvExamResult.examHistory) +
        this.getPriorityMark
      );
    },
    getTotalA1() {
      if (
        !this.ltvExamResult.examMath ||
        !this.ltvExamResult.examLiterature ||
        !this.ltvExamResult.examEnglish ||
        !this.ltvExamResult.examHistory ||
        isNaN(this.getPriorityMark)
      )
        return "";
      return (
        parseFloat(this.ltvExamResult.examMath) * 4 +
        parseFloat(this.ltvExamResult.examEnglish) * 4 +
        parseFloat(this.ltvExamResult.examLiterature) +
        parseFloat(this.ltvExamResult.examHistory) +
        this.getPriorityMark
      );
    },
    getTotalD() {
      if (
        !this.ltvExamResult.examMath ||
        !this.ltvExamResult.examLiterature ||
        !this.ltvExamResult.examEnglish ||
        !this.ltvExamResult.examHistory ||
        isNaN(this.getPriorityMark)
      )
        return "";
      return (
        (parseFloat(this.ltvExamResult.examMath) +
          parseFloat(this.ltvExamResult.examEnglish) +
          parseFloat(this.ltvExamResult.examLiterature)) *
          3 +
        parseFloat(this.ltvExamResult.examHistory) +
        this.getPriorityMark
      );
    },
  },
  data() {
    return {
      isValid: false,
      ltvExamResult: {
        studentExamID: "",
        examMath: "",
        examLiterature: "",
        examEnglish: "",
        examHistory: "",
        passExam: "",
        priorityType: "",
        groupExpectation1: "",
        groupExpectation2: "",
      },
      agree: false,
      priorityTypes: [
        {
          title: "Điểm cộng ưu tiên theo quy định của Sở GD&ĐT Hà Nội",
          value: "Điểm cộng ưu tiên theo quy định của Sở GD&ĐT Hà Nội",
        },
        {
          title: "Con em chiến sĩ, cán bộ y tế phục vụ chống dịch Covid-19",
          value: "Con em chiến sĩ, cán bộ y tế phục vụ chống dịch Covid-19",
        },
        {
          title: "Học sinh THCS Lương Thế Vinh",
          value: "Học sinh THCS Lương Thế Vinh",
        },
        {
          title: "Không có điểm cộng",
          value: "Không có điểm cộng",
        },
      ],
      groups: [
        { title: "Ban A", value: "Ban A" },
        { title: "Ban A1", value: "Ban A1" },
        { title: "Ban D", value: "Ban D" },
      ],
    };
  },
  created() {
    if (this.document.ltvExamResult) {
      this.ltvExamResult = this.document.ltvExamResult;
      this.agree = this.document.status === "submitted";
      console.log(this.ltvExamResult.passExam);
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
        ltvExamResult: {
          ...this.ltvExamResult,
          priorityMark: !isNaN(this.getPriorityMark)
            ? this.getPriorityMark
            : "",
          totalA: !isNaN(this.getTotalA) ? this.getTotalA : "",
          totalA1: !isNaN(this.getTotalA1) ? this.getTotalA1 : "",
          totalD: !isNaN(this.getTotalD) ? this.getTotalD : "",
        },
      };
    },
  },
};
</script>

<style scoped>
.mobile-card-title {
  font-size: 22px !important;
}
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

@media only screen and (max-width: 400px) {
  .card-title {
    font-size: 20px;
  }
}
@media only screen and (max-width: 350px) {
  .card-title {
    font-size: 17px;
  }
}

@media only screen and (max-width: 500px) and (min-width: 400px) {
  .card-title {
    font-size: 21px;
  }
}
</style>
