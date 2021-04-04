<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">Lớp 6</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade6Math"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade6Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade6Literature"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade6Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade6English"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade6English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="studyResult.grade6Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          v-if="documentStep === 4 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade6Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 7</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade7Math"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade7Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade7Literature"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade7Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade7English"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade7English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="studyResult.grade7Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          v-if="documentStep === 4 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade7Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 8</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Toán
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade8Math"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade8Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Văn
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade8Literature"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade8Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade8English"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade8English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Lý</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade8Physics"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade8Physics || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Hóa</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade8Chemistry"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade8Chemistry || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">
          Hạnh kiểm cả năm
          <span style="color: red" v-if="documentStep === 4 || isEditing"
            >*</span
          >
        </div>
        <v-select
          v-model="studyResult.grade8Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          :rules="[$rules.required]"
          v-if="documentStep === 4 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade8Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Lớp 9</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Toán</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade9Math"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade9Math || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Văn</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade9Literature"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade9Literature || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Anh</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade9English"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade9English || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Lý</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade9Physics"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade9Physics || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Hóa</div>
        <v-text-field
          placeholder="VD: 10"
          v-model="studyResult.grade9Chemistry"
          type="number"
          color="primary"
          v-if="documentStep === 4 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.mark]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade9Chemistry || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="4">
        <div class="field-label">Hạnh kiểm cả năm</div>
        <v-select
          v-model="studyResult.grade9Morality"
          placeholder="VD: Tốt"
          item-text="title"
          item-value="value"
          :items="moralities"
          v-if="documentStep === 4 || isEditing"
          outlined
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 4 && !isEditing"
        >
          {{ studyResult.grade9Morality || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <div v-if="documentStep === 4 || isEditing">
      <hr class="dashed" />
      <div class="section-label py-6">Thành tích đặc biệt</div>
      <v-row class="pb-6 my-0">
        <v-col cols="12">
          <div class="field-label">Thành tích đặc biệt (xét học bổng)</div>
          <v-text-field
            placeholder="VD: Con đạt giải Nhì Toán Thành phố Năm 2020, giải Nhất Toán Thành phố Năm 2021"
            v-model="studyResult.achievements"
            type="text"
            color="primary"
            v-if="documentStep === 4 || isEditing"
            messages="Vui lòng bỏ qua nếu không có thông tin"
            outlined
          />
          <div
            class="info-label mt-2 mb-6"
            v-if="documentStep !== 4 && !isEditing"
          >
            {{ studyResult.achievements || "Chưa có thông tin" }}
          </div>
        </v-col>
      </v-row>
      <v-row class="pb-6 d-flex flex-column my-0" no-gutters>
        <div class="field-label mb-2"><b>Học bổng năm 2021 - 2022:</b></div>
        <table class="scholarship-table">
          <tr style="background: #f8f8f8" class="table-th">
            <td>STT</td>
            <td>Mức học bổng</td>
            <td>Số lượng</td>
            <td>Tiêu chí</td>
          </tr>
          <tr v-for="scholarship in scholarships" :key="scholarship.index">
            <td class="text-center table-td">{{ scholarship.index }}</td>
            <td class="table-td">{{ scholarship.discount }}</td>
            <td class="table-td">{{ scholarship.amount }}</td>
            <td class="table-td" v-html="scholarship.criterias"></td>
          </tr>
        </table>
      </v-row>
      <hr class="dashed" />
      <div class="section-label py-6">Diện tuyển thẳng</div>
      <div class="d-flex">
        <v-checkbox
          class="align-self-start mt-0 pt-0"
          v-model="isRecuitingStraight"
        ></v-checkbox>
        <div class="text-justify">
          Con của tôi đạt đủ 1 trong 2 tiêu chí và nằm trong diện tuyển thẳng
          của nhà trường.
        </div>
      </div>
      <v-row no-gutters>
        <v-radio-group v-model="studyResult.recuitingStraightType">
          <v-radio
            v-for="recuitingStraightType in recuitingStraightTypes"
            :disabled="!isRecuitingStraight"
            :key="recuitingStraightType.title"
            :label="recuitingStraightType.title"
            :value="recuitingStraightType.value"
          ></v-radio>
        </v-radio-group>
      </v-row>
      <div class="field-label mb-2">
        <span class="error--text">(*)</span> Phụ huynh vui lòng đến cơ sở của
        Nhà trường để xác nhận với ban tuyển sinh về diện tuyển thẳng của con
      </div>
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
  watch: {
    isRecuitingStraight(newValue) {
      if (!newValue) {
        this.studyResult.recuitingStraightType = "";
      }
    },
  },
  data() {
    return {
      isValid: false,
      isRecuitingStraight: false,
      studyResult: {
        grade6Literature: "",
        grade6Math: "",
        grade6English: "",
        grade6Physics: "",
        grade6Chemistry: "",
        grade6Morality: "",
        grade7Literature: "",
        grade7Math: "",
        grade7English: "",
        grade7Physics: "",
        grade7Chemistry: "",
        grade7Morality: "",
        grade8Literature: "",
        grade8Math: "",
        grade8English: "",
        grade8Physics: "",
        grade8Chemistry: "",
        grade8Morality: "",
        grade9Literature: "",
        grade9Math: "",
        grade9English: "",
        grade9Physics: "",
        grade9Chemistry: "",
        grade9Morality: "",
        achievements: "",
        recuitingStraightType: "",
      },
      recuitingStraightTypes: [
        {
          title:
            "Học sinh đạt chứng chỉ IELTS từ 6.0 trở lên; đạt 4 năm học sinh giỏi THCS.",
          value:
            "Học sinh đạt chứng chỉ IELTS từ 6.0 trở lên; đạt 4 năm học sinh giỏi THCS.",
        },
        {
          title:
            "Học sinh đạt giải Nhất, Nhì, Ba trong kỳ thi học sinh giỏi của TP Hà Nội các môn Toán, Lý, Hóa, Văn, Anh.",
          value:
            "Học sinh đạt giải Nhất, Nhì, Ba trong kỳ thi học sinh giỏi của TP Hà Nội các môn Toán, Lý, Hóa, Văn, Anh.",
        },
      ],
      moralities: [
        { title: "Tốt", value: "Tốt" },
        { title: "Đạt", value: "Đạt" },
        { title: "Cần cố gắng", value: "Cần cố gắng" },
      ],
      scholarships: [
        {
          index: 1,
          discount: "100% Học phí cơ bản năm đầu",
          amount: "Không giới hạn",
          criterias:
            "Đạt giải <b>Nhất</b> kỳ thi HSG thành phố trở lên các môn Toán, Lý, Hóa, Văn, Anh",
        },
        {
          index: 2,
          discount: "70% Học phí cơ bản năm đầu",
          amount: "Không giới hạn",
          criterias:
            "Đạt giải <b>Nhì</b> hoặc <b>Ba</b> kỳ thi HSG thành phố trở lên các môn Toán, Lý, Hóa, Văn, Anh",
        },
        {
          index: 3,
          discount: "50% Học phí cơ bản năm đầu",
          amount: "Không giới hạn",
          criterias:
            "Trúng tuyển vào các trường Chuyên khoa Toán, Lý, Hóa, Văn, Anh hoặc Tin",
        },
        {
          index: 4,
          discount: "50% Học phí cơ bản năm đầu",
          amount: "6",
          criterias:
            "Thủ khoa các ban A, A1, D trong kỳ sát hạch phân loại lớp",
        },
      ],
    };
  },
  created() {
    if (this.document.studyRecord) {
      this.studyResult = this.document.studyRecord;
      this.isRecuitingStraight =
        this.document.studyRecord.recuitingStraightType != "";
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
.scholarship-table tr {
  border: 1px solid #e6e4eb;
}
.scholarship-table td {
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
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #3e3e3c;
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
</style>
