<template>
  <div class="d-flex align-center">
    <v-menu v-model="showMenu" min-width="120px" max-width="200px" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" class="info--text">
          Xin chào quý phụ huynh!
        </div>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title @click="onSignOut()">Đăng xuất</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      color="error"
      class="text-none ml-6"
      @click="onSignOut()"
      outlined
      rounded
      >Đăng xuất</v-btn
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user", "isConfirmedOTP"]),
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    ...mapActions("layout", ["setAllDialogClose"]),
    onSignOut() {
      this.setAllDialogClose();
      this.signOut();
    },
  },
};
</script>
