<template>
  <v-card width="100%" class="elevation-0">
    <v-card-title class="card-title mb-2">Chọn cơ sở</v-card-title>
    <v-card-subtitle class="card-subtitle">
      Xin quý phụ huynh lưu ý trước khi xác nhận cơ sở đăng ký cho con: Hồ sơ
      đăng ký tại cơ sở nào sẽ chỉ được thi và nhập học tại cơ sở đó.
    </v-card-subtitle>
    <v-card-text class="d-flex py-6">
      <v-card
        style="flex: 1 1 0px"
        color="#F8F8F8"
        class="elevation-0 mr-8"
        :class="{ 'selected-card': department === 'Cơ sở A' }"
        :disabled="department !== 'Cơ sở A' && department !== ''"
        @click="chooseFacility(true)"
      >
        <v-card-title
          class="item-title justify-center pa-6"
          :class="{
            'item-text-color': department === 'Cơ sở A' || department === '',
            'disable-item-text-color':
              department !== 'Cơ sở A' && department !== '',
          }"
        >
          Cơ sở A
        </v-card-title>
        <hr
          class="solid"
          :class="{
            'item-text-color': department === 'Cơ sở A' || department === '',
            'disable-item-text-color':
              department !== 'Cơ sở A' && department !== '',
          }"
        />
        <ul class="item-content pt-4 pb-6 pr-6 pl-10">
          <li>
            Địa chỉ: Số 35 Đinh Núp, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội
          </li>
          <li>Hotline 1: 0242.215.5985</li>
          <li>Hotline 2: 0246.663.8338</li>
        </ul>
      </v-card>
      <v-card
        style="flex: 1 1 0px"
        color="#F8F8F8"
        class="elevation-0"
        :class="{ 'selected-card': department === 'Cơ sở 1' }"
        :disabled="department !== 'Cơ sở 1' && department !== ''"
        @click="chooseFacility(false)"
      >
        <v-card-title
          class="item-title justify-center pa-6"
          :class="{
            'item-text-color': department === 'Cơ sở 1' || department === '',
            'disable-item-text-color':
              department !== 'Cơ sở 1' && department !== '',
          }"
        >
          Cơ sở 1
        </v-card-title>
        <hr
          class="solid"
          :class="{
            'item-text-color': department === 'Cơ sở 1' || department === '',
            'disable-item-text-color':
              department !== 'Cơ sở 1' && department !== '',
          }"
        />
        <ul class="item-content pt-4 pb-6 pr-6 pl-10">
          <li>Địa chỉ: Thôn Yên Xã, Tân Triều, Thanh Trì, Hà Nội</li>
          <li>Hotline: 0243.568.2603</li>
        </ul>
      </v-card>
    </v-card-text>
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-space-between pt-6 px-0">
      <v-btn
        class="px-6 py-3 text-none"
        color="primary"
        :loading="loading"
        @click="saveDraft()"
        outlined
        large
      >
        <v-icon> mdi-content-save </v-icon>
        <span class="ml-2">Lưu tạm thời</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none"
        color="primary"
        @click="completeStep"
        :loading="loading"
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.documentCode = this.$route.params.code;
  },
  data() {
    return {
      department: "",
      loading: false,
      documentCode: "",
    };
  },
  computed: {
    ...mapGetters("cv", ["CVs", "CV"]),
    ...mapGetters("auth", ["user", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV"]),
    async saveDraft() {
      if (this.department === "") {
        this.$alert.error("Xin vui lòng chọn cơ sở");
        return;
      }
      this.loading = true;
      const updatedCV = await this.updateCV({
        id: this.CV(this.documentCode).id,
        department: this.department,
      });
      if (updatedCV && updatedCV.department && updatedCV.department != "")
        this.$alert.success("Đã lưu thành công");
      this.loading = false;
    },
    completeStep() {
      this.$dialog.confirm({
        title: "Hoàn thành",
        okText: "Xác nhận",
        cancelText: "Chọn lại",
        done: async () => {
          this.$emit("completeFacilityStep");
        },
      });
    },
    chooseFacility(isFacilityA) {
      if (isFacilityA) {
        if (this.department === "Cơ sở A") this.department = "";
        else this.department = "Cơ sở A";
      }
      if (!isFacilityA) {
        if (this.department === "Cơ sở 1") this.department = "";
        else this.department = "Cơ sở 1";
      }
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
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
.item-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
}
.item-text-color {
  color: #0084ff;
}
.disabled-item-text-color {
  color: #0084ff;
}
.item-content li {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
}
.item-content li:not(:last-child) {
  margin-bottom: 16px;
}
hr.dashed {
  border-top: 1px dashed #e6e4eb;
}
hr.solid {
  width: calc(100% - 24px * 2);
  border-style: solid;
  border-width: 1px;
  margin: auto;
}
.selected-card {
  border: rgba(0, 132, 255, 1) 1px solid !important;
  background: rgba(0, 132, 255, 0.1) !important;
}
</style>
