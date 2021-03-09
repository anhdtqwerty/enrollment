<template>
  <v-container class="overflow-auto pa-0" fluid fill-height>
    <v-row no-gutters>
      <v-col>
        <v-img src="@/assets/homepage/home-bg.svg" class="bg-image"></v-img>
      </v-col>
      <v-col>
        <v-row v-for="n in 3" :key="n" class="justify-space-around" no-gutters>
          <v-col xs="0" sm="0" md="2"></v-col>
          <v-col class="d-flex justify-center" xs="12" sm="12" md="4">
            <v-card class="elevation-0">
              <v-img
                :src="getImageSrc(n, 0)"
                class="mx-auto"
                width="150px"
              ></v-img>
              <v-card-title class="justify-center">{{
                menu[(n - 1) * 2].title
              }}</v-card-title>
            </v-card>
          </v-col>
          <v-col class="d-flex justify-center" xs="12" sm="12" md="4">
            <v-card class="elevation-0">
              <v-img
                :src="getImageSrc(n, 1)"
                class="mx-auto"
                width="150px"
              ></v-img>
              <v-card-title class="justify-center">{{
                menu[(n - 1) * 2 + 1].title
              }}</v-card-title>
            </v-card>
          </v-col>
          <v-col xs="0" sm="0" md="2"></v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="footer-row d-flex align-center justify-end px-4" no-gutters>
      <span class="font-weight-medium mr-4">Hotline:</span>
      <span class="font-weight-light mr-4"
        >Cơ sở 1:
        <a href="tel:02435683488" class="text-decoration-none"
          >02435683488</a
        ></span
      >
      <span class="font-weight-light"
        >Cơ sở 2:
        <a href="tel:02466638338" class="text-decoration-none"
          >02466638338</a
        ></span
      >
    </div>
  </v-container>
</template>

<script>

export default {
  name: "Home",
  methods: {
    getImageSrc(n, index) {
      return this.menu[(n - 1) * 2 + index].src;
    },
  },
  data: () => ({
    signinDialog: false,
    forgotPasswordDialog: true,
    menu: [
      {
        title: "Thông tin tuyển sinh",
        src: require("@/assets/homepage/Group-5.svg"),
        link: "#",
      },
      {
        title: "Quản lý hồ sơ",
        src: require("@/assets/homepage/Group-2.svg"),
        link: "#",
      },
      {
        title: "Giới thiệu chung",
        src: require("@/assets/homepage/Group-4.svg"),
        link: "#",
      },
      {
        title: "Cơ cấu HĐQT",
        src: require("@/assets/homepage/Group-1.svg"),
        link: "#",
      },
      {
        title: "Cơ sở vật chất",
        src: require("@/assets/homepage/Group-6.svg"),
        link: "#",
      },
      {
        title: "Hoạt động từ thiện",
        src: require("@/assets/homepage/Group-3.svg"),
        link: "#",
      },
    ],
  }),
};
</script>

<style scoped>
.bg-image {
  position: absolute;
  object-fit: cover;
  width: 50%;
  height: 100%;
  top: 0;
  left: 0;
}
.footer-row {
  position: absolute;
  bottom: 0px;
  left: 50%;
  width: 50%;
  height: 52px;
  background-color: #3e3e3c;
  color: white;
}
</style>
