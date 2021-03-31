<template>
  <div class="pa-6">
    <div class="d-flex justify-space-between align-center">
      <div class="component-title">
        Báo cáo
      </div>
    </div>
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
                {{ grade6ActiveCode.inactiveActiveCodes }}
              </div>
              <div>Số mã đã kích hoạt</div>
            </div>
            <div>
              <div class="text-number pb-3 warning--text">
                {{ grade6ActiveCode.activatedActiveCodes }}
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
                {{ grade10ActiveCode.inactiveActiveCodes }}
              </div>
              <div>Số mã đã kích hoạt</div>
            </div>
            <div>
              <div class="text-number pb-3 warning--text">
                {{ grade10ActiveCode.activatedActiveCodes }}
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
        <v-card-text>
          <div class="section-title py-6 px-2">Phát sinh hồ sơ</div>
          <div>
            <LineChart
              style="height: 275px; width: 100%; position: 'relative'"
              :chartdata="grade6LineChart"
              :options="lineChartOptions"
            />
          </div>
          <div class="section-title py-8 px-2">Tình trạng hồ sơ</div>
          <v-row class="d-flex justify-center" no-gutters>
            <v-col cols="6">
              <PieChart
                :chartdata="grade6PieChart"
                :options="pieChartOptions"
                style="width: 315px"
              />
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="5"></v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import LineChart from "@/components/chart/LineChart.js";
import PieChart from "@/components/chart/PieChart.js";
export default {
  components: { LineChart, PieChart },
  computed: {
    ...mapGetters("cv", ["CVs", "CV", "count"]),
    ...mapGetters("activeCode", ["activeCode", "activeCodes", "count"]),
  },
  methods: {
    ...mapActions("activeCode", [
      "countActiveCodes",
      "fetchActiveCodes",
      "fetchActiveCode",
    ]),
    ...mapActions("cv", ["fetchCVs", "fetchCV", "countCVs"]),
    async getActiveCodeStatistics(grade) {
      return {
        totalActiveCodes: await this.countActiveCodes({ grade }),
        inactiveActiveCodes: await this.countActiveCodes({
          status: "inactive",
          grade,
        }),
        activatedActiveCodes: await this.countActiveCodes({
          status: "active",
          grade,
        }),
      };
    },
    async getPieChartData(grade) {
      return {
        labels: ["Hồ sơ đã nộp", "Hồ sơ đang khai báo"],
        datasets: [
          {
            backgroundColor: ["#0D47A1", "#BBDEFB"],
            data: [
              await this.countCVs({ type: grade, status: "submitted" }),
              await this.countCVs({
                type: grade,
                status_in: ["filling", "created"],
              }),
            ],
          },
        ],
      };
    },
    async getLineChartData(grade, startDate, endDate) {
      let daysArray = Array.from(
        Array(moment(endDate).diff(moment(startDate), "days")).keys()
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
        };
        return await this.countCVs(query);
      });
      return await Promise.all(promises);
    },
    /* eslint-enable no-unused-vars */
  },
  async created() {
    this.$loading.active = true;
    this.grade6ActiveCode = await this.getActiveCodeStatistics("Khối 6");
    this.grade10ActiveCode = await this.getActiveCodeStatistics("Khối 10");
    this.grade6LineChart = await this.getLineChartData(
      "Khối 6",
      this.grade6StartDate,
      this.grade6EndDate
    );
    this.grade6PieChart = await this.getPieChartData("Khối 6");
    console.log(this.grade6PieChart);
    this.$loading.active = false;
  },
  data() {
    return {
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
      grade6LineChart: {},
      grade6PieChart: {},
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
      grade6ActiveCode: {
        totalActiveCodes: 0,
        inactiveActiveCodes: 0,
        activatedActiveCodes: 0,
      },
      grade10ActiveCode: {
        totalActiveCodes: 0,
        inactiveActiveCodes: 0,
        activatedActiveCodes: 0,
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
</style>
