<template>
  <div>
    <DocumentGrade6
      v-if="document.type && document.type === 'Khối 6'"
      :documentCode="documentCode"
      :systemTime="systemTime"
      :document="document"
      @updateDocument="updateDocument"
    />
    <DocumentGrade10
      v-if="document.type && document.type === 'Khối 10'"
      :documentCode="documentCode"
      :systemTime="systemTime"
      :document="document"
      @updateDocument="updateDocument"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DocumentGrade6 from "./DocumentGrade6.vue";
import DocumentGrade10 from "./DocumentGrade10.vue";

export default {
  async created() {
    this.documentCode = this.$route.params.code;
    this.$loading.active = true;
    if (!this.user || !this.isAuthenticated) {
      this.$alert.error(`Bạn cần phải đăng nhập để sử dụng chức năng này!`);
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    await this.fetchCV({ code: this.documentCode, userId: this.user.id });
    if (!this.CV(this.documentCode)) {
      this.$alert.error(
        `Hồ sơ ${this.documentCode} không tồn tại hoặc không có quyền truy cập!`
      );
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    this.document = this.CV(this.documentCode);
    this.systemTime = await this.checkSystemTime({ grade: this.document.type });
    console.log(this.systemTime);
    this.$loading.active = false;
  },
  computed: {
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cv", ["CVs", "CV", "step"]),
  },
  methods: {
    ...mapActions("cv", ["fetchCVs", "fetchCV", "updateCV", "checkSystemTime"]),
    async updateDocument(data, isDraft) {
      if (!data) {
        this.$alert.error("Đã có lỗi xảy ra trong quá trình cập nhật hồ sơ");
        return;
      }
      if (data.department && data.department === "") {
        this.$alert.error("Xin vui lòng chọn cơ sở");
        return;
      }
      if (isDraft) {
        data.submitType = "save-draft";
        data.isDraft = true;
      } else {
        data.submitType = "complete-step";
        data.isDraft = false;
      }
      await this.updateCV({
        code: this.document.code,
        userPhone: this.user.username,
        ...data,
      });
      this.document = this.CV(this.documentCode);
      this.$loading.active = false;
    },
  },
  data() {
    return {
      documentCode: "",
      document: {},
      systemTime: {},
    };
  },
  components: {
    DocumentGrade6,
    DocumentGrade10,
  },
};
</script>