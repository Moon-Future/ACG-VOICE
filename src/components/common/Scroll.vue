<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { setTimeout } from 'timers';

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    scrollbar: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    refreshOr: false
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    setHeight(height) {
      this.$refs.wrapper.style.height = height + 'px';
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollbar: this.scrollbar
      })

      if (this.listenScroll) {
        let self = this
        this.scroll.on('scroll', (pos) => {
          self.$emit('scroll', pos)
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emti('beforeScroll')
        })
      }
    },
    disabled() {
      this.scroll && this.scroll.disabled()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scrollRefresh() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  watch: {
    data() {
      this.scrollRefresh()
    },
    refreshOr() {
      if (this.refreshOr !== false) {
        setTimeout(() => {
          if (typeof this.refreshOr === 'number') {
            this.setHeight(this.refreshOr);
            this.initScroll()
          } else {
            console.log('refresh')
            this.refresh()
          }
        }, this.refreshDelay)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
  }
</style>
