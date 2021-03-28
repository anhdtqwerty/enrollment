<template>
  <v-dialog v-model="dialog" max-width="640px">
    <v-card class="pa-8">
      <div class="menu-title text-center pb-6">
        Xin vui lòng quay trở lại sau
      </div>
      <div class="flip-clock py-4" @click="update">
        <tracker
          v-for="tracker in trackers"
          :key="tracker"
          :property="tracker"
          :time="time"
          ref="trackers"
        ></tracker>
      </div>
      <div class="menu-title text-center py-6">
        {{ getOpenDate }}
      </div>
      <div class="d-flex justify-center">
        <v-btn color="primary" @click="close()" large outlined>Đóng</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Tracker from "./Tracker.vue";
import moment from "moment";
export default {
  props: { date: String, state: Boolean },
  data: () => ({
    dialog: false,
    time: {},
    i: 0,
    trackers: ["Days", "Hours", "Minutes", "Seconds"],
    countdown: "",
  }),
  components: { Tracker },
  beforeDestroy() {
    if (window["cancelAnimationFrame"]) {
      cancelAnimationFrame(this.frame);
    }
  },
  watch: {
    date: function(newVal) {
      this.setCountdown(newVal);
    },
    state(state) {
      this.dialog = state;
    },
  },
  mounted() {
    if (window["requestAnimationFrame"]) {
      this.setCountdown(this.date);
      this.update();
    }
  },
  computed: {
    getOpenDate() {
      return `Hệ thống sẽ mở vào ngày ${this.date.substring(
        0,
        11
      )} lúc ${this.date.substring(11, 16)}`;
    },
  },
  methods: {
    close() {
      this.$emit("closeDialog");
    },
    setCountdown(date) {
      if (date) {
        this.countdown = moment(date, "DD/MM/YYYY hh:mm:ss");
      } else {
        this.countdown = moment()
          .endOf("day")
          .format("DD/MM/YYYY hh:mm:ss");
      }
    },
    update() {
      this.frame = requestAnimationFrame(this.update.bind(this));
      if (this.i++ % 10) {
        return;
      }
      let updatedTime = {};
      var t = moment(new Date());
      if (this.countdown) {
        t = this.countdown.diff(t);
        updatedTime.Days = Math.floor(t / (1000 * 60 * 60 * 24));
        updatedTime.Hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        updatedTime.Minutes = Math.floor((t / 1000 / 60) % 60);
        updatedTime.Seconds = Math.floor((t / 1000) % 60);
      } else {
        updatedTime.Days = undefined;
        updatedTime.Hours = t.hours() % 13;
        updatedTime.Minutes = t.minutes();
        updatedTime.Seconds = t.seconds();
      }
      updatedTime.Total = t;
      this.time = updatedTime;
    },
  },
};
</script>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
}

.flip-clock {
  border-radius: 4px;
  background: #0084ff;
  color: white;
  text-align: center;
  perspective: 600px;
  margin: 0 auto;
}

.flip-clock__piece {
  display: inline-block;
  margin: 0 0.2vw;

  @media (min-width: 1000px) {
    margin: 0 5px;
  }
}

.flip-clock__slot {
  font-size: 1rem;
  line-height: 1.5;
  display: block;
  /*
  //position: relative;
  //top: -1.6em;
  z-index: 10;
  //color: #FFF;
*/
}

.flip-card {
  display: block;
  position: relative;
  padding-bottom: 0.72em;
  font-size: 2.25rem;
  line-height: 0.95;
}

@media (min-width: 1000px) {
  .flip-clock__slot {
    font-size: 1.2rem;
  }
  .flip-card {
    font-size: 3rem;
  }
}

/*////////////////////////////////////////*/

.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before,
.flip-card__back::after {
  display: block;
  height: 0.72em;
  color: #ccc;
  background: #222;
  padding: 0.23em 0.25em 0.4em;
  border-radius: 0.15em 0.15em 0 0;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  width: 1.8em;
}

.flip-card__bottom,
.flip-card__back-bottom {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 0;
  border-top: solid 1px #000;
  background: #393939;
  border-radius: 0 0 0.15em 0.15em;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
}

.flip-card__back-bottom {
  z-index: 1;
}

.flip-card__bottom::after,
.flip-card__back-bottom::after {
  display: block;
  margin-top: -0.72em;
}

.flip-card__back::before,
.flip-card__bottom::after,
.flip-card__back-bottom::after {
  content: attr(data-value);
}

.flip-card__back {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0%;
  pointer-events: none;
}

.flip-card__back::before {
  position: relative;
  overflow: hidden;
  z-index: -1;
}

.flip .flip-card__back::before {
  z-index: 1;
  animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
  animation-fill-mode: both;
  transform-origin: center bottom;
}

.flip .flip-card__bottom {
  transform-origin: center top;
  animation-fill-mode: both;
  animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
}

.menu-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
    z-index: 2;
  }
  0%,
  99% {
    opacity: 1;
  }
  100% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
}

@keyframes flipBottom {
  0%,
  50% {
    z-index: -1;
    transform: rotateX(90deg);
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
    z-index: 5;
  }
}
</style>
