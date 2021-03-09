<template>
  <div>
    <v-btn
      color="info"
      class="text-none mr-4"
      @click="onSigninClick"
      x-large
      plain
      >Đăng nhập</v-btn
    >
    <v-btn
      color="primary"
      class="text-none"
      @click="onSignupClick"
      x-large
      outlined
      >Đăng ký ngay</v-btn
    >
  </div>
</template>

<script>
export default {
  methods: {
    onSigninClick() {
      this.$emit("onSigninClick", true);
    },
    onSignupClick() {
      this.$emit("onSignupClick", true);
    },
  },
};
</script>
