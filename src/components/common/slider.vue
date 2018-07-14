<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots" v-if="dotShow">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>  
</template>

<script>
import BScroll from 'better-scroll' 
import { addClass } from '../../common/js/dom';
import { setTimeout, clearTimeout } from 'timers';

export default {
  name: 'slider',
  props: {
    autoPlay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    dotShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    if (!this.$refs.slider) {
      return
    }
    setTimeout(() => {
      this.init()
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this.setsliderWidth(true)
      this.slider.refresh()
    })
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    init() {
      this.setsliderWidth()
      this.initDots()
      this.initslider()

      if (this.autoPlay) {
        this.play()
      }
    },
    setsliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    initslider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          this.play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop && pageIndex >= this.children.length - 2 ) {
        pageIndex = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    },
    initDots() {
      this.dots = new Array(this.children.length)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.init()
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/css/variable';

  .slider {
    min-height: 1px;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots {
      position: absolute;
      left: 5%;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      background: rgba(255,255,255,0.3);
      height: 13px;
      line-height: 13px;
      border-radius: 10px;
      padding: 0 1px;
      .dot {
        display: inline-block;
        margin: 0 2px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: $color-text-l;
        vertical-align: middle;
        &.active {
          background: #f40;
        }
      }
    }
  }
</style>
