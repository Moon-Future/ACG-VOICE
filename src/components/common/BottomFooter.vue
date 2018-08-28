<template>
  <div class="bottom-fototer">
    <tab>
      <div v-for="(item, i) in menu" :key="i">
        <span :class="activeIndex === i ? 'active' : ''" @click="changeMenu(i)">{{ item.name }}</span>
      </div>
    </tab>
  </div>
</template>

<script>
import Tab from '@/components/common/Tab'
export default {
  name: 'BottomFotter',
  data() {
    return {
      menu: [
        {
          name: '主页'
        },
        {
          name: '图片'
        },
        {
          name: '探索'
        },
        {
          name: '我的'
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
  .bottom-fototer {
    position: fixed;
    bottom: 0;
    height: 2rem;
    width: 100%;
    background: $color-gray;
    color: $color-black;
    .active {
      color: $color-active;
    }
  }
</style>
