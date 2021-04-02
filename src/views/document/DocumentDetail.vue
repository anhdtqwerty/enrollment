<template>
  <div>
    <DocumentGrade6
      v-if="document.type && document.type === 'Khối 6'"
      :systemTime="documentSystemTime"
      :document="document"
      @updateDocument="updateDocument"
    />
    <DocumentGrade10
      v-if="document.type && document.type === 'Khối 10'"
      :systemTime="documentSystemTime"
      :document="document"
      @updateDocument="updateDocument"
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
      this.user.role.type !== "admin" &&
      process.env.NODE_ENV !== "development"
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
    if (this.document.type === "Khối 6")
      this.checkStepGrade6(this.document.step, this.documentSystemTime);
    else this.checkStepGrade10(this.document, this.documentSystemTime);
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
      "setStep",
    ]),
    ...mapActions("upload", ["upload", "destroy"]),
    ...mapActions("activeCode", ["updateActiveCode", "fetchActiveCode"]),
    checkStepGrade10(document, systemTime) {
      switch (document.step) {
        case 3:
          if (
            (!systemTime.checkDocumentSystemTime["register-expectation"] &&
              this.user.role.type !== "admin") ||
            (document.isDraft &&
              document.step > 3 &&
              this.user.role.type !== "admin")
          )
            this.setStep(this.step - 1);
          break;
        case 4:
          if (
            (!systemTime.checkDocumentSystemTime["study-result"] &&
              this.user.role.type !== "admin") ||
            (document.isDraft &&
              document.step > 4 &&
              this.user.role.type !== "admin")
          )
            this.setStep(this.step - 1);
          break;
        case 5:
          if (
            (!systemTime.checkDocumentSystemTime["exam-result"] &&
              this.user.role.type !== "admin") ||
            (document.isDraft &&
              document.step > 5 &&
              this.user.role.type !== "admin")
          )
            this.setStep(this.step - 1);
          break;
      }
    },
    checkStepGrade6(step, systemTime) {
      switch (step) {
        case 3:
          if (
            !systemTime.checkDocumentSystemTime["study-result"] &&
            this.user.role.type !== "admin"
          )
            this.setStep(step - 1);
          break;
        case 4:
          if (
            !systemTime.checkDocumentSystemTime["exam-result"] &&
            this.user.role.type !== "admin"
          )
            this.setStep(step - 1);
          break;
      }
    },
    async updateDocument(data, isDraft) {
      this.documentSystemTime = await this.checkDocumentSystemTime({
        grade: this.document.type,
      });
      let avatarId = "";
      if (
        this.documentSystemTime.checkDocumentSystemTime["close-fill-document"]
      ) {
        this.$alert.error(
          `Hệ thống hồ sơ đã đóng vào ngày ${this.documentSystemTime.documentSystemTime["close-fill-document"]}`
        );
        return;
      }
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
      if (isDraft) this.$alert.success("Đã lưu thành công");
      else this.$alert.success("Đã hoàn thành khai báo thông tin");
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
