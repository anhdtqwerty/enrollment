<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">
      Gia đình chúng tôi có nguyện vọng cho con theo học lớp:
    </div>
    <v-row class="pb-6">
      <v-col cols="4">
        <div class="field-label">
          Nguyện vọng 1
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
      </v-col>
    </v-row>
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
      expectation1: "",
      expectation2: "",
      expectation3: "",
      expectations: [
        {
          title: "Chất lượng cao",
          "select-title": "Lớp Chất lượng cao (CLC)",
          sign: "A, V",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn, Anh 3 tiết/môn/tuần",
          nativeLessons: "2 tiết",
        },
        {
          title: "Chọn Chất lượng cao",
          "select-title": "Lớp chọn Chất lượng cao (CLC)",
          sign: "A0, V0",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn, Anh 4 tiết/môn/tuần",
          nativeLessons: "2 tiết",
        },
        {
          title: "",
          "select-title": "Lớp Chất lượng cao (CLC)",
          sign: "A, V",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn, Anh 3 tiết/môn/tuần",
          nativeLessons: "2 tiết",
        },
        {
          title: "Chất lượng cao",
          "select-title": "Lớp Chất lượng cao (CLC)",
          sign: "A, V",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn, Anh 3 tiết/môn/tuần",
          nativeLessons: "2 tiết",
        },
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
