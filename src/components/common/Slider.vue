<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>
    <div class="dots" v-if="showDot">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>  
</template>

<script>
import BScroll from 'better-scroll' 
import { addClass } from 'common/js/dom'

export default {
  name: 'slide',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    data: {
      type: Array,
      default: null
    },
    itemHeight: {
      type: String,
      default: ''
    },
    itemScale: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    this.update()
    window.addEventListener('resize', () => {
      if (!this.slide || !this.slide.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    })
  },
  activated() {
    if (!this.slide) {
      return
    }
    this.slide.enable()
    let pageIndex = this.slide.getCurrentPage().pageX
    this.slide.goToPage(pageIndex, 0, 0)
    this.currentPageIndex = pageIndex
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated() {
    this.slide.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.slide.disable()
    clearTimeout(this.timer)
  },
  methods: {
    update() {
      if (this.slide) {
        this.slide.destroy()
      }
      this.$nextTick(() => {
        this.init()
      })
    },
    refresh() {
      this._setSlideWidth(true)
      this.slide.refresh()
    },
    prev() {
      this.slide.prev()
    },
    next() {
      this.slide.next()
    },
    init() {
      clearTimeout(this.timer)
      this.currentPageIndex = 0
      this._setSlideWidth()
      if (this.showDot) {
        this._initDots()
      }
      this._initSlide()
      if (this.autoPlay) {
        this._play()
      }
    },
    _setSlideWidth(isResize) {
      this.children = this.$refs.slideGroup.children
      let width = 0
      let slideWidth = this.$refs.slide.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slide-item')
        child.style.width = slideWidth + 'px'
        this.itemHeight === '' ? false : child.style.height = this.itemHeight
        width += slideWidth
      }
      if (this.loop && !isResize) {
        width += 2 * slideWidth
      }
      this.$refs.slideGroup.style.width = width + 'px'
    },
    _setItemHeight() {
      let currentPageIndex = this.slide.getCurrentPage().pageX
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i]
        let itemScale
        let index
        if (!this.loop) {
          index = currentPageIndex
        } else {
          index = currentPageIndex === len - 2 ? 1 : currentPageIndex + 1
        }
        // loop: true 时，index = 1 和 index = len - 1 是同一张图片
        if (i === index || (this.loop && currentPageIndex === len - 2 && i === len - 1 ))  {
          itemScale = this.itemScale
        } else {
          itemScale = 1
        }
        this.itemHeight === '' ? false : child.style.height = this.itemHeight
        child.style.transform = `scale(${itemScale})`
      }
    },
    _initSlide() {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        bounce: false,
        stopPropagation: true,
        click: this.click
      })
      this.slide.on('scrollEnd', this._onScrollEnd)
      this.slide.on('touchEnd', () => {
        if (this.autoPlay) {
          this._play()
        }
      })
      this.slide.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _onScrollEnd() {
      let pageIndex = this.slide.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slide.next()
        this.itemHeight === '' ? false : this._setItemHeight()
      }, this.interval)
    }
  },
  watch: {
    loop() {
      this.update()
    },
    autoPlay() {
      this.update()
    },
    speed() {
      this.update()
    },
    threshold() {
      this.update()
    },
    data() {
      this.update()
    },
    itemHeight() {
      this._setItemHeight()
    },
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';

  .slide {
    min-height: 1px;
    .slide-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slide-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        transform-origin: top;
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
