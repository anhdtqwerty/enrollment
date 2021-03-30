<template>
  <v-row
    class="footer-row d-flex align-center justify-end"
    :style="getFooterStyle"
    no-gutters
  >
    <v-spacer></v-spacer>
    <v-col
      cols="2"
      xs="2"
      sm="2"
      md="2"
      lg="1"
      v-if="$vuetify.breakpoint.smAndDown"
      ><span class="font-weight-medium body-text">Hotline:</span>
      <div style="color: #3e3e3c" v-if="$vuetify.breakpoint.smAndDown">
        >
      </div></v-col
    >
    <v-col
      cols="5"
      xs="5"
      sm="5"
      md="9"
      :class="{ 'd-flex justify-end mr-4': $vuetify.breakpoint.mdAndUp }"
    >
      <div
        class="mr-4 font-weight-medium body-text"
        v-if="$vuetify.breakpoint.mdAndUp"
        style="line-height: 26px;"
      >
        Hotline:
      </div>
      <div
        class="font-weight-light"
        :class="{ 'mr-4': $vuetify.breakpoint.mdAndUp }"
      >
        <span class="body-text">Cơ sở 1: </span>
        <a href="tel:02435683488" class="text-decoration-none body-text"
          >02435683488</a
        >
      </div>
      <div class="font-weight-light">
        <span class="body-text">Cơ sở A: </span>
        <a href="tel:02466638338" class="text-decoration-none body-text"
          >02466638338</a
        >
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  computed: {
    getFooterStyle() {
      if (this.$vuetify.breakpoint.mdAndUp)
        return "height: 52px; left: 0; width: 100%;";
      else return "height: 72px; width: 100%;";
    },
  },
};
</script>
<style scoped>
.footer-row {
  position: absolute;
  left: 0px;
  bottom: 0px;
  background-color: #3e3e3c;
  color: white;
}
.body-text {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
</style>
