<template>
  <v-card width="100%" class="elevation-0">
    <v-card-title class="card-title mb-2">1. Thông tin phụ huynh</v-card-title>
    <v-card-subtitle class="card-subtitle">
      Vui lòng điền đầy đủ thông tin bằng tiếng Việt có dấu, viết hoa đầy đủ.
    </v-card-subtitle>
    <v-card-text class="d-flex pa-0">
      <ParentForm ref="parentForm" />
    </v-card-text>
    <hr class="dashed" />
    <v-card-title class="card-title mb-2 mt-6">2. Thông tin học sinh</v-card-title>
    <v-card-subtitle class="card-subtitle">
      Vui lòng điền đầy đủ thông tin bằng tiếng Việt có dấu, viết hoa đầy đủ.
    </v-card-subtitle>
    <v-card-text class="d-flex pa-0">
      <StudentForm ref="studentForm" />
    </v-card-text>
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-end pt-6 px-0">
      <v-btn
        class="px-6 py-3 mr-6 text-none"
        color="primary"
        v-if="documentStep === 2"
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
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none elevation-0"
        color="primary"
        v-if="documentStep !== 2"
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
export default {
  components: {
    ParentForm,
    StudentForm,
  },
  props: {
    document: Object,
    documentStep: Number,
  },
  data() {
    return {};
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
  color: #3E3E3C;
}
hr.dashed {
  width: 100%;
  border: 1px dashed #e6e4eb;
}
</style>
