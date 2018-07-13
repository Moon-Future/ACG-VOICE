<template>
  <div class="home">
    <div class="nav-warpper" ref="navWarpper">
      <ul>
        <router-link v-for="(nav, i) in menuNav" :key="i" :class="{active : i === navIndex}" @click.native="changeNav(i)" :to="nav.url" tag="li">{{ nav.name }}</router-link>
      </ul>
    </div>
    <div class="scroll-container" ref="scrollContainer">
      <scroll class="scroll">
        <div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '../common/Scroll'
import { setTimeout } from 'timers'
export default {
  name: 'Home',
  data() {
    return {
      menuNav: [
        {
          name: '推荐',
          url: '/recommend'
        },
        {
          name: '角色',
          url: '/characterList'
        },
        {
          name: '歌单',
          url: '/voiceList'
        }
      ],
      navIndex: 0
    }
  },
  mounted() {
    this.setScollHeight()
  },
  methods: {
    setScollHeight() {
      let scrollContainer = this.$refs.scrollContainer
      let clientHeight = scrollContainer.clientHeight
      let navWarpperHeight = this.$refs.navWarpper.clientHeight
      scrollContainer.style.height = clientHeight - 42 - navWarpperHeight + 'px'
    },
    changeNav(index) {
      this.navIndex = index
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/css/variable';
  .home {
    height: 100%;
  }
  .scroll-container {
    height: 100%;
    overflow: hidden;
    padding: 0 10px;
    .scroll {
      height: 100%;
    }
  }
  .nav-warpper {
    padding: 5px 0;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        padding: 2px 5px;
        &.active {
          border-bottom: 1px solid red;
        }
      }
    }
  }
</style>