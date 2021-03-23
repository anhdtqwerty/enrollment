<template>
  <v-form v-model="isValid" ref="form" v-bind="this.$attrs" style="width: 100%">
    <div class="section-label py-6">Thông tin bản thân</div>
    <v-row no-gutters>
      <v-col>
        <div class="field-label">
          Họ tên tôi là
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: Nguyễn Văn A"
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
          Số điện thoại
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: 0973728668"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.phone]"
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col class="ml-4">
        <div class="field-label">
          Số Chứng minh nhân dân / Thẻ CCCD
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: 001111001980"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.required, $rules.cccd]"
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="mr-4">
        <div class="field-label">
          Nghề nghiệp
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: Giáo viên"
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
          Nơi ở hiện tại
          <span style="color: red">*</span>
        </div>
        <v-text-field
          placeholder="VD: 23 Quang Trung, Hoàn Kiếm, Hà Nội"
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
    <hr class="dashed" />
    <div class="section-label py-6">Thông tin vợ (chồng)</div>
    <v-row no-gutters>
      <v-col>
        <div class="field-label">
          Họ tên vợ (chồng)
        </div>
        <v-text-field
          placeholder="VD: Nguyễn Văn A"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="mr-4">
        <div class="field-label">
          Số điện thoại
        </div>
        <v-text-field
          placeholder="VD: 0973728668"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.phone]"
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col class="ml-4">
        <div class="field-label">
          Số Chứng minh nhân dân / Thẻ CCCD
        </div>
        <v-text-field
          placeholder="VD: 001111001980"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          :rules="[$rules.cccd]"
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="mr-4">
        <div class="field-label">
            Nghề nghiệp
        </div>
        <v-text-field
          placeholder="VD: Giáo viên"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col class="ml-4">
        <div class="field-label">
          Nơi ở hiện tại
        </div>
        <v-text-field
          placeholder="VD: 23 Quang Trung, Hoàn Kiếm, Hà Nội"
          name="login"
          v-model="otp"
          type="text"
          color="primary"
          @keyup.enter="submit"
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      name: "",
      phone: "",
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
