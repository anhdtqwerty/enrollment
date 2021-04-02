<template>
  <v-card width="100%" class="elevation-0">
    <v-divider class="py-2" v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-title class="card-title mb-2"
      >Đăng ký nguyện vọng vào lớp 10
      <br v-if="$vuetify.breakpoint.smAndDown" />THPT năm 2021 -
      2022</v-card-title
    >
    <div class="field-label pt-6" v-if="!isCloseFillInfo && !isAdminPreview">
      <span class="error--text">(*)</span> Phụ huynh lưu ý: Các thông tin này có
      thể được chỉnh sửa nhưng sẽ bị khóa vào ngày
      <span class="error--text">{{ closeFillInfoTime }}</span
      >.
    </div>
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
              Con tôi đã đăng ký số nguyện vọng vào lớp 10
              <span style="color: red" v-if="documentStep === 3 || isEditing"
                >*</span
              >
            </div>
            <v-select
              v-model="expectationNumber"
              placeholder="VD: 1"
              :items="[1, 2, 3]"
              :rules="[$rules.required]"
              v-if="documentStep === 3 || isEditing"
              outlined
            />
          </v-col>
        </v-row>
        <div class="section-label pb-6">Nguyện vọng 1</div>
        <v-row class="my-0">
          <v-col class="py-0">
            <div class="field-label">
              Con tôi đã đăng ký nguyện vọng 1 vào lớp 10 trường THPT
              <span style="color: red" v-if="documentStep === 3 || isEditing"
                >*</span
              >
            </div>
            <v-text-field
              placeholder="VD: Trường THPT..."
              name="login"
              v-model="expectation1.school"
              type="text"
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
              {{ expectation1.school || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">
              Quận (Huyện)
              <span style="color: red" v-if="documentStep === 3 || isEditing"
                >*</span
              >
            </div>
            <v-text-field
              placeholder="VD: Ba Đình"
              name="login"
              v-model="expectation1.district"
              type="text"
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
              {{ expectation1.district || "Chưa có thông tin" }}
            </div>
          </v-col>
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">
              Thành phố
              <span style="color: red" v-if="documentStep === 3 || isEditing"
                >*</span
              >
            </div>
            <v-text-field
              placeholder="VD: Hà Nội"
              name="login"
              v-model="expectation1.city"
              type="text"
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
              {{ expectation1.city || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <div class="section-label pb-6" v-if="expectationNumber >= 2">
          Nguyện vọng 2
        </div>
        <v-row class="my-0" v-if="expectationNumber >= 2">
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
              v-if="documentStep === 3 || isEditing"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
              {{ expectation2.school || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0" v-if="expectationNumber >= 2">
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">Quận (Huyện)</div>
            <v-text-field
              placeholder="VD: Ba Đình"
              name="login"
              v-model="expectation2.district"
              type="text"
              color="primary"
              v-if="documentStep === 3 || isEditing"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
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
              v-if="documentStep === 3 || isEditing"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
              {{ expectation2.city || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <div class="section-label pb-6" v-if="expectationNumber >= 3">
          Nguyện vọng 3
        </div>
        <v-row class="my-0" v-if="expectationNumber >= 3">
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
              v-if="documentStep === 3 || isEditing"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
              {{ expectation3.school || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <v-row class="my-0" v-if="expectationNumber >= 3">
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">Quận (Huyện)</div>
            <v-text-field
              placeholder="VD: Ba Đình"
              name="login"
              v-model="expectation3.district"
              type="text"
              color="primary"
              v-if="documentStep === 3 || isEditing"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
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
              v-if="documentStep === 3 || isEditing"
              @keyup.enter="submit"
              outlined
              validate-on-blur
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
              {{ expectation3.city || "Chưa có thông tin" }}
            </div>
          </v-col>
        </v-row>
        <hr class="dashed" />
        <div class="section-label py-6">Đăng ký nguyện vọng ban tại trường</div>
        <v-row class="my-0">
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">
              Nguyện vọng 1
              <span style="color: red" v-if="documentStep === 3 || isEditing"
                >*</span
              >
            </div>
            <v-select
              v-model="ltvExamResult.groupExpectation1"
              placeholder="VD: Ban A"
              item-text="title"
              item-value="value"
              :items="groups"
              :rules="[$rules.required]"
              v-if="documentStep === 3 || isEditing"
              outlined
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
              {{ ltvExamResult.groupExpectation1 || "Chưa có thông tin" }}
            </div>
          </v-col>
          <v-col class="py-0" cols="12" xs="12" sm="12" md="6">
            <div class="field-label">Nguyện vọng 2</div>
            <v-select
              v-model="ltvExamResult.groupExpectation2"
              placeholder="VD: Ban A1"
              item-text="title"
              item-value="value"
              :rules="groupExpectationRule"
              :items="groups"
              v-if="documentStep === 3 || isEditing"
              outlined
            />
            <div
              class="info-label mt-2 mb-6"
              v-if="documentStep !== 3 && !isEditing"
            >
              {{ ltvExamResult.groupExpectation2 || "Chưa có thông tin" }}
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
        v-if="documentStep === 3 || isEditing"
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
        v-if="(documentStep === 3 || isEditing) && !isCloseFillInfo"
        @click="completeStep"
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
      <v-btn
        :class="{ 'px-6': $vuetify.breakpoint.mdAndUp }"
        class="py-3 mr-6 text-none"
        color="primary"
        v-if="
          documentStep !== 3 &&
          !isEditing &&
          !isCloseFillInfo &&
          !isAdminPreview
        "
        @click="onEdit"
        outlined
        large
      >
        <span>Chỉnh sửa</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="documentStep !== 3 && !isEditing"
        @click="nextStep"
        large
      >
        <span>Tiếp theo</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  components: {},
  props: {
    document: Object,
    documentStep: Number,
    systemTime: Object,
    isAdminPreview: Boolean,
  },
  created() {
    if (this.document.expectation1 && this.document.expectation1.school)
      this.expectation1 = this.document.expectation1;
    if (this.document.expectation2 && this.document.expectation2.school) {
      this.expectation2 = this.document.expectation2;
      this.expectationNumber = 2;
    }
    if (this.document.expectation3 && this.document.expectation3.school) {
      this.expectation3 = this.document.expectation3;
      this.expectationNumber = 3;
    }
    if (this.documentStep > 3) this.isEditing = false;
    if (this.document.ltvExamResult)
      this.ltvExamResult = this.document.ltvExamResult;
  },
  computed: {
    closeFillInfoTime() {
      if (
        this.systemTime.documentSystemTime &&
        this.systemTime.documentSystemTime["close-fill-info"]
      )
        return `${moment(
          this.systemTime.documentSystemTime["close-fill-info"],
          "DD/MM/YYYY HH:mm:ss"
        ).format("DD/MM/YYYY")} lúc ${moment(
          this.systemTime.documentSystemTime["close-fill-info"],
          "DD/MM/YYYY HH:mm:ss"
        ).format("HH:mm")}`;
      return "30/05/2021 lúc 00:00";
    },
    isCloseFillInfo() {
      if (
        this.systemTime.checkDocumentSystemTime &&
        this.systemTime.checkDocumentSystemTime["close-fill-info"]
      )
        return true;
      return false;
    },
  },
  data() {
    return {
      groupExpectationRule: [
        (v) =>
          !v ||
          v !== this.ltvExamResult.groupExpectation1 ||
          "Nguyện vọng 2 không được trùng với nguyện vọng 1",
      ],
      expectationNumber: 1,
      isValid: false,
      isEditing: true,
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
      ltvExamResult: {
        groupExpectation1: "",
        groupExpectation2: "",
      },
      groups: [
        { title: "Ban A - Chuyên sâu Toán, Lý, Hóa", value: "Ban A" },
        { title: "Ban A1 - Chuyên sâu Toán, Lý, Anh", value: "Ban A1" },
        { title: "Ban D - Chuyên sau Toán, Văn, Anh", value: "Ban D" },
      ],
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
      if (this.expectationNumber < 3)
        this.expectation3 = {
          school: "",
          district: "",
          city: "",
        };
      if (this.expectationNumber < 2)
        this.expectation2 = {
          school: "",
          district: "",
          city: "",
        };
      this.$dialog.confirm({
        title: "Chú ý",
        okText: "Xác nhận",
        topContent: `Quý phụ huynh lưu ý:`,
        midContent: `Sau khi ấn 'Xác nhận', hệ thống sẽ tạm lưu thông tin phụ huynh vừa khai. Phụ huynh có thể thay đổi thông tin này trước ngày <span class='error--text'>${this.closeFillInfoTime}</span>.`,
        botContent: `Sau <span class='error--text'>${this.closeFillInfoTime}</span>, hệ thống sẽ tự động xác nhận thông tin đã được khai báo và đồng thời khóa khai báo mục này.`,
        cancelText: "Kiểm tra lại",
        done: async () => {
          this.$loading.active = true;
          this.$emit("completeStep", {
            expectation1: this.expectation1,
            expectation2: this.expectation2,
            expectation3: this.expectation3,
            ltvExamResult: {
              ...this.document.ltvExamResult,
              groupExpectation1: this.ltvExamResult.groupExpectation1,
              groupExpectation2: this.ltvExamResult.groupExpectation2,
            },
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
        ltvExamResult: {
          ...this.document.ltvExamResult,
          ...this.ltvExamResult,
        },
      });
    },
    nextStep() {
      this.$loading.active = true;
      this.$emit("nextStep");
    },
    onEdit() {
      this.$dialog.confirm({
        title: "Chỉnh sửa",
        okText: "Xác nhận",
        topContent: `Phụ huynh lưu ý: Các thông tin này có thể được chỉnh sửa nhưng sẽ bị khóa vào ngày <span class="error--text">${this.closeFillInfoTime}</span>`,
        midContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục",
        botContent: "",
        cancelText: "Hủy",
        done: async () => {
          this.isEditing = true;
        },
      });
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

@media only screen and (max-width: 420px) {
  .card-title {
    font-size: 20px;
  }
}

@media only screen and (max-width: 350px) {
  .card-title {
    font-size: 17px;
  }
}

@media only screen and (max-width: 500px) and (min-width: 400px) {
  .card-title {
    font-size: 21px;
  }
}
</style>
