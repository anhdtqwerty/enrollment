<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">Thông tin bản thân</div>
    <v-row class="my-0">
      <v-col class="py-0">
        <div class="field-label">
          Họ tên tôi là
          <span style="color: red" v-if="documentStep === 2">*</span>
        </div>
        <v-text-field
          placeholder="VD: Nguyễn Văn A"
          name="login"
          v-model="name"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.parentName || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Số điện thoại
          <span style="color: red" v-if="documentStep === 2">*</span>
        </div>
        <v-text-field
          placeholder="VD: 0973728668"
          name="login"
          v-model="phone"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.phone]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.parentPhone || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Số Chứng minh nhân dân / Thẻ CCCD
          <span style="color: red" v-if="documentStep === 2">*</span>
        </div>
        <v-text-field
          placeholder="VD: 001111001980"
          name="login"
          v-model="cccd"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.cccd]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.parentResidentID || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Nghề nghiệp
          <span style="color: red" v-if="documentStep === 2">*</span>
        </div>
        <v-text-field
          placeholder="VD: Giáo viên"
          name="login"
          v-model="job"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.parentJob || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Nơi ở hiện tại
          <span style="color: red" v-if="documentStep === 2">*</span>
        </div>
        <v-text-field
          placeholder="VD: 23 Quang Trung, Hoàn Kiếm, Hà Nội"
          name="login"
          v-model="address"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.parentAddress || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Thông tin vợ (chồng)</div>
    <v-row class="my-0">
      <v-col class="py-0" cols="12">
        <div class="field-label">
          Họ tên vợ (chồng)
        </div>
        <v-text-field
          placeholder="VD: Nguyễn Văn A"
          name="login"
          v-model="otherName"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.otherParentName || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Số điện thoại
        </div>
        <v-text-field
          placeholder="VD: 0973728668"
          name="login"
          v-model="otherPhone"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          :rules="[$rules.phone]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.otherParentPhone || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Số Chứng minh nhân dân / Thẻ CCCD
        </div>
        <v-text-field
          placeholder="VD: 001111001980"
          name="login"
          v-model="otherCCCD"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          :rules="[$rules.cccd]"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.otherParentResidentID || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Nghề nghiệp
        </div>
        <v-text-field
          placeholder="VD: Giáo viên"
          name="login"
          v-model="otherJob"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.otherParentJob || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Nơi ở hiện tại
        </div>
        <v-text-field
          placeholder="VD: 23 Quang Trung, Hoàn Kiếm, Hà Nội"
          name="login"
          v-model="otherAddress"
          type="text"
          color="primary"
          v-if="documentStep === 2"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
        <div class="info-label mt-2 mb-6" v-if="documentStep !== 2">
          {{ document.otherParentAddress || "Chưa có thông tin" }}
        </div>
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
      name: "",
      phone: "",
      cccd: "",
      job: "",
      address: "",
      otherName: "",
      otherPhone: "",
      otherCCCD: "",
      otherJob: "",
      otherAddress: "",
    };
  },
  created() {
    if (this.document) {
      this.name = this.document.parentName;
      this.phone = this.document.parentPhone;
      this.job = this.document.parentJob;
      this.cccd = this.document.parentResidentID;
      this.address = this.document.parentAddress;
      this.otherName = this.document.otherParentName;
      this.otherPhone = this.document.otherParentPhone;
      this.otherJob = this.document.otherParentJob;
      this.otherCCCD = this.document.otherParentResidentID;
      this.otherAddress = this.document.otherParentAddress;
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
        name: this.name,
        phone: this.phone,
        cccd: this.cccd,
        job: this.job,
        address: this.address,
        otherName: this.otherName,
        otherPhone: this.otherPhone,
        otherCCCD: this.otherCCCD,
        otherJob: this.otherJob,
        otherAddress: this.otherAddress,
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
