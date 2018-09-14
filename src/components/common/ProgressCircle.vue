<template>
  <div class="progress-circle">
    <canvas class="canvas" id="canvas" width="30" height="30"></canvas>
    <slot></slot>
  </div>
</template>

<script>
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
    methods: {
      darw(percent) {
        const canvas = document.getElementById('canvas')
        const diameter = this.radius * 2
        let ctx
        if (canvas.getContext) {
          ctx = canvas.getContext('2d')
        }
        if (!ctx) {
          return
        }
        if (percent === 0) {
          ctx.clearRect(0, 0, diameter, diameter)
          return
        }
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = '#00CC33' //'#f38f00'
        ctx.clearRect(0, 0, diameter, diameter)
        ctx.arc(this.radius, this.radius, 12, -0.5 * Math.PI, 2 * Math.PI * percent - 0.5 * Math.PI)
        ctx.stroke()
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
    .canvas {
      width: 2rem;
      height: 2rem;
      position: absolute;
    }
  }
</style>