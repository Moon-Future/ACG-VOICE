<template>
  <div class="progress-bar" ref="progressBar" @click.stop="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <canvas class="progress-buffered" id="progress-buffered" height="4"></canvas>
      <div class="progress-btn" :class="{'progress-btn-loading': loadingShow}" ref="progressBtn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend="progressTouchEnd">
          <!-- <i class="iconfont icon-acg-loading icon-loading" v-show="loadingShow"></i> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { prefixStyle } from 'common/js/dom'
  
  const progressBtnWidth = 12
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      },
      buffered: {
        type: Array,
        default: []
      },
      loadingShow: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._triggerPercent(true)
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent(true)
      },
      draw(x, y, flag = false) {
        const canvas = document.getElementById('progress-buffered')
        const width = this.$refs.progressBar.clientWidth
        canvas.setAttribute('width', width)
        let ctx
        if (canvas.getContext) {
          ctx = canvas.getContext('2d')
        }
        if (!ctx) {
          return
        }
        if (flag) {
          ctx.clearRect(0, 0, width, 4)
          return
        }
        x = width * x
        y = width * y
        ctx.fillStyle = '#c0c0c0'
        ctx.strokeStyle = '#c0c0c0'
        ctx.globalAlpha = 0.5
        ctx.clearRect(x, 0, y - x, 4)
        ctx.clearRect(x, 0, y - x, 4)
        ctx.fillRect(x, 0, y - x, 4)
        ctx.strokeRect(x, 0, y - x, 4)
      },
      _triggerPercent(flag = false) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', {percent, flag})
      },
      _offset(offsetWidth, flag = false) {
        this.$refs.progress.style.width = `${offsetWidth + 1}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        // if (flag) {
        //   this.$refs.progress.style
        // }
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
      },
      buffered() {
        if (this.buffered.length === 0) {
          this.draw('x', 'y', true)
        }
        for (let i = 0, len = this.buffered.length; i < len; i++) {
          this.draw(this.buffered[i].x, this.buffered[i].y)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        z-index: 10;
        height: 100%;
        transition-property: width;
        background: linear-gradient(to right, #f38f00, #f1e000, $color-green)
      }
      .progress-buffered {
        position: absolute;
        height: 4px;
      }
      .progress-btn {
        position: absolute;
        top: -4px;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border: 4px solid #fff;
        border-radius: 50%;
        background: $color-green;
        z-index: 10;
      }
      .progress-btn-loading {
        border-width: 0;
        background: url('../../assets/loading-mini.gif') no-repeat 50%;
      }
      .icon-loading {
        font-size: $font-size-small;
        top: -4px;
        left: -4px;
        position: relative;
        color: $color-gray;
      }
    }
  }
</style>
