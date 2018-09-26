<template>
  <div class="bottom-footer">
    <tab class="bottom-tab">
      <div v-for="(item, i) in menu" :key="i" :class="item.hide ? 'hide' : ''">
        <!-- <span :class="activeIndex === i ? 'active' : ''" @click="changeMenu(i)">{{ item.name }}</span> -->
        <router-link :to="item.link" tag="p" :class="activeIndex === i ? 'active' : ''" @click="changeMenu(i)">{{ item.name }}</router-link>
      </div>
    </tab>
  </div>
</template>

<script>
import Tab from '@/components/common/Tab'
export default {
  name: 'BottomFooter',
  data() {
    return {
      menu: [
        {
          name: '主页',
          link: '/recommend'
        },
        {
          name: '滑滑',
          link: '/slideView'
        },
        {
          name: '播放',
          link: '/',
          hide: true
        },
        {
          name: '探索',
          link: '/story'
        },
        {
          name: '我的',
          link: '/recommend'
        }
      ],
      activeIndex: 0
    }
  },
  components: {
    Tab
  },
  methods: {
    changeMenu(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .bottom-footer {
    position: fixed;
    bottom: 0;
    height: 2rem;
    width: 100%;
    background: $color-deepgray;
    border-top: 1px solid $color-gray;
    color: $color-white;
    z-index: 120;
    .active {
      color: $color-active;
    }
    .hide {
      visibility: hidden;
    }
  }
</style>
