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
        class="elevation-0 pb-16 mr-8"
      >
        <v-card-title class="item-title justify-center pa-6">
          Cơ sở A
        </v-card-title>
        <hr class="solid" />
        <ul class="item-content py-4 pr-6 pl-10">
          <li>
            Địa chỉ: Số 35 Đinh Núp, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội
          </li>
          <li>Hotline: 02435683488</li>
        </ul>
      </v-card>
      <v-card style="flex: 1 1 0px" color="#F8F8F8" class="elevation-0 pb-16">
        <v-card-title class="item-title justify-center pa-6">
          Cơ sở 1
        </v-card-title>
        <hr class="solid" />
        <ul class="item-content py-4 pr-6 pl-10">
          <li>Địa chỉ: Thôn Yên Xã, Tân Triều, Thanh Trì, Hà Nội</li>
          <li>Hotline: 02466638338</li>
        </ul>
      </v-card>
    </v-card-text>
    <hr class="dashed" />
    <v-card-actions class="d-flex justify-space-between pt-6 px-0">
      <v-btn class="px-6 py-3 text-none" color="primary" outlined large>
        <v-icon> mdi-content-save </v-icon>
        <span class="ml-2">Lưu tạm thời</span>
      </v-btn>
      <v-btn
        class="px-6 py-3 text-none"
        color="primary"
        @click="completeStep"
        large
      >
        <span>Hoàn thành</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
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
  color: #0084ff;
}
.item-content li {
  font-family: Roboto;
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
  border-top: 2px solid #0084ff;
  margin: auto;
}
</style>
