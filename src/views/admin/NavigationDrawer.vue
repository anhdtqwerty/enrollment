<template>
  <v-navigation-drawer
    v-model="state"
    class="elevation-1"
    app
    :permanent="$vuetify.breakpoint.smAndUp"
    :temporary="$vuetify.breakpoint.xs"
  >
    <div
      class="d-flex align-center px-6"
      :class="{
        'mobile-drawer-logo': $vuetify.breakpoint.xs,
        'px-7': $vuetify.breakpoint.xs,
      }"
    >
      <div class="d-flex justify-center px-6">
        <v-img
          height="64px"
          src="../../assets/logo.svg"
          contain
          position="center"
        ></v-img>
      </div>
    </div>
    <v-divider></v-divider>
    <v-list class="py-0">
      <v-list-item to="/admin/dashboard" active-class="active-item" link>
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-action></v-list-item-action>
        <v-list-item-title> Dashboard </v-list-item-title>
      </v-list-item>
      <v-list-item to="/admin/active-code" active-class="active-item" link>
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-action></v-list-item-action>
        <v-list-item-title> Quản lý mã kích hoạt </v-list-item-title>
      </v-list-item>
      <v-list-item to="/admin/document" active-class="active-item" link>
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-account-box-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-action></v-list-item-action>
        <v-list-item-title> Quản lý hồ sơ </v-list-item-title>
      </v-list-item>
      <v-list-item to="/admin/grade6-result" active-class="active-item" link>
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-note-text</v-icon>
        </v-list-item-icon>
        <v-list-item-action></v-list-item-action>
        <v-list-item-title> Kết quả thi Khối 6 </v-list-item-title>
      </v-list-item>
      <v-list-item to="/admin/grade10-result" active-class="active-item" link>
        <v-list-item-icon class="mr-4">
          <v-icon>mdi-note-text</v-icon>
        </v-list-item-icon>
        <v-list-item-action></v-list-item-action>
        <v-list-item-title> Kết quả thi Khối 10 </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawer: { type: Boolean },
  },
  data() {
    return {
      state: false,
    };
  },
  watch: {
    drawer() {
      this.state = true;
    },
  },
  components: {},
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "32px";
        default:
          return "64px";
      }
    },
  },
};
</script>

<style scoped>
.mobile-drawer-logo {
  height: 64px;
}
.active-item {
  background: #0d47a1;
  color: white !important;
}
</style>
