<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">
      Ảnh 3x4 của con<span style="color: red">*</span>
    </div>
    <v-row class="d-flex flex-column pb-6" no-gutters>
      <picture-input
        ref="pictureInput"
        width="600"
        height="600"
        radius="50"
        margin="16"
        accept="image/jpeg, image/png"
        size="10"
        button-class="btn"
        :prefill="@/assets/avatar.svg"
        :custom-strings="{
          upload: '<h1>Bummer!</h1>',
          drag: 'Kéo vào để upload avatar',
        }"
        @change="onChange"
      ></picture-input>
      <div class="mt-2">Ảnh theo chuẩn ảnh Căn cước công dân</div>
    </v-row>
    <hr class="dashed" />
    <div class="section-label py-6">
      Thông tin con
    </div>
    <v-row no-gutters>
      <v-col>
        <div class="field-label">
          Họ tên học sinh
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: Nguyễn Văn B"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="mr-4">
        <div class="field-label">
          Ngày tháng năm sinh
          <span style="color: red">*</span>
        </div>
        <v-text-field
          v-mask="'##-##-####'"
          placeholder="VD: 01/01/2021"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col class="ml-4">
        <div class="field-label">
          Giới tính
          <span style="color: red">*</span>
        </div>
        <v-radio-group v-model="gender" row>
          <v-radio label="Nam" value="male"></v-radio>
          <v-radio label="Nữ" value="female"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <div class="field-label">
          Mã số học sinh (Sở GD&DT Hà Nội cấp)
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: 1231294124124"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="mr-4">
        <div class="field-label">
          Con tôi đã học hết lớp 5 tại trường
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: Trường Tiểu học K..."
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.required]"
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col class="ml-4">
        <div class="field-label">
          Thành phố
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: Hà Nội"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.otp]"
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import PictureInput from "vue-picture-input";
import imageCompression from "browser-image-compression";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("upload", ["url"]),
    avatar() {
      return _.get(this.staff, "avatar.url", "/default-avatar.png");
    },
  },
  methods: {
    ...mapActions("upload", ["upload", "destroy"]),
    async onChange(image) {
      if (image) {
        this.save(this.$refs.pictureInput.file);
      }
    },
    async save(image) {
      if (this.cv.avatar) this.destroy(this.cv.avatar.id);
      let formData = new FormData();
      formData.append("files", image);
      formData.append("refId", this.cv.id);
      formData.append("field", "avatar");
      this.upload(formData);
    },
    cancel() {
      this.image = this.cv.avatar;
      this.$emit("cancel");
    },
    async compress(image) {
      const options = {
        maxSizeMB: 0.02,
        maxWidthOrHeight: 200,
        useWebWorker: true,
      };
      return imageCompression(image, options);
    },
  },
  components: {
    PictureInput,
  },
  data() {
    return {
      isValid: false,
      name: "",
      phone: "",
      isImageValid: true,
      image: "",
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
</style>
