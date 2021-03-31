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
          <div class="section-title py-6">Phát sinh hồ sơ</div>
          <LineChart style="height: 275px; width: 100%; position: 'relative'" />
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import LineChart from "@/components/chart/LineChart.js";
export default {
  components: { LineChart },
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
    async getCreatedDocument(grade, startDate, endDate) {
      console.log(grade);
      console.log(startDate);
      console.log(endDate);
      // return await this.fetchCVs({
      //   grade,
      //   createdAt_gt: startDate,
      //   createdAt_lt: endDate,
      // });
    },
  },
  async created() {
    this.$loading.active = true;
    this.grade6ActiveCode = await this.getActiveCodeStatistics("Khối 6");
    this.grade10ActiveCode = await this.getActiveCodeStatistics("Khối 10");
    const CVs = await this.getCreatedDocument(
      "Khối 6",
      this.grade6StartDate,
      this.grade6EndDate
    );
    console.log(CVs);
    this.$loading.active = false;
  },
  data() {
    return {
      grade6StartDate: moment()
        .clone()
        .startOf("month"),
      grade6EndDate: moment()
        .clone()
        .endOf("month"),
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
