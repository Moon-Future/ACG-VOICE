<template>
  <div class="home">
    <div class="top">
      <div class="logo">
        <img :src="logoImg" alt="logo">
      </div>
      <div class="search">
        <i class="iconfont icon-acg-search"></i>
      </div>
    </div>
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
      navIndex: 0,
      logoImg: 'http://paxr4fk3y.bkt.clouddn.com/logo/acgVoice-logo.png'
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
  .top {
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: center;
    padding: 5px 0;
    .logo {
      display: flex;
      justify-content: center;
      img {
        width: 50%;
        margin-right: 3px;
      }
    }
    .search {
      position: absolute;
      right: 13px;
      i {
        font-size: 1.5rem;
        cursor: pointer;
      }
    }
  }
  .scroll-container {
    height: 100%;
    overflow: hidden;
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
          border-bottom: 2px solid #f298ae;
        }
      }
    }
  }
</style>