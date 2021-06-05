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
    if (this.isMaintainMode) {
      this.redirectToHome(`Hệ thống hiện tại đang được bảo trì!`);
      return;
    }
    if (!this.user || !this.isAuthenticated) {
      this.$alert.error(`Bạn cần phải đăng nhập để sử dụng chức năng này!`);
      this.$router.push("/");
      this.$loading.active = false;
      return;
    }
    const systemTime = await this.checkSystemTime();
    console.log(systemTime);
    if (
      (!systemTime || !systemTime.checkSystemTime["open-document"]) &&
      this.user.role.type !== "admin" &&
      process.env.NODE_ENV !== "development"
    ) {
      this.redirectToHome(
        `Hệ thống sẽ mở vào ngày ${moment(
          systemTime.systemTime["open-document"]
        ).format("DD/MM/YYYY HH:mm:ss")}!`
      );
      return;
    }
    await this.fetchCV({
      id: this.documentId,
      parent: this.user.id,
    });
    if (!this.CV(this.documentId)) {
      this.redirectToHome(
        `Hồ sơ ${this.documentId} không tồn tại hoặc không có quyền truy cập!`
      );
      return;
    } else if (
      this.document.type == "Khối 6" &&
      systemTime.checkSystemTime["grade6-close-document"]
    ) {
      this.redirectToHome(
        `Hệ thống hồ sơ khối 6 đã đóng vào ngày ${systemTime.systemTime["grade6-close-document"]}`
      );
      return;
    } else if (
      this.document.type == "Khối 10" &&
      systemTime.checkSystemTime["grade10-close-document"]
    ) {
      this.redirectToHome(
        `Hệ thống hồ sơ khối 10 đã đóng vào ngày ${systemTime.systemTime["grade10-close-document"]}`
      );
      return;
    }
    this.document = this.CV(this.documentId);
    if (this.document.status === "disabled")
      this.redirectToHome(`Hồ sơ ${this.documentId} đã bị Admin vô hiệu hoá!`);
    this.documentSystemTime = await this.checkDocumentSystemTime({
      grade: this.document.type,
    });
    console.log(this.documentSystemTime);
    if (this.document.type === "Khối 6")
      this.checkStepGrade6(this.document.step, this.documentSystemTime);
    else
      this.checkStepGrade10(this.step, this.document, this.documentSystemTime);
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
    redirectToHome(message) {
      this.$alert.error(message);
      this.$router.push("/");
      this.$loading.active = false;
    },
    checkStepGrade10(step, document, systemTime) {
      switch (step) {
        case 3:
          if (
            (!systemTime.checkDocumentSystemTime["register-expectation"] &&
              this.user.role.type !== "admin") ||
            (document.isDraft && step > 3 && this.user.role.type !== "admin")
          )
            this.setStep(this.step - 1);
          break;
        case 4:
          if (
            (!systemTime.checkDocumentSystemTime["study-result"] &&
              this.user.role.type !== "admin") ||
            (document.isDraft && step > 4 && this.user.role.type !== "admin")
          )
            this.setStep(this.step - 1);
          break;
        case 5:
          if (
            (!systemTime.checkDocumentSystemTime["exam-result"] &&
              this.user.role.type !== "admin") ||
            (document.isDraft && step > 5 && this.user.role.type !== "admin")
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
      } else if (this.step < this.document.step) {
        data.submitType = "save-draft";
        this.setStep(this.step + 1);
      } else {
        data.submitType = "complete-step";
        data.isDraft = false;
        this.setStep(this.step + 1);
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.showAlertDialog(isDraft);
      this.$loading.active = false;
    },
    showAlertDialog(isDraft) {
      if (isDraft) {
        if (
          this.document.type === "Khối 6" &&
          this.step === 4 &&
          !this.documentSystemTime.checkDocumentSystemTime[
            "display-exam-result"
          ]
        )
          return;
        else this.$alert.success("Đã lưu thành công");
      } else {
        if (
          this.document.type === "Khối 6" &&
          this.step === 4 &&
          !this.documentSystemTime.checkDocumentSystemTime[
            "display-exam-result"
          ]
        )
          return;
        if (
          this.document.type === "Khối 10" &&
          this.step === 4 &&
          !this.documentSystemTime.checkDocumentSystemTime["exam-result"]
        )
          return;
        else this.$alert.success("Đã hoàn thành khai báo thông tin");
      }
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
      isMaintainMode: false, //TODO: delete this
    };
  },
  components: {
    DocumentGrade6,
    DocumentGrade10,
  },
};
</script>
