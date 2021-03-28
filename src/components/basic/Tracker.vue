<template>
  <span v-show="show" class="flip-clock__piece">
    <span class="flip-clock__card flip-card pa-2">
      <b>{{ current | zerofill }}</b>
      <!-- <b class="flip-card__top">{{ current | zerofill }}</b> -->
      <!-- <b class="flip-card__bottom"
        ><span>{{ current | zerofill }}</span></b
      >
      <b class="flip-card__back">{{ previous | zerofill }}</b>
      <b class="flip-card__back-bottom">{{ previous | zerofill }} </b> -->
    </span>
    <span class="flip-clock__slot">{{ getPropertyName }}</span>
  </span>
</template>

<script>
export default {
  props: { property: String, time: Object },
  data: () => ({
    current: 0,
    previous: 0,
    show: false,
  }),
  computed: {
    getPropertyName() {
      if (this.property === "Days") return "Ngày";
      else if (this.property === "Hours") return "Giờ";
      else if (this.property === "Minutes") return "Phút";
      else if (this.property === "Seconds") return "Giây";
      return "";
    },
  },
  watch: {
    time: function(newValue) {
      if (newValue[this.property] === undefined) {
        this.show = false;
        return;
      }
      var val = newValue[this.property];
      this.show = true;
      val = val < 0 ? 0 : val;
      if (val !== this.current) {
        this.previous = this.current;
        this.current = val;
        this.$el.classList.remove("flip");
        this.$el.offsetWidth;
        this.$el.classList.add("flip");
      }
    },
  },
  filters: {
    zerofill(value) {
      //value = ( value < 0 ? 0 : value );
      return (value < 10 && value > -1 ? "0" : "") + value;
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}

.flip-clock {
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
  font-size: 24px;
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
  padding-bottom: 12px;
  font-size: 2.25rem;
  line-height: 0.95;
}

@media (min-width: 1000px) {
  .flip-clock__slot {
    font-size: 1.5rem;
  }
  .flip-card {
    font-size: 3rem;
  }
}

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
  transform-style: preserve-3d;
  backface-visibility: hidden;
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
