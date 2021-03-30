<template>
  <div>
    <DocumentGrade6
      v-if="document.type && document.type === 'Khối 6'"
      :systemTime="documentSystemTime"
      :document="document"
      @updateDocument="updateDocument"
      @updateActiveCode="updateActiveCode"
    />
    <DocumentGrade10
      v-if="document.type && document.type === 'Khối 10'"
      :systemTime="documentSystemTime"
      :document="document"
      @updateDocument="updateDocument"
      @updateActiveCode="updateActiveCode"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DocumentGrade6 from "./DocumentGrade6.vue";
import DocumentGrade10 from "./DocumentGrade10.vue";
import moment from "moment";

export default {
  async created() {
    this.documentId = this.$route.params.id;
    this.$loading.active = true;
    if (!this.user || !this.isAuthenticated) {
      this.$alert.error(`Bạn cần phải đăng nhập để sử dụng chức năng này!`);
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    const systemTime = await this.checkSystemTime();
    if (
      (!systemTime || !systemTime.checkSystemTime["open-document"]) &&
      this.user.role.type !== "admin"
    ) {
      this.$alert.error(
        `Hệ thống sẽ mở vào ngày ${moment(
          systemTime.systemTime["open-document"]
        ).format("DD/MM/YYYY hh:mm:ss")}!`
      );
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    await this.fetchCV({
      id: this.documentId,
      parent: this.user.id,
    });
    if (!this.CV(this.documentId)) {
      this.$alert.error(
        `Hồ sơ ${this.documentId} không tồn tại hoặc không có quyền truy cập!`
      );
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    this.document = this.CV(this.documentId);
    this.documentSystemTime = await this.checkDocumentSystemTime({
      grade: this.document.type,
    });
    console.log(this.documentSystemTime);
    this.$loading.active = false;
  },
  computed: {
    ...mapGetters("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cv", ["CVs", "CV", "step"]),
  },
  methods: {
    ...mapActions("cv", [
      "fetchCVs",
      "fetchCV",
      "updateCV",
      "checkDocumentSystemTime",
      "checkSystemTime",
    ]),
    ...mapActions("upload", ["upload", "destroy"]),
    ...mapActions("activeCode", ["updateActiveCode", "fetchActiveCode"]),
    async updateDocument(data, isDraft) {
      let avatarId = "";
      if (!data) {
        this.$alert.error("Đã có lỗi xảy ra trong quá trình cập nhật hồ sơ");
        return;
      }
      if (data.avatar && data.avatar != "") {
        avatarId = await this.uploadAvatar(data.avatar);
        data.avatar = [avatarId];
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
      this.document = this.CV(this.documentId);
      if (data.isChooseFacility) {
        await this.updateActiveCode({
          id: this.document.activeCode.id,
          department: this.document.department,
        });
      }
      this.documentSystemTime = await this.checkDocumentSystemTime({
        grade: this.document.type,
      });
      this.$loading.active = false;
    },
    async uploadAvatar(image) {
      if (this.document.avatar.length > 0)
        await this.destroy(this.document.avatar[0].id);
      let formData = new FormData();
      formData.append("files", image);
      formData.append("refId", this.document.id);
      formData.append("field", "avatar");
      return await this.upload(formData);
    },
  },
  data() {
    return {
      documentId: "",
      document: {},
      documentSystemTime: {},
    };
  },
  components: {
    DocumentGrade6,
    DocumentGrade10,
  },
};
</script>
