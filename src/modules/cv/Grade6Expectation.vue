<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">
      Gia đình chúng tôi có nguyện vọng cho con theo học lớp:
    </div>
    <v-row class="pb-6">
      <v-col cols="4">
        <div class="field-label">
          Nguyện vọng 1
          <span style="color: red" v-if="documentStep === 3">*</span>
        </div>
        <v-select
          v-model="expectation1"
          placeholder="VD: Năng khiếu Anh"
          item-text="title"
          item-value="select-title"
          :items="expectations"
          :rules="[$rules.required]"
          v-if="documentStep === 3"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
          {{ expectation1 || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">Nguyện vọng 2</div>
        <v-select
          v-model="expectation2"
          placeholder="VD: Năng khiếu Anh"
          item-text="title"
          item-value="select-title"
          :items="expectations"
          v-if="documentStep === 3"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
          {{ expectation2 || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col cols="4">
        <div class="field-label">Nguyện vọng 3</div>
        <v-select
          v-model="expectation3"
          placeholder="VD: Năng khiếu Anh"
          item-text="title"
          item-value="select-title"
          :items="expectations"
          v-if="documentStep === 3"
          outlined
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
          {{ expectation3 || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column" no-gutters>
      <div class="field-label" v-if="documentStep === 3">
        <b>Mô hình lớp học</b>
      </div>
      <table class="expectation-table" width="100%" v-if="documentStep === 3">
        <tr>
          <td></td>
          <td
            v-for="classType in expectations"
            :key="classType.title"
            :class="{
              'selected-td':
                classType['select-title'] === expectation1 ||
                classType['select-title'] === expectation2 ||
                classType['select-title'] === expectation3,
            }"
            class="table-th"
          >
            {{ classType["select-title"] }}
          </td>
        </tr>
        <tr>
          <td class="table-th text-center">Tên kí hiệu</td>
          <td
            v-for="classType in expectations"
            :key="classType.title"
            :class="{
              'selected-td':
                classType['select-title'] === expectation1 ||
                classType['select-title'] === expectation2 ||
                classType['select-title'] === expectation3,
            }"
            class="table-td"
          >
            {{ classType.sign }}
          </td>
        </tr>
        <tr>
          <td class="table-th text-center">Chương trình</td>
          <td
            v-for="classType in expectations"
            :key="classType.title"
            :class="{
              'selected-td':
                classType['select-title'] === expectation1 ||
                classType['select-title'] === expectation2 ||
                classType['select-title'] === expectation3,
            }"
            class="table-td"
            style="white-space: pre-line; vertical-align: top"
          >
            {{ classType.program }}
          </td>
        </tr>
        <tr>
          <td class="table-th text-center">Tiếng Anh giáo viên nước ngoài</td>
          <td
            v-for="classType in expectations"
            :key="classType.title"
            :class="{
              'selected-td':
                classType['select-title'] === expectation1 ||
                classType['select-title'] === expectation2 ||
                classType['select-title'] === expectation3,
            }"
            class="table-td"
          >
            {{ classType.nativeLessons }}
          </td>
        </tr>
      </table>

      <div class="field-label py-6" v-if="documentStep === 3">
        <span style="color: red">(*)</span> Lưu ý: Học sinh không đăng ký nguyện
        vọng sẽ được nhà trường xếp lớp ngẫu nhiên.
      </div>
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
          sign: "A,V",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn, Anh 3 tiết/môn/tuần",
          nativeLessons: "2 tiết",
        },
        {
          title: "Chọn Chất lượng cao",
          "select-title": "Lớp chọn Chất lượng cao (cCLC)",
          sign: "A0,V0",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn, Anh 4 tiết/môn/tuần",
          nativeLessons: "2 tiết",
        },
        {
          title: "Năng khiếu Anh",
          "select-title": "Lớp Năng khiếu Anh (NKA)",
          sign: "CA,N",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn 3 tiết/môn/tuần\n-Tăng Anh 5 tiết/tuần",
          nativeLessons: "2 tiết",
        },
        {
          title: "Năng khiếu Toán",
          "select-title": "Lớp Năng khiếu Toán (NKT)",
          sign: "CT,T",
          program:
            "- Chuẩn chương trình Bộ GD&DT \n-Tăng các môn Toán, Văn 3 tiết/môn/tuần\n-Tăng Anh 5 tiết/tuần",
          nativeLessons: "2 tiết",
        },
      ],
    };
  },
  created() {
    if (this.document) {
      this.expectation1 = this.document.expectation1;
      this.expectation2 = this.document.expectation2;
      this.expectation3 = this.document.expectation3;
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
        expectation1: this.expectation1,
        expectation2: this.expectation2,
        expectation3: this.expectation3,
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
.expectation-table tr {
  border: 1px solid #e6e4eb;
}
.expectation-table td {
  width: 20%;
  padding: 12px;
}
.table-th {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #9c9c9c;
}
.table-td {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #3e3e3c;
}
.selected-td {
  background: #f8f8f8;
}
</style>
