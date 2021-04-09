<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">
      Ảnh 3x4 của con<span
        style="color: red"
        v-if="documentStep === 2 || isEditing"
        >*</span
      >
    </div>
    <v-row class="d-flex flex-column pb-6" no-gutters>
      <picture-input
        ref="pictureInput"
        width="120"
        height="160"
        margin="16"
        accept="image/jpeg, image/png"
        size="10"
        button-class="btn"
        :prefill="avatar"
        :hideChangeButton="true"
        :zIndex="0"
        :custom-strings="{
          upload: '<b>Thiết bị không hỗ trợ tải lên file ảnh</b>',
          drag: 'Kéo vào để upload avatar',
        }"
        v-if="documentStep === 2 || isEditing"
        @change="onChange"
      ></picture-input>
      <div>
        <v-img
          width="120"
          height="160"
          :src="avatar"
          v-if="documentStep !== 2 && !isEditing"
        />
      </div>
      <div class="mt-4 text-center" v-if="documentStep === 2 || isEditing">
        Ảnh theo chuẩn ảnh Căn cước công dân
      </div>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">Thông tin con</div>
    <v-row class="my-0">
      <v-col class="py-0">
        <div class="field-label">
          Họ tên học sinh
          <span style="color: red" v-if="documentStep === 2 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: Nguyễn Văn B"
          name="login"
          v-model="studentName"
          type="text"
          color="primary"
          @keyup.enter="submit"
          v-if="documentStep === 2 || isEditing"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 2 && !isEditing"
        >
          {{ document.name || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Ngày tháng năm sinh
          <span style="color: red" v-if="documentStep === 2 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          v-mask="'##/##/####'"
          placeholder="VD: 01/01/2021"
          name="login"
          v-model="studentDob"
          type="text"
          color="primary"
          v-if="documentStep === 2 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.dob]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 2 && !isEditing"
        >
          {{ getStudentDob }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Giới tính
          <span style="color: red" v-if="documentStep === 2 || isEditing"
            >*</span
          >
        </div>
        <v-radio-group
          v-model="studentGender"
          :class="{ 'mt-0': $vuetify.breakpoint.smAndDown }"
          :rules="[$rules.required]"
          v-if="documentStep === 2 || isEditing"
          row
        >
          <v-radio label="Nam" value="male"></v-radio>
          <v-radio label="Nữ" value="female"></v-radio>
        </v-radio-group>
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 2 && !isEditing"
        >
          {{ getStudentGender }}
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Mã số học sinh (Sở GD&DT Hà Nội cấp)
          <span style="color: red" v-if="documentStep === 2 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: 1231294124124"
          name="login"
          v-model="studentId"
          type="text"
          color="primary"
          v-if="documentStep === 2 || isEditing"
          @keyup.enter="submit"
          :rules="studentIdRules"
          :disabled="otherProvinceStudent"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 2 && !isEditing"
        >
          {{ document.studentId || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0 d-flex align-center" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          <v-checkbox
            v-if="documentStep === 2 || isEditing"
            v-model="otherProvinceStudent"
            label="Học sinh tỉnh khác, không có mã học sinh"
          ></v-checkbox>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          {{
            document.type === "Khối 6"
              ? "Con tôi đã học hết lớp 5 tại trường"
              : "Con tôi đã học hết lớp 9 tại trường"
          }}
          <span style="color: red" v-if="documentStep === 2 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          :placeholder="
            document.type === 'Khối 6'
              ? 'VD: Trường Tiểu học ...'
              : 'VD: Trường THCS ...'
          "
          name="login"
          v-model="studentSchool"
          type="text"
          color="primary"
          v-if="documentStep === 2 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 2 && !isEditing"
        >
          {{ document.school || "Chưa có thông tin" }}
        </div>
      </v-col>
      <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
        <div class="field-label">
          Thành phố
          <span style="color: red" v-if="documentStep === 2 || isEditing"
            >*</span
          >
        </div>
        <v-text-field
          placeholder="VD: Hà Nội"
          name="login"
          v-model="studentCity"
          type="text"
          color="primary"
          v-if="documentStep === 2 || isEditing"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
        <div
          class="info-label mt-2 mb-6"
          v-if="documentStep !== 2 && !isEditing"
        >
          {{ document.city || "Chưa có thông tin" }}
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import PictureInput from "vue-picture-input";
import imageCompression from "browser-image-compression";
import moment from "moment";

export default {
  props: {
    document: { type: Object, default: () => {} },
    documentStep: Number,
    isEditing: Boolean,
  },
  computed: {
    avatar() {
      if (this.document.avatar && this.document.avatar.length > 0)
        return `${this.$baseUrl.slice(0, -1)}${this.document.avatar[0].url}`;
      else return "/img/avatar.png";
    },
    getStudentDob() {
      return moment(this.document.dob).format("DD/MM/YYYY");
    },
    getStudentGender() {
      return this.document.gender === "male" ? "Nam" : "Nữ";
    },
    studentIdRules() {
      if (!this.otherProvinceStudent) return [this.$rules.required];
      else return [];
    },
  },
  created() {
    if (this.document) {
      this.studentName = this.document.name;
      this.studentGender = this.document.gender;
      this.studentDob = moment(this.document.dob).format("DD/MM/YYYY");
      this.studentSchool = this.document.school;
      this.studentCity = this.document.city;
      this.studentId = this.document.studentId;
      this.otherProvinceStudent = this.document.studentId === "";
    }
  },
  watch: {
    otherProvinceStudent(newVal) {
      if (newVal) this.studentId = "";
    },
  },
  methods: {
    async onChange(image) {
      if (image) {
        // this.uploadAvatar(this.$refs.pictureInput.file);
        this.image = this.$refs.pictureInput.file;
      }
    },
    async compress(image) {
      const options = {
        maxSizeMB: 0.02,
        maxWidthOrHeight: 200,
        useWebWorker: true,
      };
      return imageCompression(image, options);
    },
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
        studentAvatar: this.image,
        studentName: this.studentName,
        studentDob: this.studentDob,
        studentGender: this.studentGender,
        studentId: this.studentId,
        studentSchool: this.studentSchool,
        studentCity: this.studentCity,
      };
    },
  },
  components: {
    PictureInput,
  },
  data() {
    return {
      image: "",
      isValid: false,
      isImageValid: true,
      studentName: "",
      studentDob: "",
      studentGender: "",
      studentId: "",
      studentSchool: "",
      studentCity: "",
      otherProvinceStudent: false,
    };
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
hr.dashed {
  width: 100%;
  border: 1px dashed #e6e4eb;
}
.info-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #3e3e3c;
}
</style>
