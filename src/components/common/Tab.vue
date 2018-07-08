<template>
  <div class="tab" ref="tab">
    <slot></slot>
  </div>  
</template>

<script>
import BScroll from 'better-scroll' 
import { addClass } from '../../common/js/dom';
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    // borderRadius: {
    //   type: Number,
    //   default: '50%'
    // }
  },
  data() {
    return {

    }
  },
  mounted() {
    if (!this.$refs.slider) {
      return
    }
    setTimeout(() => {
      this.init()
    }, 20)
  },
  methods: {
    init() {
      this.setTabWidth()
    },
    setTabWidth() {
      let clientWidth = this.$refs.tab.clientWidth
      let width = 0
      this.children = this.$refs.tab.children
      for (let i = 0, len = this.children.length; i < len; i++) {
        let child = this.children[i]
        addClass(child, 'tab-item')
        width += child.clientWidth
      }
      width = width >= clientWidth ? width : clientWidth
      this.$refs.tab.style.width = width + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
  $itemPadding: 10px;
  .tab {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    img {
      // width: 100%;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
    .tab-item {
      padding: 0 $itemPadding;
      white-space: nowrap;
    }
  }
</style>
