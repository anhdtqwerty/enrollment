<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">Lớp 1</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade1Math"
          type="text"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade1Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade1Literature"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade1Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh (nếu có)</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade1English"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          :rules="[$rules.mark]"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade1English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="studyResult.grade1Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          v-if="documentStep === 3 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade1Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 2</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade2Math"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade2Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade2Literature"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade2Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh (nếu có)</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade2English"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          :rules="[$rules.mark]"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade2English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="studyResult.grade2Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          v-if="documentStep === 3 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade2Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 3</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade3Math"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade3Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade3Literature"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade3Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh (nếu có)</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade3English"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          :rules="[$rules.mark]"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade3English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="studyResult.grade3Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          v-if="documentStep === 3 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade3Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 4</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade4Math"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade4Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade4Literature"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade4Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh (nếu có)</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade4English"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          :rules="[$rules.mark]"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade4English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="studyResult.grade4Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          v-if="documentStep === 3 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade4Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 5</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Toán</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade5Math"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          :rules="[$rules.mark]"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade5Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Văn</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade5Literature"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          :rules="[$rules.mark]"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade5Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh (nếu có)</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade5English"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          :rules="[$rules.mark]"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade5English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Hạnh kiểm cả năm</div>
        <v-select
          v-model="studyResult.grade5Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          v-if="documentStep === 3 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.grade5Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Điểm ưu tiên</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="8">
        <div class="field-label">
          Loại ưu tiên
          <span style="color: red" v-if="documentStep === 3 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="ltvExamResult.priorityType"
          placeholder="VD: Không thuộc diện ưu tiên"
          item-text="title"
          item-value="value"
          :rules="[$rules.required]"
          :items="priorityTypes"
          v-if="documentStep === 3 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ ltvExamResult.priorityType || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Điểm cộng</div>
        <v-text-field
          placeholder="VD: 10"
          :value="getPriorityMark"
          type="number"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          @keyup.enter="submit"
          disabled
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ ltvExamResult.priorityMark || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Tổng</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12">
        <div class="field-label">
          Tổng điểm 2 môn Toán, Văn của 5 năm học khối Tiểu học (tối đa 100
          điểm)
        </div>
        <v-text-field
          placeholder="VD: 100"
          :value="getTotal"
          type="text"
          color="primary"
          v-if="documentStep === 3 || isEditing"
          filled
          disabled
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 3 && !isEditing"
        >
          {{ studyResult.totalMathLiterature || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div v-if="documentStep === 3 || isEditing">
      <div class="section-label py-6">Thành tích đặc biệt</div>
      <v-row class="pb-6">
        <v-col cols="12">
          <div class="field-label">Giải thưởng đã đạt được</div>
          <v-text-field
            placeholder="VD: Cháu đạt giải Nhì Toán Thành phố Năm 2020, giải Nhất Toán Thành phố Năm 2021"
            v-model="studyResult.achievements"
            type="text"
            color="primary"
            v-if="documentStep === 3 || isEditing"
            messages="Vui lòng bỏ qua nếu không có thông tin"
            outlined
          />
        </v-col>
      </v-row>
      <hr class="dashed" />
    </div>
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
    isEditing: Boolean,
  },
  computed: {
    getPriorityMark() {
      switch (this.ltvExamResult.priorityType) {
        case "Có bố mẹ hoặc anh chị đã hoặc đang theo học tại trường Lương Thế Vinh":
          return 20;
        case "Là con, em ruột của giáo viên đang công tác tại trường Lương Thế Vinh":
          return 20;
        case "Thuộc gia đình có công với cách mạng; gia đình thương binh, liệt sĩ":
          return 20;
        case "Là con cán bộ Y tế, Bộ đội, Công an tham gia phòng chống dịch Covid-19":
          return 30;
        default:
          return 0;
      }
    },
    getTotal() {
      if (
        this.studyResult.grade1Literature == "" ||
        this.studyResult.grade1Math == "" ||
        this.studyResult.grade2Literature == "" ||
        this.studyResult.grade2Math == "" ||
        this.studyResult.grade3Literature == "" ||
        this.studyResult.grade3Math == "" ||
        this.studyResult.grade4Literature == "" ||
        this.studyResult.grade4Math == ""
      )
        return "Xin vui lòng điền tất cả các điểm thành phần bên trên";
      let grade5Literature = this.studyResult.grade5Literature
        ? parseFloat(this.studyResult.grade5Literature)
        : 0;
      let grade5Math = this.studyResult.grade5Math
        ? parseFloat(this.studyResult.grade5Math)
        : 0;
      return (
        parseFloat(this.studyResult.grade1Literature) +
        parseFloat(this.studyResult.grade1Math) +
        parseFloat(this.studyResult.grade2Literature) +
        parseFloat(this.studyResult.grade2Math) +
        parseFloat(this.studyResult.grade3Literature) +
        parseFloat(this.studyResult.grade3Math) +
        parseFloat(this.studyResult.grade4Literature) +
        parseFloat(this.studyResult.grade4Math) +
        +grade5Literature +
        grade5Math +
        this.getPriorityMark
      );
    },
  },
  data() {
    return {
      isValid: false,
      ltvExamResult: {
        priorityType: "",
        priorityMark: 0,
      },
      studyResult: {
        grade1Literature: "",
        grade1Math: "",
        grade1English: "",
        grade1Morality: "",
        grade2Literature: "",
        grade2Math: "",
        grade2English: "",
        grade2Morality: "",
        grade3Literature: "",
        grade3Math: "",
        grade3English: "",
        grade3Morality: "",
        grade4Literature: "",
        grade4Math: "",
        grade4English: "",
        grade4Morality: "",
        grade5Literature: "",
        grade5Math: "",
        grade5English: "",
        grade5Morality: "",
        totalMathLiterature: "",
        achievements: "",
      },
      priorityTypes: [
        {
          title:
            "Có bố mẹ hoặc anh chị đã hoặc đang theo học tại trường Lương Thế Vinh",
          value:
            "Có bố mẹ hoặc anh chị đã hoặc đang theo học tại trường Lương Thế Vinh",
        },
        {
          title:
            "Là con, em ruột của giáo viên đang công tác tại trường Lương Thế Vinh",
          value:
            "Là con, em ruột của giáo viên đang công tác tại trường Lương Thế Vinh",
        },
        {
          title:
            "Thuộc gia đình có công với cách mạng; gia đình thương binh, liệt sĩ",
          value:
            "Thuộc gia đình có công với cách mạng; gia đình thương binh, liệt sĩ",
        },
        {
          title:
            "Là con cán bộ Y tế, Bộ đội, Công an tham gia phòng chống dịch Covid-19",
          value:
            "Là con cán bộ Y tế, Bộ đội, Công an tham gia phòng chống dịch Covid-19",
        },
        {
          title: "Không thuộc diện ưu tiên",
          value: "Không thuộc diện ưu tiên",
        },
      ],
      moralities: [
        { title: "Tốt", value: "Tốt" },
        { title: "Khá", value: "Khá" },
        { title: "Trung bình", value: "Trung bình" },
        { title: "Yếu", value: "Yếu" },
        { title: "Kém", value: "Kém" },
      ],
    };
  },
  created() {
    if (this.document.studyRecord) {
      this.studyResult = this.document.studyRecord;
      this.agree = this.document.status === "submitted";
    }
    if (this.document.ltvExamResult)
      this.ltvExamResult = this.document.ltvExamResult;
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
        studyResult: {
          ...this.studyResult,
          totalMathLiterature: !isNaN(this.getTotal) ? this.getTotal : "",
        },
        ltvExamResult: {
          ...this.ltvExamResult,
          priorityMark: this.getPriorityMark,
        },
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
</style>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
