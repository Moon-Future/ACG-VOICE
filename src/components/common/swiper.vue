<template>
  <div class="swiper" ref="swiper">
    <div class="swiper-group" ref="swiperGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot"></span>  
    </div>
  </div>  
</template>

<script>
import BScroll from 'better-scroll' 
import { addClass } from '../../common/js/dom';
import { clearTimeout, setTimeout } from 'timers';

export default {
  name: 'swiper',
  props: {
    auto: {
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
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.setSwiperWidth()
      this.initDots()
      this.initSwiper()

      if (this.auto) {
        this.play()
      }
    }, 20)
  },
  methods: {
    setSwiperWidth(isResize) {
      this.children = this.$refs.swiperGroup.children
      let width = 0
      let swiperWidth = this.$refs.swiper.clientWidth
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i]
        addClass(child, 'swiper-item')

        child.style.width = swiperWidth + 'px'
        width += swiperWidth
      }
      if (this.loop && !isResize) {
        width += 2 * swiperWidth
      }
      this.$refs.swiperGroup.style.width = width + 'px'
    },
    initSwiper() {
      this.swiper = new BScroll(this.$refs.swiper, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

      this.swiper.on('scrollEnd', () => {
        let pageIndex = this.swiper.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex

        if (this.auto) {
          clearTimeout(this.timer)
          this.play()
        }
      })
    },
    play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.swiper.goToPage(pageIndex, 0, 400)
      }, this.interval)
    },
    initDots() {
      this.dots = new Array(this.children.length)
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper {
    .swiper-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .swiper-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>
