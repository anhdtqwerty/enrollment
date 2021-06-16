<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <ConfirmDialog />
    <v-card>
      <v-card-title class="admin white--text text-uppercase dialog-title">
        Xác nhận cập nhật kết quả thi của thí sinh
        <v-spacer></v-spacer>
        <v-btn dark icon>
          <v-icon @click="cancel" class="mr-n1" :disabled="loading"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="py-0">
        <ConfirmResultGrade6Table
          ref="documentTable"
          :documents="importedDocuments"
          :isImportPreview="true"
          v-if="grade === 'Khối 6'"
        />
        <ConfirmResultGrade10Table
          ref="documentTable"
          :documents="importedDocuments"
          :isImportPreview="true"
          v-if="grade === 'Khối 10'"
        />
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-btn
          color="admin"
          @click="cancel"
          width="118"
          :loading="loading"
          large
          outlined
          >Hủy</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          color="admin"
          @click="confirm"
          :loading="loading"
          width="118"
          class="white--text elevation-0"
          large
          >Xác nhận</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ConfirmResultGrade6Table from "./ConfirmResultGrade6Table";
import ConfirmResultGrade10Table from "./ConfirmResultGrade10Table";
import ConfirmDialog from "@/components/plugin/PluginAdminConfirmDialog";
export default {
  props: {
    grade: String,
    importedDocuments: Array,
    state: Boolean,
  },
  components: {
    ConfirmResultGrade6Table,
    ConfirmResultGrade10Table,
    ConfirmDialog,
  },
  watch: {
    state(state) {
      this.dialog = state;
      if (!state) this.loading = false;
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("closeDialog");
    },
    async confirm() {
      this.$adminDialog.confirm({
        title: "Xác nhận cập nhật kết quả thi",
        okText: "Xác nhận",
        topContent: `Hãy kiểm tra thật kỹ kết quả thi của các thí sinh.`,
        midContent: `Sau khi nhấn "Xác nhận" kết quả sẽ được <span class="error--text">hiển thị cho tất cả thí sinh</span>`,
        botContent:
          "Nếu đã chắc chắn quý phụ huynh bấm vào nút xác nhận bên dưới để tiếp tục",
        cancelText: "Hủy",
        done: async () => {
          this.loading = true;
          this.$emit("updateResult", this.importedDocuments);
        },
      });
    },
  },
};
</script>

<style scoped>
.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.card-content {
  text-align: justify !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  line-height: 20px;
  color: #3e3e3c !important;
}
.btn {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 20px;
}
</style>
