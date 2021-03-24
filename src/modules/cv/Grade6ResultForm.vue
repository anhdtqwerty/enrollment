<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">Lớp 1</div>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade1Math"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          v-mask="'#.##'"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade1Literature"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Anh (nếu có)
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade1English"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-select
          v-model="studyResult.grade1Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentPhone || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 2</div>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade2Math"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="name"
          type="studyResult.grade2Literature"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Anh (nếu có)
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade2English"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-select
          v-model="studyResult.grade2Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentPhone || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 3</div>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade3Math"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade3Literature"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Anh (nếu có)
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade3English"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-select
          v-model="studyResult.grade3Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentPhone || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 4</div>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade4Math"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade4Literature"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Anh (nếu có)
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade4English"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-select
          v-model="studyResult.grade4Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentPhone || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 5</div>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade5Math"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade5Literature"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">
          Anh (nếu có)
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade5English"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-show="documentStep === 3">*</span>
        </div>
        <v-select
          v-model="studyResult.grade5Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-show="documentStep !== 3">
          {{ document.parentPhone || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Tổng</div>
    <v-row>
      <v-col cols="12">
        <div class="field-label">
          Tổng điểm 2 môn Toán, Văn của 5 năm học khối Tiểu học (tối đa 100
          điểm)
        </div>
        <v-text-field
          placeholder="VD: 100"
          v-model="studyResult.totalMathLiterature"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          filled
          disabled
          outlined
        />
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Thành tích đặc biệt</div>
    <v-row class="pb-6">
      <v-col cols="12">
        <div class="field-label">
          Giải thưởng đã đạt được
        </div>
        <v-text-field
          placeholder="VD: 100"
          v-model="studyResult.totalMathLiterature"
          type="text"
          color="primary"
          v-show="documentStep === 3"
          messages="Vui lòng bỏ qua nếu không có thông tin"
          outlined
        />
      </v-col>
    </v-row>
    <hr class="dashed" />
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
  },
  data() {
    return {
      isValid: false,
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
      },
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
      this.studyResult = { ...this.studyResult, ...this.studyRecord };
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
        studyResult: this.studyResult,
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
