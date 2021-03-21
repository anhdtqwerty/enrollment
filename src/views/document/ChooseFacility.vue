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
        :class="{
          'selected-card': department === 'Cơ sở A',
          'cursor-default': step !== 1,
        }"
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
        :class="{
          'selected-card': department === 'Cơ sở 1',
          'cursor-default': step !== 1,
        }"
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
    <DocumentActions
      :documentId="document.id"
      :query="query"
      @completeStep="completeStep"
    />
  </v-card>
</template>

<script>
import DocumentActions from "./DocumentActions.vue";
export default {
  components: { DocumentActions },
  props: {
    document: Object,
    documentCode: String,
    step: Number,
  },
  data() {
    return {
      department: "",
      query: {},
    };
  },
  watch: {
    document(document) {
      if (document && document.department && document.department !== "")
        this.department = document.department;
    },
    department(department) {
      this.query = {
        department,
      };
    },
  },

  methods: {
    chooseFacility(isFacilityA) {
      if (isFacilityA && this.step === 1) {
        if (this.department === "Cơ sở A") this.department = "";
        else this.department = "Cơ sở A";
      }
      if (!isFacilityA && this.step === 1) {
        if (this.department === "Cơ sở 1") this.department = "";
        else this.department = "Cơ sở 1";
      }
    },
    completeStep() {
      //TODO: sua API de update step
      this.$emit("completeFacilityStep");
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
.cursor-default {
  pointer-events: none;
}
.cursor-default:hover {
  cursor: default;
}
</style>
