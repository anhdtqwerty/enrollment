<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center">
      <div class="component-title">Báo cáo</div>
      <div class="component-title">{{ getCurrentDepartment }}</div>
    </div>
    <div class="section-title py-6" v-if="user.department === 'both'">Tài khoản và tin nhắn</div>
    <v-row class="d-flex" v-if="user.department === 'both'">
      <v-col cols="6">
        <v-card>
          <v-card-title class="card-title pa-6">Tài khoản</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9">Tổng số tài khoản</v-col>
              <v-col class="text-number admin--text text-end" sm="12" xs="12" md="3">
                {{ accountInfo.totalAccount }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tài khoản chưa kích hoạt OTP</v-col
              >
              <v-col class="text-number admin--text text-end" sm="12" xs="12" md="3">
                {{ accountInfo.totalInactiveAccount }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tài khoản đã kích hoạt OTP chưa có hồ sơ</v-col
              >
              <v-col class="text-number admin--text text-end" sm="12" xs="12" md="3">
                {{ accountInfo.totalNoDocumentAccount }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title class="card-title pa-6">Tin nhắn</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9">Tổng số tin nhắn</v-col>
              <v-col class="text-number admin--text text-end" sm="12" xs="12" md="3">
                {{ smsInfo.totalSMS }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tin nhắn trung bình một ngày</v-col
              >
              <v-col class="text-number admin--text text-end" sm="12" xs="12" md="3">
                {{ smsInfo.dailySMS }}
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col sm="12" xs="12" md="9"
                >Số tin nhắn OTP nhưng tài khoản chưa kích hoạt</v-col
              >
              <v-col class="text-number admin--text text-end" sm="12" xs="12" md="3">
                {{ smsInfo.inactiveSMS }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="section-title py-6">Mã kích hoạt</div>
    <v-row class="d-flex">
      <v-col cols="6">
        <v-card>
          <v-card-title class="card-title pa-6">Khối 6</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="d-flex justify-space-between pa-6">
            <div>
              <div class="text-number pb-3 admin--text">
                {{ grade6ActiveCode.totalActiveCodes }}
              </div>
              <div>Tổng số mã đã tạo</div>
            </div>
            <div>
              <div class="text-number pb-3 success--text">
                {{ grade6ActiveCode.activatedActiveCodes }}
              </div>
              <div>Số mã đã kích hoạt</div>
            </div>
            <div>
              <div class="text-number pb-3 warning--text">
                {{ grade6ActiveCode.inactiveActiveCodes }}
              </div>
              <div>Số mã chưa kích hoạt</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title class="card-title pa-6">Khối 10</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="d-flex justify-space-between pa-6">
            <div>
              <div class="text-number pb-3 admin--text">
                {{ grade10ActiveCode.totalActiveCodes }}
              </div>
              <div>Tổng số mã đã tạo</div>
            </div>
            <div>
              <div class="text-number pb-3 success--text">
                {{ grade10ActiveCode.activatedActiveCodes }}
              </div>
              <div>Số mã đã kích hoạt</div>
            </div>
            <div>
              <div class="text-number pb-3 warning--text">
                {{ grade10ActiveCode.inactiveActiveCodes }}
              </div>
              <div>Số mã chưa kích hoạt</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="section-title py-6">Hồ sơ</div>
    <v-row no-gutters>
      <v-card style="width: 100%">
        <v-card-title class="card-title pa-6">Khối 6</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <v-row class="d-flex align-center" no-gutters>
            <v-col cols="12" sm="12" xs="12" md="3">
              <div class="section-title px-2">Phát sinh hồ sơ</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="12" xs="12" md="3">
              <RangeDatePicker @change="changeDateRange($event, 'Khối 6')" />
            </v-col>
          </v-row>
          <div>
            <LineChart
              style="height: 275px; width: 100%; position: 'relative'"
              :chartdata="grade6LineChart"
              :options="lineChartOptions"
            />
          </div>
          <v-row class="d-flex mt-6" no-gutters>
            <v-col
              cols="7"
              class="d-flex flex-column align-start"
              style="border-right: 1px solid #e0e0e0"
            >
              <div class="section-title py-8 px-2">Tình trạng hồ sơ</div>
              <PieChart
                :chartdata="grade6PieChart"
                :options="pieChartOptions"
                class="align-self-center"
                style="width: 315px"
              />
              <div class="text-number align-self-center black--text">
                {{ grade6Document.total }}
              </div>
              <div class="timeline-title align-self-center py-1">
                Hồ sơ đã tạo
              </div>
            </v-col>
            <v-col cols="5" class="d-flex flex-column align-start">
              <div class="section-title py-8 px-6">Hồ sơ đang khai báo</div>
              <v-timeline dense clipped>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">Chọn sơ sở</div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade6Document.chooseFacility
                          : user.department === "Cơ sở A"
                          ? grade6Document.chooseFacilityA
                          : grade6Document.chooseFacility1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade6Document.chooseFacilityA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade6Document.chooseFacility1
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">
                      Thông tin phụ huynh, học sinh
                    </div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade6Document.infoForm
                          : user.department === "Cơ sở A"
                          ? grade6Document.infoFormA
                          : grade6Document.infoForm1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade6Document.infoFormA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade6Document.infoForm1
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">Kết quả học tập</div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade6Document.studyResult
                          : user.department === "Cơ sở A"
                          ? grade6Document.studyResultA
                          : grade6Document.studyResult1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade6Document.studyResultA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade6Document.studyResult1
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="mt-6" no-gutters>
      <v-card style="width: 100%">
        <v-card-title class="card-title pa-6">Khối 10</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <v-row class="d-flex align-center" no-gutters>
            <v-col cols="12" sm="12" xs="12" md="3">
              <div class="section-title px-2">Phát sinh hồ sơ</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="12" xs="12" md="3">
              <RangeDatePicker @change="changeDateRange($event, 'Khối 10')" />
            </v-col>
          </v-row>
          <div>
            <LineChart
              style="height: 275px; width: 100%; position: 'relative'"
              :chartdata="grade10LineChart"
              :options="lineChartOptions"
            />
          </div>
          <v-row class="d-flex mt-6" no-gutters>
            <v-col
              cols="7"
              class="d-flex flex-column align-start"
              style="border-right: 1px solid #e0e0e0"
            >
              <div class="section-title py-8 px-2">Tình trạng hồ sơ</div>
              <PieChart
                :chartdata="grade10PieChart"
                :options="pieChartOptions"
                class="align-self-center"
                style="width: 315px"
              />
              <div class="text-number align-self-center black--text">
                {{ grade10Document.total }}
              </div>
              <div class="timeline-title align-self-center py-1">
                Hồ sơ đã tạo
              </div>
            </v-col>
            <v-col cols="5" class="d-flex flex-column align-start">
              <div class="section-title py-8 px-6">Hồ sơ đang khai báo</div>
              <v-timeline dense clipped>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">Chọn sơ sở</div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade10Document.chooseFacility
                          : user.department === "Cơ sở A"
                          ? grade10Document.chooseFacilityA
                          : grade10Document.chooseFacility1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade10Document.chooseFacilityA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade10Document.chooseFacility1
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">
                      Thông tin phụ huynh, học sinh
                    </div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade10Document.infoForm
                          : user.department === "Cơ sở A"
                          ? grade10Document.infoFormA
                          : grade10Document.infoForm1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade10Document.infoFormA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade10Document.infoForm1
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">Đăng ký nguyện vọng</div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade10Document.expectation
                          : user.department === "Cơ sở A"
                          ? grade10Document.expectationA
                          : grade10Document.expectation1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade10Document.expectationA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade10Document.expectationA
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">Kết quả học tập</div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade10Document.studyResult
                          : user.department === "Cơ sở A"
                          ? grade10Document.studyResultA
                          : grade10Document.studyResult1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade10Document.studyResultA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade10Document.studyResult1
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  fill-dot
                  class="white--text mb-12 pb-0"
                  color="white"
                  small
                >
                  <template v-slot:icon>
                    <v-icon color="admin"> mdi-checkbox-marked-circle</v-icon>
                  </template>
                  <div>
                    <div class="timeline-title">Kết quả Kỳ thi tuyển sinh</div>
                    <div class="timeline-subtitle py-2">Số hồ sơ hoàn tất</div>
                    <div class="text-number admin--text text-end">
                      {{
                        user.department === "both"
                          ? grade10Document.examResult
                          : user.department === "Cơ sở A"
                          ? grade10Document.examResultA
                          : grade10Document.examResult1
                      }}
                    </div>
                    <div
                      class="timeline-subtitle py-2"
                      v-if="user.department === 'both'"
                    >
                      Cơ sở A:
                      <span class="admin--text">{{
                        grade10Document.examResultA
                      }}</span>
                      / Cơ sở 1:
                      <span class="admin--text">{{
                        grade10Document.examResult1
                      }}</span>
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import LineChart from "@/components/chart/LineChart.vue";
import PieChart from "@/components/chart/PieChart.vue";
import RangeDatePicker from "@/components/basic/RangeDatePicker.vue";
export default {
  components: { LineChart, PieChart, RangeDatePicker },
  computed: {
    ...mapGetters("cv", ["CVs", "CV", "count"]),
    ...mapGetters("activeCode", ["activeCode", "activeCodes", "count"]),
    ...mapGetters("auth", ["user"]),
    getCurrentDepartment() {
      if (this.user && this.user.department != "both")
        return this.user.department;
      else return "Cơ sở 1 và Cơ sở A";
    },
  },
  methods: {
    ...mapActions("activeCode", [
      "countActiveCodes",
      "fetchActiveCodes",
      "fetchActiveCode",
    ]),
    ...mapActions("cv", ["fetchCVs", "fetchCV", "countCVs"]),
    ...mapActions("user", ["countUsers", "fetchUsers"]),
    async getAccountInfo(users) {
      return {
        totalAccount: await this.countUsers({}),
        totalActiveAccount: users.filter(
          (user) => user.role.type != "admin" && user.isConfirmedOTP
        ).length,
        totalInactiveAccount: await this.countUsers({
          isConfirmedOTP: "false",
        }),
        totalNoDocumentAccount: users.filter(
          (user) =>
            user.cvs.length > 0 &&
            user.role.type != "admin" &&
            user.isConfirmedOTP
        ).length,
      };
    },
    async getSMSInfo(users) {
      const { totalSMS, inactiveSMS } = users.reduce(
        (acc, cur) => {
          acc.totalSMS += cur.SMSNum;
          if (cur.isConfirmedOTP && cur.cvs.length === 0)
            acc.inactiveSMS += cur.SMSNum;
          return acc;
        },
        {
          totalSMS: 0,
          inactiveSMS: 0,
        }
      );
      const dayNum = moment().diff(moment("05/04/2021", "DD/MM/YYYY"), "days") + 1;
      return {
        totalSMS,
        inactiveSMS,
        dailySMS: Math.round(totalSMS / dayNum),
      };
    },
    async getActiveCodeStatistics(grade) {
      return {
        totalActiveCodes: await this.countActiveCodes({
          grade,
          department_in: this.department,
        }),
        inactiveActiveCodes: await this.countActiveCodes({
          status: "inactive",
          grade,
          department_in: this.department,
        }),
        activatedActiveCodes: await this.countActiveCodes({
          status: "active",
          grade,
          department_in: this.department,
        }),
      };
    },
    async changeDateRange(data, grade) {
      if (grade === "Khối 6") {
        this.$loading.active = true;
        this.grade6StartDate = data[0];
        this.grade6EndDate = data[1];
        this.grade6LineChart = await this.getLineChartData(
          "Khối 6",
          this.grade6StartDate,
          this.grade6EndDate
        );
        this.$loading.active = false;
      } else {
        this.$loading.active = true;
        this.grade10StartDate = data[0];
        this.grade10EndDate = data[1];
        this.grade10LineChart = await this.getLineChartData(
          "Khối 10",
          this.grade10StartDate,
          this.grade10EndDate
        );
        this.$loading.active = false;
      }
    },
    async getPieChartData(grade) {
      return {
        labels: ["Hồ sơ chưa khai báo", "Hồ sơ đang khai báo", "Hồ sơ đã nộp"],
        datasets: [
          {
            backgroundColor: ["#0D47A1", "#BBDEFB", "#85A7C2"],
            data:
              grade === "Khối 6"
                ? [
                    this.grade6Document.totalCreated,
                    this.grade6Document.totalFilling,
                    this.grade6Document.totalSubmitted,
                  ]
                : [
                    this.grade10Document.totalCreated,
                    this.grade10Document.totalFilling,
                    this.grade10Document.totalSubmitted,
                  ],
          },
        ],
      };
    },
    async getLineChartData(grade, startDate, endDate) {
      let daysArray = Array.from(
        Array(moment(endDate).diff(moment(startDate), "days") + 1).keys()
      );
      const newDocumentEachDay = await this.getEachDayNewDocumentNum(
        daysArray,
        grade,
        startDate
      );
      daysArray = daysArray.map((index) => {
        return moment(startDate)
          .add(index, "days")
          .format("DD/MM/YYYY");
      });
      return {
        labels: daysArray,
        datasets: [
          {
            label: "Số hồ sơ tạo mới",
            backgroundColor: "rgba(13,71,161,0.75)",
            pointBackgroundColor: "#0D47A1",
            data: newDocumentEachDay,
          },
        ],
      };
    },
    /* eslint-disable no-unused-vars */
    async getEachDayNewDocumentNum(days, grade, startDate) {
      const promises = days.map(async (n, index) => {
        const query = {
          type: grade,
          createdAt_gt: moment(startDate)
            .add(index, "days")
            .toISOString(),
          createdAt_lt: moment(startDate)
            .add(index + 1, "days")
            .toISOString(),
          department_in: this.department,
        };
        return await this.countCVs(query);
      });
      return await Promise.all(promises);
    },
    /* eslint-enable no-unused-vars */
    async getDocumentInfo(grade) {
      const cvs = await this.fetchCVs({
        type: grade,
      });
      let query = {
        total: cvs.filter((cv) => this.department.includes(cv.department))
          .length,
        totalSubmitted: cvs.filter(
          (cv) =>
            cv.status === "submitted" && this.department.includes(cv.department)
        ).length,
        totalFilling: cvs.filter(
          (cv) =>
            cv.status === "filling" && this.department.includes(cv.department)
        ).length,
        totalCreated: cvs.filter(
          (cv) =>
            cv.status === "created" && this.department.includes(cv.department)
        ).length,
        chooseFacility: cvs.filter(
          (cv) => cv.step >= 2 && cv.status === "filling"
        ).length,
        chooseFacility1: cvs.filter(
          (cv) =>
            cv.step >= 2 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở 1"
        ).length,
        chooseFacilityA: cvs.filter(
          (cv) =>
            cv.step >= 2 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở A"
        ).length,

        infoForm: cvs.filter((cv) => cv.step >= 3 && cv.status === "filling")
          .length,
        infoForm1: cvs.filter(
          (cv) =>
            cv.step >= 3 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở 1"
        ).length,
        infoFormA: cvs.filter(
          (cv) =>
            cv.step >= 3 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở A"
        ).length,
      };
      if (grade === "Khối 6") {
        query.studyResult = cvs.filter(
          (cv) => cv.step >= 4 && cv.status === "filling"
        ).length;
        query.studyResult1 = cvs.filter(
          (cv) =>
            cv.step >= 4 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở 1"
        ).length;
        query.studyResultA = cvs.filter(
          (cv) =>
            cv.step >= 4 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở A"
        ).length;
      } else {
        query.expectation = cvs.filter(
          (cv) => cv.step >= 4 && cv.status === "filling"
        ).length;
        query.expectation1 = cvs.filter(
          (cv) =>
            cv.step >= 4 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở 1"
        ).length;
        query.expectationA = cvs.filter(
          (cv) =>
            cv.step >= 4 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở A"
        ).length;
        query.studyResult = cvs.filter(
          (cv) => cv.step >= 5 && cv.status === "filling"
        ).length;
        query.studyResultA = cvs.filter(
          (cv) =>
            cv.step >= 5 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở A"
        ).length;
        query.studyResult1 = cvs.filter(
          (cv) =>
            cv.step >= 5 &&
            cv.status === "filling" &&
            cv.department === "Cơ sở 1"
        ).length;
        query.examResult = cvs.filter(
          (cv) => cv.step >= 5 && cv.status === "submitted"
        ).length;
        query.examResultA = cvs.filter(
          (cv) =>
            cv.step >= 5 &&
            cv.status === "submitted" &&
            cv.department === "Cơ sở A"
        ).length;
        query.examResult1 = cvs.filter(
          (cv) =>
            cv.step >= 5 &&
            cv.status === "submitted" &&
            cv.department === "Cơ sở 1"
        ).length;
      }
      return query;
    },
  },
  async created() {
    this.$loading.active = true;
    if (this.user.department === "both")
      this.department = ["Cơ sở 1", "Cơ sở A", "unset"];
    else this.department = [this.user.department, "unset"];
    const users = await this.fetchUsers({});
    this.accountInfo = await this.getAccountInfo(users);
    this.smsInfo = await this.getSMSInfo(users);
    //Grade 6
    this.grade6ActiveCode = await this.getActiveCodeStatistics("Khối 6");
    this.grade6Document = await this.getDocumentInfo("Khối 6");
    this.grade6LineChart = await this.getLineChartData(
      "Khối 6",
      this.grade6StartDate,
      this.grade6EndDate
    );
    this.grade6PieChart = await this.getPieChartData("Khối 6");

    // //Grade 10
    this.grade10ActiveCode = await this.getActiveCodeStatistics("Khối 10");
    this.grade10Document = await this.getDocumentInfo("Khối 10");
    this.grade10LineChart = await this.getLineChartData(
      "Khối 10",
      this.grade10StartDate,
      this.grade10EndDate
    );
    this.grade10PieChart = await this.getPieChartData("Khối 10");
    this.$loading.active = false;
  },
  data() {
    return {
      department: [],
      accountInfo: {
        totalAccount: 0,
        totalInactiveAccount: 0,
        totalNoDocumentAccount: 0,
      },
      smsInfo: {
        totalSMS: 0,
        dailySMS: 0,
        inactiveSMS: 0,
      },
      pieChartOptions: { responsive: true, maintainAspectRatio: false },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 10,
                reverse: false,
                beginAtZero: true,
              },
            },
          ],
        },
      },
      //Grade 6
      grade6ActiveCode: {
        totalActiveCodes: 0,
        inactiveActiveCodes: 0,
        activatedActiveCodes: 0,
      },
      grade6LineChart: {},
      grade6PieChart: {},
      grade6DateRange: [],
      grade6StartDate: moment()
        .utc()
        .clone()
        .startOf("week")
        .toISOString(),
      grade6EndDate: moment()
        .utc()
        .clone()
        .endOf("week")
        .toISOString(),
      grade6Document: {
        total: 0,
        totalCreated: 0,
        totalSubmitted: 0,
        totalFilling: 0,
        chooseFacility: 0,
        chooseFacility1: 0,
        chooseFacilityA: 0,
        infoForm: 0,
        infoForm1: 0,
        infoFormA: 0,
        studyForm: 0,
        studyForm1: 0,
        studyFormA: 0,
      },
      //Grade 10
      grade10ActiveCode: {
        totalActiveCodes: 0,
        inactiveActiveCodes: 0,
        activatedActiveCodes: 0,
      },
      grade10LineChart: {},
      grade10PieChart: {},
      grade10DateRange: [],
      grade10StartDate: moment()
        .utc()
        .clone()
        .startOf("week")
        .toISOString(),
      grade10EndDate: moment()
        .utc()
        .clone()
        .endOf("week")
        .toISOString(),
      grade10Document: {
        total: 0,
        totalCreated: 0,
        totalSubmitted: 0,
        totalFilling: 0,
        chooseFacility: 0,
        chooseFacility1: 0,
        chooseFacilityA: 0,
        infoForm: 0,
        infoForm1: 0,
        infoFormA: 0,
        expectation: 0,
        expectation1: 0,
        expectationA: 0,
        studyForm: 0,
        studyForm1: 0,
        studyFormA: 0,
        examResult: 0,
        examResult1: 0,
        examResultA: 0,
      },
    };
  },
};
</script>

<style scoped>
.component-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #0d47a1;
}
.text-number {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
}
.section-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #212121;
}
.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #757575;
}
.timeline-title {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #757575;
}
.timeline-subtitle {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #757575;
}
</style>
