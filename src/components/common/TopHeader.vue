<template>
  <div class="top-fixed">
    <div class="top">
      <div class="logo">
        <img :src="logoImg" alt="logo">
      </div>
      <div class="search">
        <i class="iconfont icon-acg-search"></i>
      </div>
    </div>
    <div class="nav-wrapper" ref="navWrapper">
      <ul>
        <router-link v-for="(nav, i) in menuNav" :key="i" :to="nav.url" tag="li">{{ nav.name }}</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  data() {
    return {
      logoImg: 'http://paxr4fk3y.bkt.clouddn.com/logo/acgVoice-logo.png',
      menuNav: [
        {
          name: '推荐',
          url: '/recommend'
        },
        {
          name: '角色',
          url: '/character'
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
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/css/variable.scss';
  .top-fixed {
    position: fixed;
    top: 0;
    height: 2rem;
    width: 100%;
    background: $color-background;
    color: $color-text;
    z-index: 99;
  }
  .top {
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: center;
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
  .nav-wrapper {
    position: absolute;
    top: 2rem;
    padding: 5px 0;
    height: 2rem;
    width: 100%;
    background: $color-background;
    color: $color-text;
    box-sizing: border-box;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        padding: 2px 5px;
        &.router-link-active {
          border-bottom: 2px solid $color-active;
          color: $color-active;
        }
      }
    }
  }
</style>
