<template>
  <div class="progress-circle" ref="progressCircle">
    <svg xmlns="http://www.w3.org/200/svg" class="circle-svg">
      <circle :cx="cx" :cy="cy" :r="r" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round"/>
      <circle :cx="cx" :cy="cy" :r="r" fill="none" stroke="#00CC33" stroke-width="3" :stroke-dasharray="dasharray" class="progress" ref="progress"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
  import { htmlFontSize } from 'common/js/util';
  export default {
    props: {
      radius: {
        type: Number,
        default: 15
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        cx: 15,
        cy: 15,
        r: 15,
        dasharray: "0, 10000"
      }
    },
    created() {
      this.$nextTick(() => {
        this.cx = htmlFontSize
        this.cy = htmlFontSize
        this.r = htmlFontSize - 3
        this.c = Math.floor(2 * Math.PI * this.r);
      })
    },
    methods: {
      darw(percent) {
        this.dasharray = `${this.c * percent}, 10000`
      }
    },
    watch: {
      percent() {
        this.darw(this.percent)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .progress-circle {
    position: relative;
    height: 100%;
    width: 100%;
    .circle-svg {
      height: 100%;
      width: 100%;
      .progress {
        transform-origin: center;
        transform: rotate(-90deg);
      }
    }
  }
</style>