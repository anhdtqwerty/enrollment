<template>
  <v-card width="100%" class="elevation-0">
    <v-divider class="py-2" v-if="$vuetify.breakpoint.smAndDown"></v-divider>
    <v-card-title class="card-title mb-2">1. Thông tin phụ huynh</v-card-title>
    <v-card-subtitle class="card-subtitle">
      Vui lòng điền đầy đủ thông tin bằng tiếng Việt có dấu, viết hoa đầy đủ.
    </v-card-subtitle>
    <v-card-text class="d-flex pa-0">
      <ParentForm
        ref="parentForm"
        :documentStep="documentStep"
        :document="document"
      />
    </v-card-text>
    <hr class="dashed" />
    <v-card-title class="card-title mb-2 mt-6"
      >2. Thông tin học sinh</v-card-title
    >
    <v-card-subtitle class="card-subtitle">
      Vui lòng điền đầy đủ thông tin bằng tiếng Việt có dấu, viết hoa đầy đủ.
    </v-card-subtitle>
    <v-card-text class="d-flex pa-0">
      <StudentForm
        ref="studentForm"
        :documentStep="documentStep"
        :document="document"
      />
    </v-card-text>
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-end pt-8 px-0">
      <v-btn
        :class="{ 'px-6': $vuetify.breakpoint.mdAndUp }"
        class="py-3 mr-6 text-none"
        color="primary"
        v-if="documentStep === 2"
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
        v-if="documentStep === 2"
        @click="completeStep"
        large
      >
        <span>Tiếp tục</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="documentStep !== 2"
        @click="nextStep"
        large
      >
        <span>Tiếp theo</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ParentForm from "@/modules/cv/ParentForm.vue";
import StudentForm from "@/modules/cv/StudentForm.vue";
import moment from "moment";

export default {
  components: {
    ParentForm,
    StudentForm,
  },
  props: {
    document: Object,
    documentStep: Number,
  },
  methods: {
    reset() {
      this.$refs.parentForm.reset();
      this.$refs.studentForm.reset();
    },
    getQuery(parentForm, studentForm) {
      let query = {
        parentName: parentForm.name,
        parentResidentID: parentForm.cccd,
        parentPhone: parentForm.phone,
        parentJob: parentForm.job,
        parentAddress: parentForm.address,
        otherParentName: parentForm.otherName,
        otherParentPhone: parentForm.otherPhone,
        otherParentJob: parentForm.otherJob,
        otherParentAddress: parentForm.otherAddress,
        otherParentResidentID: parentForm.otherCCCD,
        name: studentForm.studentName,
        gender: studentForm.studentGender || "",
        dob: studentForm.studentDob
          ? moment.utc(studentForm.studentDob, "DD/MM/YYYY").toISOString()
          : new Date().toISOString(),
        studentId: studentForm.studentId,
        school: studentForm.studentSchool,
        city: studentForm.studentCity,
      };
      if (studentForm.studentAvatar !== "") {
        query.avatar = studentForm.studentAvatar;
      }
      return query;
    },
    completeStep() {
      const parentForm = this.$refs.parentForm.getData();
      const studentForm = this.$refs.studentForm.getData();
      if (
        !this.$refs.parentForm.validate() ||
        !this.$refs.studentForm.validate()
      ) {
        this.$alert.error("Xin vui lòng điền hết thông tin bắt buộc");
        return;
      }
      if (
        this.document.avatar.length === 0 &&
        studentForm.studentAvatar === ""
      ) {
        this.$alert.error("Xin vui lòng bổ sung ảnh của con!");
        return;
      }
      this.$dialog.confirm({
        title: "Hoàn thành",
        okText: "Xác nhận",
        topContent: `Sau khi hoàn thành, thông tin đã được khai báo sẽ <span class="error--text">KHÔNG ĐƯỢC CHỈNH SỬA</span>.`,
        midContent:
          "Quý phụ huynh vui lòng kiểm tra lại một cách kỹ lưỡng trước khi chuyển sang bước tiếp theo.",
        botContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục.",
        cancelText: "Kiểm tra lại",
        done: async () => {
          this.$loading.active = true;
          this.$emit("completeStep", this.getQuery(parentForm, studentForm));
        },
      });
    },
    saveDraft() {
      const parentForm = this.$refs.parentForm.getData();
      const studentForm = this.$refs.studentForm.getData();
      this.$loading.active = true;
      this.$emit("saveDraft", this.getQuery(parentForm, studentForm));
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
</style>
