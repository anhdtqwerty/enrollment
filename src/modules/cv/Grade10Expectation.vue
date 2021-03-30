<template>
  <v-card width="100%" class="elevation-0">
    <v-divider class="py-2" v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-title
      class="card-title mb-2"
      :class="{ 'mobile-card-title': $vuetify.breakpoint.smAndDown }"
      >Đăng ký nguyện vọng vào lớp 10 THPT năm 2021 - 2022</v-card-title
    >
    <v-card-text class="pa-0">
      <v-form
        v-model="isValid"
        ref="expectationForm"
        v-bind="this.$attrs"
        style="width: 100%"
      >
        <div class="section-label py-6">Thông tin đăng ký thi vào lớp 10</div>
        <v-row class="my-0">
          <v-col class="py-0">
            <div class="field-label">
              Con tôi đã đăng ký nguyện vọng 1 vào lớp 10 trường THPT
              <span style="color: red" v-if="documentStep === 3">*</span>
            </div>
            <v-text-field
              placeholder="VD: Trường THPT..."
              name="login"
              v-model="expectation1.school"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              :rules="[$rules.required]"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation1.school || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">
              Quận (Huyện)
              <span style="color: red" v-if="documentStep === 3">*</span>
            </div>
            <v-text-field
              placeholder="VD: Ba Đình"
              name="login"
              v-model="expectation1.district"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              :rules="[$rules.required]"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation1.district || "Chưa có thông tin" }}
            </div>
          </v-col>
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">
              Thành phố
              <span style="color: red" v-if="documentStep === 3">*</span>
            </div>
            <v-text-field
              placeholder="VD: Hà Nội"
              name="login"
              v-model="expectation1.city"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              :rules="[$rules.required]"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation1.city || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col class="py-0">
            <div class="field-label">
              Con tôi đã đăng ký nguyện vọng 2 vào lớp 10 trường THPT
            </div>
            <v-text-field
              placeholder="VD: Trường THPT..."
              name="login"
              v-model="expectation2.school"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation2.school || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">Quận (Huyện)</div>
            <v-text-field
              placeholder="VD: Ba Đình"
              name="login"
              v-model="expectation2.district"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation2.district || "Chưa có thông tin" }}
            </div>
          </v-col>
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">Thành phố</div>
            <v-text-field
              placeholder="VD: Hà Nội"
              name="login"
              v-model="expectation2.city"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation2.city || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col class="py-0">
            <div class="field-label">
              Con tôi đã đăng ký nguyện vọng 3 vào lớp 10 trường THPT
            </div>
            <v-text-field
              placeholder="VD: Trường THPT..."
              name="login"
              v-model="expectation3.school"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation3.school || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">Quận (Huyện)</div>
            <v-text-field
              placeholder="VD: Ba Đình"
              name="login"
              v-model="expectation3.district"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation3.district || "Chưa có thông tin" }}
            </div>
          </v-col>
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">Thành phố</div>
            <v-text-field
              placeholder="VD: Hà Nội"
              name="login"
              v-model="expectation3.city"
              type="text"
              color="primary"
              v-if="documentStep === 3"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div class="info-label mt-2 mb-6" v-if="documentStep !== 3">
              {{ expectation3.city || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-end pt-8 px-0">
      <v-btn
        :class="{ 'px-6': $vuetify.breakpoint.mdAndUp }"
        class="py-3 mr-6 text-none"
        color="primary"
        v-if="documentStep === 3"
        @click="saveDraft"
        outlined
        large
      >
        <v-icon> mdi-content-save </v-icon>
        <span class="ml-2">Lưu tạm thời</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="documentStep === 3"
        @click="completeStep"
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="documentStep !== 3"
        @click="nextStep"
        large
      >
        <span>Tiếp tục</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    document: Object,
    documentStep: Number,
  },
  created() {
    if (this.document.expectation1)
      this.expectation1 = this.document.expectation1;
    if (this.document.expectation2)
      this.expectation2 = this.document.expectation2;
    if (this.document.expectation3)
      this.expectation3 = this.document.expectation3;
  },
  data() {
    return {
      isValid: false,
      expectation1: {
        school: "",
        district: "",
        city: "",
      },
      expectation2: {
        school: "",
        district: "",
        city: "",
      },
      expectation3: {
        school: "",
        district: "",
        city: "",
      },
    };
  },
  methods: {
    reset() {
      this.$refs.expectationForm.reset();
    },
    completeStep() {
      if (!this.$refs.expectationForm.validate()) {
        this.$alert.error("Xin vui lòng điền hết các thông tin bắt buộc");
        return;
      }
      this.$dialog.confirm({
        title: "Chú ý",
        okText: "Xác nhận",
        topContent: `Quý phụ huynh lưu ý:`,
        midContent:
          "Sau khí ấn 'Xác nhận', hệ thống tạm lưu thông tin phụ huynh vừa khai. Phụ huynh có thể thay đôiủ thông tin này trước ngày <span class='error--text'>30/05/2021</span>.",
        botContent:
          "<span class='error--text'>Sau 00:00</span> ngày <span class='error--text'>31/05/2021</span>, hệ thống sẽ tự động xác nhận thông tin đã được khai báo và đồng thời khóa khai báo mục này.",
        cancelText: "Kiểm tra lại",
        done: async () => {
          this.$loading.active = true;
          this.$emit("completeStep", {
            expectation1: this.expectation1,
            expectation2: this.expectation2,
            expectation3: this.expectation3,
          });
        },
      });
    },
    getQuery() {},
    saveDraft() {
      this.$loading.active = true;
      this.$emit("saveDraft", {
        expectation1: this.expectation1,
        expectation2: this.expectation2,
        expectation3: this.expectation3,
      });
    },
    nextStep() {
      this.$loading.active = true;
      this.$emit("nextStep");
    },
  },
};
</script>

<style scoped>
.card-title {
  padding: 0 !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
}
.mobile-card-title {
  font-size: 22px !important;
}
.card-subtitle {
  padding: 0 !important;
  margin-top: 0 !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #3e3e3c;
}
hr.dashed {
  width: 100%;
  border: 1px dashed #e6e4eb;
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
</style>
