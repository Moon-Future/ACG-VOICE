<template>
  <div class="home">
    <top-header></top-header>
    <div class="nav-warpper" ref="navWarpper">
      <ul>
        <router-link v-for="(nav, i) in menuNav" :key="i" :class="{active : i === navIndex}" @click.native="changeNav(i)" :to="nav.url" tag="li">{{ nav.name }}</router-link>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <div class="nav-content" ref="scrollContainer">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div> -->
  </div>
</template>

<script>
import TopHeader from 'components/common/TopHeader'
import Scroll from 'components/common/Scroll'
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
  methods: {
    changeNav(index) {
      this.navIndex = index
    }
  },
  components: {
    TopHeader,
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .nav-warpper {
    position: absolute;
    top: 2rem;
    padding: 5px 0;
    height: 2rem;
    width: 100%;
    background: $color-background;
    color: $color-text;
    box-sizing: border-box;
    z-index: 999;
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
  .nav-content {
    position: fixed;
    width: 100%;
    top: 4rem;
    bottom: 2rem;
  }
</style>