<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        prepend-icon="mdi-calendar"
        readonly
        outlined
        hide-details
        dense
        placeholder="Chọn khoảng ngày"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable range>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">
        Hủy
      </v-btn>
      <v-btn text color="primary" @click="dateChange">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    date: [],
    menu: false,
  }),
  methods: {
    dateChange() {
      if (
        moment
          .utc(this.date[0], "YYYY-MM-DD")
          .isAfter(moment.utc(this.date[1], "YYYY-MM-DD"))
      ) {
        let temp = this.date[0];
        this.date[0] = this.date[1];
        this.date[1] = temp;
      }
      this.$refs.menu.save(this.date);
      this.$emit("change", [
        moment
          .utc(this.date[0], "YYYY-MM-DD")
          .startOf("day")
          .toISOString(),
        moment
          .utc(this.date[1], "YYYY-MM-DD")
          .endOf("day")
          .toISOString(),
      ]);
      this.date[0] = moment
        .utc(this.date[0], "YYYY-MM-DD")
        .format("DD/MM/YYYY");
      this.date[1] = moment
        .utc(this.date[1], "YYYY-MM-DD")
        .format("DD/MM/YYYY");
      this.menu = false;
    },
  },
};
</script>
